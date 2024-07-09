import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Tab, Tabs } from "@nextui-org/tabs";

import {
  prefundedCurrencyOptions,
  prefundedNetworkOptions,
  sourceAccountsTemp,
} from "../data/bridge";

export default function PrefundedTransferTabs() {
  const tabs = [
    {
      id: "amount",
      label: "Amount",
      content: "Configure amount and account reference for the transfer",
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
              <CardBody>
                {tab.id === "amount" && (
                  <>
                    <Input
                      className="max-w-xs"
                      label="Amount"
                      placeholder="$420.69"
                      type="number"
                    />
                    <Select
                      className="max-w-xs"
                      items={prefundedNetworkOptions}
                      label="Bridge Account Number"
                      placeholder="Its the bridge account number"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
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
                      items={prefundedCurrencyOptions}
                      label="Currency Options"
                      placeholder="Select a currency"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      className="max-w-xs"
                      items={prefundedNetworkOptions}
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
                      items={prefundedCurrencyOptions}
                      label="Currency Options"
                      placeholder="Select a currency"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      className="max-w-xs"
                      items={prefundedNetworkOptions}
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
