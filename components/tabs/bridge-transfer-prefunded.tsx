import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { Tab, Tabs } from "@nextui-org/tabs";
import { prefundedCurrencyOptions, prefundedNetworkOptions, sourceAccountsTemp } from "../data/bridge";

export default function PrefundedTransferTabs() {
  const tabs = [
    {
      id: "transaction",
      label: "Transaction",
      content: "Configure amount and account reference for the transfer"
    },
    {
      id: "source",
      label: "Source",
      content: "Configure the source of your transfer"
    },
    {
      id: "destination",
      label: "Destination",
      content: "Configure the destination of your transfer"
    }
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
                {tab.id === "transaction" && (
                  <>
                    <Select
                      items={prefundedCurrencyOptions}
                      label="Transaction Amount"
                      placeholder="Enter an amount in USD"
                      className="max-w-xs"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      items={prefundedNetworkOptions}
                      label="Bridge Account Number"
                      placeholder="Its the bridge account number"
                      className="max-w-xs"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      items={prefundedNetworkOptions}
                      label="Transfer Fee"
                      placeholder="This is an optional fee that can be applied to the transaction"
                      className="max-w-xs"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                  </>
                )}
                {tab.id === "source" && (
                  <>
                    <Select
                      items={sourceAccountsTemp}
                      label="Source Account"
                      placeholder="Choose your source account"
                      className="max-w-xs"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      items={prefundedCurrencyOptions}
                      label="Currency Options"
                      placeholder="Select a currency"
                      className="max-w-xs"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      items={prefundedNetworkOptions}
                      label="Network Options"
                      placeholder="Select a network as your payment rail"
                      className="max-w-xs"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                  </>
                )}
                {tab.id === "destination" && (
                  <>
                    <Select
                      items={sourceAccountsTemp}
                      label="Destination Account"
                      placeholder="Choose your destination account"
                      className="max-w-xs"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      items={prefundedCurrencyOptions}
                      label="Currency Options"
                      placeholder="Select a currency"
                      className="max-w-xs"
                    >
                      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                    <Select
                      items={prefundedNetworkOptions}
                      label="Network Options"
                      placeholder="Select a network as your payment rail"
                      className="max-w-xs"
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