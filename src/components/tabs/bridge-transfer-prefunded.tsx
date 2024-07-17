import { KeyboardEvent, useState } from "react";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Snippet } from "@nextui-org/snippet";
import { Tab, Tabs } from "@nextui-org/tabs";

import { useBridgeAccount } from "@/hooks/useBridgeBalance";

import {
  BridgeCurrencyEnum,
  DestinationAccount,
  SupportedBlockchain,
  oboCustomers,
  prefundedCurrencyOptions,
  prefundedNetworkOptions,
} from "@/components/data/bridge";
import { isValidEVMAddress } from "@/components/utils/bridge";

import { Button } from "@nextui-org/button";

export default function PrefundedTransferTabs() {
  const { isLoading, accountName, accountId } = useBridgeAccount();
  const [customOboCustomer, setCustomOboCustomer] = useState("");
  const [selectedOboCustomer, setSelectedOboCustomer] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [transferFee, setTransferFee] = useState("");
  const [selectedTab, setSelectedTab] = useState("account");
  const [selectedCurrency, setSelectedCurrency] = useState<BridgeCurrencyEnum | "">("");

  const [destinationAccount, setDestinationAccount] = useState<DestinationAccount>({
    address: "",
    network: "" as SupportedBlockchain,
  });

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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (value === "") {
      setAmountError("");
    } else {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 20) {
        setAmountError("Amount must be at least $20 douche");
      } else {
        setAmountError("");
      }
    }
  };

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
      setSelectedTab("destination");
    }
  };

  return (
    <div className="flex w-full flex-col">
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
                      placeholder="$20.00"
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      isInvalid={!!amountError}
                      errorMessage={amountError}
                    />
                    <div className="h-4" />
                    <Select
                      className="max-w-xs"
                      items={[...oboCustomers, { key: "custom", label: "Custom", value: "custom" }]}
                      label="Bridge Account Number"
                      placeholder="Select a bridge account number"
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

                    {/* Uncomment this to give user visual confirmation of the selected OBO customer */}
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
                      id="number"
                      label="Transfer Fee"
                      placeholder="$69.42"
                      value={transferFee}
                      onChange={(e) => setTransferFee(e.target.value)}
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
                      placeholder="0x..."
                      value={destinationAccount.address}
                      onChange={(e) =>
                        setDestinationAccount((prev) => ({ ...prev, address: e.target.value }))
                      }
                      isInvalid={
                        destinationAccount.address !== "" &&
                        !isValidEVMAddress(destinationAccount.address)
                      }
                      errorMessage={
                        destinationAccount.address && !isValidEVMAddress(destinationAccount.address)
                          ? "Invalid EVM address"
                          : ""
                      }
                    />
                    <div className="h-4" />
                    <Select
                      className="max-w-xs"
                      items={prefundedNetworkOptions}
                      label="Network Options"
                      placeholder="Select a network as your payment rail"
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
                  </>
                )}
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
