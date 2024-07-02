import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
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
        <CardHeader>
          {tabs.map((tab) => (
            <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
              <h3 className="text-lg font-semibold">{tab.label} Services</h3>
              <p>{tab.content}</p>
            </div>
          ))}
        </CardHeader>
        <Divider/>
      <CardBody >
      <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
        <h2 className="text-lg font-semibold">Current Balance</h2>
        <p>$420,690.42</p>
        <h2 className="text-lg font-semibold">Functions</h2>
        <ul>
          <li>- Account Balance</li>
          <li>- Account Transfers</li>
        </ul>
        <h2 className="text-lg font-semibold">Links</h2>
        <ul>
          <li>- Support via Slack</li>
          <li>- Bridge docs</li>
        </ul>
      </CardBody>
      </Card>
    </div>
  );
};