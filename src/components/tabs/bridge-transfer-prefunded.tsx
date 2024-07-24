import { KeyboardEvent, useCallback, useState } from "react";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Snippet } from "@nextui-org/snippet";
import { Tab, Tabs } from "@nextui-org/tabs";

import { useBridgeAccount } from "@/hooks/useBridgeBalance";

import {
  BridgeCurrencyEnum,
  BridgePaymentRailEnum,
  DestinationAccount,
  SupportedBlockchain,
  oboCustomers,
  prefundedCurrencyOptions,
  prefundedNetworkOptions,
} from "@/types/bridge";
import { getValidNetworksForAddress, isValidEVMAddress } from "@/utils/bridge";

import { PylonV2Service } from "@/services/PylonV2";

const pylonService = new PylonV2Service();

export default function PrefundedTransferTabs() {
  const { isLoading, accountName, accountId } = useBridgeAccount();
  const [customOboCustomer, setCustomOboCustomer] = useState("");
  const [selectedOboCustomer, setSelectedOboCustomer] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [transferFee, setTransferFee] = useState("");
  const [transferFeeError, setTransferFeeError] = useState("");
  const [selectedTab, setSelectedTab] = useState("account");
  const [selectedCurrency, setSelectedCurrency] = useState<BridgeCurrencyEnum | "">("");
  const [validNetworks, setValidNetworks] = useState<SupportedBlockchain[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [destinationAccount, setDestinationAccount] = useState<DestinationAccount>({
    address: "",
    network: "" as SupportedBlockchain,
  });

  const [combinedData, setCombinedData] = useState<{
    amount: number;
    oboCustomer: string;
    transferFee: number;
    destinationAddress: string;
    network: SupportedBlockchain;
    currency: BridgeCurrencyEnum;
  }>({
    amount: 0,
    oboCustomer: "",
    transferFee: 0,
    destinationAddress: "",
    network: BridgePaymentRailEnum.POLYGON,
    currency: BridgeCurrencyEnum.USD,
  });

  const updateValidNetworks = useCallback((address: string) => {
    const networks = getValidNetworksForAddress(address);
    setValidNetworks(networks);
  }, []);

  const handleDestinationAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setDestinationAccount((prev) => ({ ...prev, address: newAddress }));
    updateValidNetworks(newAddress);
  };

  const tabs = [
    {
      id: "account",
      label: isLoading
        ? "Account"
        : `PFA ${accountName.charAt(0).toUpperCase()}${accountName.slice(1)}`,
      content: isLoading ? (
        "Configure amount and account reference for the transfer"
      ) : (
        <Snippet symbol="ID:" variant="bordered" color="default" codeString={accountId}>
          {accountId}
        </Snippet>
      ),
    },
    {
      id: "destination",
      label: "Destination",
      content: "Configure the destination of your transfer",
    },
  ];

  const handleAmountChange = useCallback((value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const parts = numericValue.split(".");
    const formattedValue = parts[0] + (parts.length > 1 ? "." + parts[1].slice(0, 2) : "");

    setAmount(formattedValue);

    if (formattedValue === "") {
      setAmountError("");
    } else {
      const numValue = parseFloat(formattedValue);
      if (isNaN(numValue) || numValue < 20) {
        setAmountError("Amount must be at least $20");
      } else {
        setAmountError("");
      }
    }
  }, []);

  const handleTransferFeeChange = useCallback((value: string) => {
    // Remove non-numeric characters except for the decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const parts = numericValue.split(".");
    const formattedValue = parts[0] + (parts.length > 1 ? "." + parts[1].slice(0, 2) : "");

    setTransferFee(formattedValue);

    if (formattedValue === "") {
      setTransferFeeError("");
    } else {
      const numValue = parseFloat(formattedValue);
      if (isNaN(numValue) || numValue < 0) {
        setTransferFeeError("Transfer fee must be a non-negative number");
      } else {
        setTransferFeeError("");
      }
    }
  }, []);

  const handleOboCustomerChange = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
      setSelectedOboCustomer("");
    } else {
      setShowCustomInput(false);
      const selectedCustomer = oboCustomers.find((customer) => customer.key === value);
      setSelectedOboCustomer(selectedCustomer ? selectedCustomer.value : value);
    }
  };

  const handleCustomOboCustomerSubmit = () => {
    if (customOboCustomer.trim()) {
      setSelectedOboCustomer(customOboCustomer);
      setShowCustomInput(false);
      setCustomOboCustomer("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCustomOboCustomerSubmit();
    }
  };

  const handleSetValues = () => {
    if (amount && selectedOboCustomer && transferFee) {
      setCombinedData((prev) => ({
        ...prev,
        amount: parseFloat(amount),
        oboCustomer: selectedOboCustomer,
        transferFee: parseFloat(transferFee),
      }));
      setSelectedTab("destination");
    }
  };

  const handleSubmit = () => {
    if (destinationAccount.address && destinationAccount.network && selectedCurrency) {
      setCombinedData((prev) => ({
        ...prev,
        destinationAddress: destinationAccount.address,
        network: destinationAccount.network,
        currency: selectedCurrency,
      }));
      setIsConfirmModalOpen(true);
    }
  };

  const handleConfirmTransfer = async () => {
    setIsSubmitting(true);
    try {
      const transferData = {
        amount: combinedData.amount,
        on_behalf_of: combinedData.oboCustomer,
        developer_fee: combinedData.transferFee ? combinedData.transferFee : undefined,
        source: {
          payment_rail: BridgePaymentRailEnum.PREFUNDED,
          currency: BridgeCurrencyEnum.USD,
          prefunded_account_id: accountId,
        },
        destination: {
          payment_rail: combinedData.network as SupportedBlockchain,
          currency: combinedData.currency as BridgeCurrencyEnum,
          to_address: combinedData.destinationAddress,
        },
      };

      const response = await pylonService.createPrefundedAccountTransfer(transferData);

      console.log("Transfer submitted successfully:", response);

      // Close modal and reset form
      setIsConfirmModalOpen(false);
      // Reset form fields here
      // You might want to show a success message to the user
    } catch (error) {
      console.error("Error submitting transfer:", error);
      // You might want to show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Tabs
        aria-label="Transfer options"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} title={tab.label}>
            <Card>
              <CardHeader className="flex flex-col items-start">
                <h3 className="text-lg font-semibold">{tab.label} Details</h3>
                <p className="text-small text-default-500">{tab.content}</p>
              </CardHeader>
              <Divider />
              <h3 className="text-md font-semibold ms-4 mt-2">Transfer Details</h3>
              <CardBody>
                {tab.id === "account" && (
                  <>
                    <Input
                      className="max-w-xs"
                      label="Amount"
                      placeholder="20.00"
                      type="text"
                      value={amount}
                      onValueChange={handleAmountChange}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      isInvalid={!!amountError}
                      errorMessage={amountError}
                    />
                    <div className="h-4" />
                    <Select
                      className="max-w-xs"
                      items={[...oboCustomers, { key: "custom", label: "Custom", value: "custom" }]}
                      label="Bridge Customer ID"
                      placeholder="Customer IDs in bridge dashboard"
                      onChange={(e) => handleOboCustomerChange(e.target.value)}
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    {showCustomInput && (
                      <Input
                        className="max-w-xs"
                        label={
                          <div>
                            Customer ID <span className="text-red-500">KYC is a prerequisite</span>
                          </div>
                        }
                        placeholder="Enter custom account and press Enter"
                        value={customOboCustomer}
                        onChange={(e) => setCustomOboCustomer(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    )}
                    <div className="h-1" />
                    {selectedOboCustomer && (
                      <Snippet
                        symbol="ID:"
                        variant="bordered"
                        color="default"
                        codeString={selectedOboCustomer}
                      >
                        {selectedOboCustomer}
                      </Snippet>
                    )}
                    <div className="h-4" />
                    <Input
                      className="max-w-xs"
                      label="Transfer Fee"
                      placeholder="0.00"
                      type="text"
                      value={transferFee}
                      onValueChange={handleTransferFeeChange}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      isInvalid={!!transferFeeError}
                      errorMessage={transferFeeError}
                    />
                    <div className="h-4" />
                    <Button
                      color="primary"
                      onClick={handleSetValues}
                      disabled={!amount || !selectedOboCustomer || !transferFee}
                    >
                      Set Values and Continue
                    </Button>
                  </>
                )}
                {tab.id === "destination" && (
                  <>
                    <Input
                      className="max-w-xs"
                      label="Destination Address"
                      placeholder="0xdeadbeef"
                      value={destinationAccount.address}
                      onChange={handleDestinationAddressChange}
                      isInvalid={
                        destinationAccount.address !== "" &&
                        !isValidEVMAddress(destinationAccount.address)
                      }
                      errorMessage={
                        destinationAccount.address && !isValidEVMAddress(destinationAccount.address)
                          ? "Invalid address"
                          : ""
                      }
                    />
                    <div className="h-4" />
                    <Select
                      className="max-w-xs"
                      items={prefundedNetworkOptions.filter((option) =>
                        validNetworks.includes(option.key as SupportedBlockchain)
                      )}
                      label="Network Options"
                      placeholder="Select a network as your payment rail"
                      // isDisabled={validNetworks.length === 0}
                      onChange={(e) =>
                        setDestinationAccount((prev) => ({
                          ...prev,
                          network: e.target.value as SupportedBlockchain,
                        }))
                      }
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <div className="h-4" />
                    <Select
                      className="max-w-xs"
                      items={prefundedCurrencyOptions}
                      label="Currency Options"
                      placeholder="Select a currency"
                      onChange={(e) => setSelectedCurrency(e.target.value as BridgeCurrencyEnum)}
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <div className="h-4" />
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                      disabled={
                        !destinationAccount.address ||
                        !destinationAccount.network ||
                        !selectedCurrency
                      }
                    >
                      Submit Transfer
                    </Button>
                  </>
                )}
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirm Transfer</ModalHeader>
          <ModalBody>
            <Snippet
              symbol="Receipt"
              variant="bordered"
              color="default"
              codeString={`
                From: ${accountName}
                Amount: $${combinedData.amount}
                Transfer Fee: $${combinedData.transferFee}
                OBO Customer: ${combinedData.oboCustomer}
                To: ${combinedData.destinationAddress}
                Network: ${combinedData.network}
                Currency: ${combinedData.currency}
                Total: $${(combinedData.amount + combinedData.transferFee).toFixed(2)}
              `}
            >
              <div className="space-y-2">
                <p>
                  <strong>From:</strong> {accountName}
                </p>
                <p>
                  <strong>Amount:</strong> ${combinedData.amount}
                </p>
                <p>
                  <strong>Transfer Fee:</strong> ${combinedData.transferFee}
                </p>
                <p>
                  <strong>OBO Customer:</strong> {combinedData.oboCustomer}
                </p>
                <p>
                  <strong>To:</strong> {combinedData.destinationAddress}
                </p>
                <p>
                  <strong>Network:</strong> {combinedData.network}
                </p>
                <p>
                  <strong>Currency:</strong> {combinedData.currency}
                </p>
                <p>
                  <strong>Total:</strong> $
                  {(combinedData.amount + combinedData.transferFee).toFixed(2)}
                </p>
              </div>
            </Snippet>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleConfirmTransfer} isLoading={isSubmitting}>
              Confirm Transfer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
