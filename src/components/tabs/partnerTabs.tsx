import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useState } from "react";
import PartnerFunctions from "@/components/tabs/partnerFunctions";
import { formatBalance } from "@/utils/helper";
import pylon from "@/libs/pylon";
import { useBridgeBalance } from "@backpack-fux/pylon-sdk";

export default function PartnerTabs() {
  const pylonInstance = pylon;

  const { balance, currency, isLoading } = useBridgeBalance({ pylonInstance });

  const tabs = [
    {
      id: "bridge",
      label: "Bridge",
      content: "Bridge is used for on-ramps and off-ramps of stable coins",
      balance: isLoading 
        ? "Loading..." 
        : `${balance.toFixed(2)} ${currency}`,
      functions: ["Account Balance", "Account Transfers"],
      links: [
        {
          text: "Support via Slack",
          url: "https://app.slack.com/client/T05E1T4PBFW/C05EP0L2W7J?selected_team_id=T05E1T4PBFW",
        },
        { text: "Bridge docs", url: "https://docs.bridge.xyz" },
        { text: "Bridge dashboard", url: "https://dashboard.bridge.xyz" },
      ],
      image: "/bridge-logo-white.svg",
    },
    {
      id: "worldpay",
      label: "Worldpay",
      content: "Worldpay provides payment processing services for card networks",
      balance: "$1,234,567.89",
      functions: ["Process Payments", "Refunds"],
      links: [
        {
          text: "Worldpay Support",
          url: "https://www.fisglobal.com/en/merchant-solutions-worldpay/support",
        },
        { text: "API Documentation", url: "https://developer.worldpay.com" },
      ],
      image: "/worldpay-logo.png",
    },
    {
      id: "1konto",
      label: "1Konto",
      content: "1Konto offers on-ramps and off-ramps of crypto assets",
      balance: "€3,456,789.01",
      functions: ["Crypto Exchange", "Fiat Conversion"],
      links: [
        { text: "1Konto Help Center", url: "https://1konto.com/help" },
        { text: "Trading Platform", url: "https://trading.1konto.com" },
      ],
      image: "https://example.com/1konto-image.jpg",
    },
    {
      id: "brale",
      label: "Brale",
      content: "They're like Bridge but smaller",
      balance: "$789,012.34",
      functions: ["Stablecoin Transfers", "Account Management"],
      links: [
        { text: "Brale Support", url: "https://brale.com/support" },
        { text: "Developer Docs", url: "https://docs.brale.com" },
      ],
      image: "https://example.com/brale-image.jpg",
    },
  ];

  const [selectedPartner, setSelectedPartner] = useState<string>(tabs[0].id);

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <div className="w-full md:w-1/2">
        <Tabs
          aria-label="Partner options"
          selectedKey={selectedPartner}
          onSelectionChange={(key) => setSelectedPartner(key as string)}
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} title={tab.label}>
              <Card>
                <CardHeader className="flex flex-col items-start">
                  <h3 className="text-lg font-semibold">{tab.label} Services</h3>
                  <p className="text-small text-default-500">{tab.content}</p>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="w-full md:w-1/3">
                      <Image
                        alt={`${tab.label} background`}
                        className="size-full rounded-xl object-cover"
                        src={tab.image}
                      />
                    </div>
                    <div className="flex w-full flex-col md:w-2/3">
                      <h2 className="text-lg font-semibold">Current Balance</h2>
                      <p>{tab.balance}</p>
                      <h2 className="mt-4 text-lg font-semibold">Functions</h2>
                      <ul>
                        {tab.functions.map((func, index) => (
                          <li key={index}>- {func}</li>
                        ))}
                      </ul>
                      <h2 className="mt-4 text-lg font-semibold">Links</h2>
                      <ul>
                        {tab.links.map((link, index) => (
                          <li key={index}>
                            <Link
                              isExternal
                              showAnchorIcon
                              color="primary"
                              href={link.url}
                              underline="hover"
                            >
                              {link.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
      <div className="w-full md:w-1/2">
        <PartnerFunctions selectedPartner={selectedPartner} />
      </div>
    </div>
  );
}
