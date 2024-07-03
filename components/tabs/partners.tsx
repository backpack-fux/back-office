import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Tab, Tabs } from "@nextui-org/tabs";

export default function PartnerTabs() {
  const tabs = [
    {
      id: "bridge",
      label: "Bridge",
      content: "Bridge is used for on-ramps and off-ramps of stable coins",
      balance: "$420,690.42",
      functions: ["Account Balance", "Account Transfers"],
      links: ["Support via Slack", "Bridge docs"],
      image: "https://nextui.org/images/hero-card-complete.jpeg"
    },
    {
      id: "worldpay",
      label: "Worldpay",
      content: "Worldpay provides payment processing services for card networks",
      balance: "$1,234,567.89",
      functions: ["Process Payments", "Refunds"],
      links: ["Worldpay Support", "API Documentation"],
      image: "https://example.com/worldpay-image.jpg"
    },
    {
      id: "rain",
      label: "Rain",
      content: "Rain Cards provides card issuance for business credit cards that spend like prepaid cards",
      balance: "$987,654.32",
      functions: ["Issue Cards", "Manage Limits"],
      links: ["Rain Support Center", "Card Management Portal"],
      image: "https://example.com/rain-image.jpg"
    },
    {
      id: "chase",
      label: "Chase",
      content: "Chase provides various banking and payment services",
      balance: "$5,678,901.23",
      functions: ["Wire Transfers", "ACH Payments"],
      links: ["Chase Business Support", "Online Banking"],
      image: "https://example.com/chase-image.jpg"
    },
    {
      id: "1konto",
      label: "1Konto",
      content: "1Konto offers on-ramps and off-ramps of crypto assets",
      balance: "€3,456,789.01",
      functions: ["Crypto Exchange", "Fiat Conversion"],
      links: ["1Konto Help Center", "Trading Platform"],
      image: "https://example.com/1konto-image.jpg"
    },
    {
      id: "brale",
      label: "Brale",
      content: "They're like Bridge but smaller",
      balance: "$789,012.34",
      functions: ["Stablecoin Transfers", "Account Management"],
      links: ["Brale Support", "Developer Docs"],
      image: "https://example.com/brale-image.jpg"
    }
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Partner options">
        {tabs.map((tab) => (
          <Tab key={tab.id} title={tab.label}>
            <Card>
              <CardHeader className="flex flex-col items-start">
                <h3 className="text-lg font-semibold">{tab.label} Services</h3>
                <p className="text-small text-default-500">{tab.content}</p>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-row gap-4">
                  <div className="w-1/3">
                    <Image
                      alt={`${tab.label} background`}
                      className="object-cover rounded-xl w-full h-full"
                      src={tab.image}
                    />
                  </div>
                  <div className="w-2/3 flex flex-col">
                    <h2 className="text-lg font-semibold">Current Balance</h2>
                    <p>{tab.balance}</p>
                    <h2 className="text-lg font-semibold mt-4">Functions</h2>
                    <ul>
                      {tab.functions.map((func, index) => (
                        <li key={index}>- {func}</li>
                      ))}
                    </ul>
                    <h2 className="text-lg font-semibold mt-4">Links</h2>
                    <ul>
                      {tab.links.map((link, index) => (
                        <li key={index}>- {link}</li>
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
  );
}