import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";

export default function PartnerTabs() {
  const tabs = [
    {
      id: "bridge",
      label: "Bridge",
      content: "Bridge is used for on-ramps and off-ramps of stable coins"
    },
    {
      id: "worldpay",
      label: "Worldpay",
      content: "Worldpay provides payment processing services for card networks"
    },
    {
      id: "rain",
      label: "Rain",
      content: "Rain Cards provides card issuance for business credit cards that spend like prepaid cards "
    },
    {
      id: "chase",
      label: "Chase",
      content: "Information about Chase payments goes here."
    },
    {
      id: "1konto",
      label: "1Konto",
      content: "1Konto offers on-ramps and off-ramps of crypto assets"
    },
    {
      id: "brale",
      label: "Brale",
      content: "They're like Bridge but smaller"
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