import { KeyboardEvent, useState } from "react";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Snippet } from "@nextui-org/snippet";
import { Tab, Tabs } from "@nextui-org/tabs";

import { useBridgeAccount } from "@/hooks/useBridgeBalance";

import {
  oboCustomers,
  prefundedCurrencyOptionsTemp,
  prefundedNetworkOptionsTemp,
  sourceAccountsTemp,
} from "../data/bridge";

export default function PrefundedTransferTabs() {
  const { isLoading, accountName, accountId } = useBridgeAccount();
  const [customOboCustomer, setCustomOboCustomer] = useState("");
  const [selectedOboCustomer, setSelectedOboCustomer] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const tabs = [
    {
      id: "amount",
      // how do we add a prefix string to the label?
      label: isLoading
        ? "Amount"
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
      id: "source",
      label: "Source",
      content: "Configure the source of your transfer",
    },
    {
      id: "destination",
      label: "Destination",
      content: "Configure the destination of your transfer",
    },
  ];

  const handleOboCustomerChange = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
      setSelectedOboCustomer("");
    } else {
      setShowCustomInput(false);
      setSelectedOboCustomer(value);
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

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Transfer options">
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
                {tab.id === "amount" && (
                  <>
                    <Input
                      className="max-w-xs"
                      label="Amount"
                      placeholder="$420.69"
                      type="number"
                    />
                    <div className="h-4" />
                    <Select
                      className="max-w-xs"
                      items={[...oboCustomers, { key: "custom", label: "Custom" }]}
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
                    <div className="h-4" />

                    {/* Uncomment this to give user visual confirmation of the selected OBO customer */}
                    {/* {selectedOboCustomer && (
                      <p className="text-small text-default-500">Selected: {selectedOboCustomer}</p>
                    )} */}

                    <Input
                      className="max-w-xs"
                      id="number"
                      label="Transfer Fee"
                      placeholder="$69.42"
                    />
                  </>
                )}
                {tab.id === "source" && (
                  <>
                    <Select
                      className="max-w-xs"
                      items={sourceAccountsTemp}
                      label="Source Account"
                      placeholder="Choose your source account"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      className="max-w-xs"
                      items={prefundedCurrencyOptionsTemp}
                      label="Currency Options"
                      placeholder="Select a currency"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      className="max-w-xs"
                      items={prefundedNetworkOptionsTemp}
                      label="Network Options"
                      placeholder="Select a network as your payment rail"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                  </>
                )}
                {tab.id === "destination" && (
                  <>
                    <Select
                      className="max-w-xs"
                      items={sourceAccountsTemp}
                      label="Destination Account"
                      placeholder="Choose your destination account"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      className="max-w-xs"
                      items={prefundedCurrencyOptionsTemp}
                      label="Currency Options"
                      placeholder="Select a currency"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      className="max-w-xs"
                      items={prefundedNetworkOptionsTemp}
                      label="Network Options"
                      placeholder="Select a network as your payment rail"
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
