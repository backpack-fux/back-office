import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";

export default function PrefundedTransferTabs() {
  const tabs = [
    {
      id: "setup",
      label: "Setup",
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
        <CardBody>
          {tabs.map((tab) => (
            <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
              <h3 className="text-lg font-semibold">{tab.label} Payment Details</h3>
              <p>{tab.content}</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};