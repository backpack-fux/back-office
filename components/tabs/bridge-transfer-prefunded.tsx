import { Card, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { prefundedCurrencyOptions, prefundedNetworkOptions } from "../data/bridge";

export default function PrefundedTransferTabs() {
  const tabs = [
    {
      id: "transaction",
      label: "Transaction",
      content: "Configure amount and account reference for the transfer"
    },
    {
      id: "sourc",
      label: "Source",
      content: "Configure the source of your transfer"
    },
    {
      id: "destination",
      label: "Destination",
      content: "Configure the destination of your transfer"
    }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
    
  return (
    <div className="flex w-full flex-col">
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <Card>
        <CardHeader>
          {tabs.map((tab) => (
            <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
              <h3 className="text-lg font-semibold">{tab.label} Details</h3>
              <p>{tab.content}</p>
            </div>
          ))}
        </CardHeader>
        <Divider />
        <Select
      items={prefundedCurrencyOptions}
      label="Currency Options"
      placeholder="Select a currency"
      className="max-w-xs"
    >
      {(prefundedCurrencyOptions) => <SelectItem key={prefundedCurrencyOptions.key}>{prefundedCurrencyOptions.label}</SelectItem>}
    </Select>
        <Select
      items={prefundedNetworkOptions}
      label="Network Options"
      placeholder="Select a network as your payment rail"
      className="max-w-xs"
    >
      {(prefundedNetworkOptions) => <SelectItem key={prefundedNetworkOptions.key}>{prefundedNetworkOptions.label}</SelectItem>}
    </Select>
      </Card>
    </div>
  );
};