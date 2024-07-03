import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Tab, Tabs } from "@nextui-org/tabs";

export default function PartnerTabs() {
  const tabs = [
    {
      id: "bridge",
      label: "Bridge",
      content: "Bridge is used for on-ramps and off-ramps of stable coins",
      balance: "$420,690.42",
      functions: ["Account Balance", "Account Transfers"],
      links: [
        { text: "Support via Slack", url: "https://app.slack.com/client/T05E1T4PBFW/C05EP0L2W7J?selected_team_id=T05E1T4PBFW" },
        { text: "Bridge docs", url: "https://docs.bridge.xyz" },
        { text: "Bridge dashboard", url: "https://dashboard.bridge.xyz" }
      ],
      image: "/bridge-logo-white.svg"
    },
    {
      id: "worldpay",
      label: "Worldpay",
      content: "Worldpay provides payment processing services for card networks",
      balance: "$1,234,567.89",
      functions: ["Process Payments", "Refunds"],
      links: [
        { text: "Worldpay Support", url: "https://www.fisglobal.com/en/merchant-solutions-worldpay/support" },
        { text: "API Documentation", url: "https://developer.worldpay.com/docs" }
      ],
      image: "https://example.com/worldpay-image.jpg"
    },
    {
      id: "rain",
      label: "Rain",
      content: "Rain Cards provides card issuance for business credit cards that spend like prepaid cards",
      balance: "$987,654.32",
      functions: ["Issue Cards", "Manage Limits"],
      links: [
        { text: "Rain support via Slack", url: "https://app.slack.com/client/T0207CDB4LB/C06H7P4RYN4?selected_team_id=T05E1T4PBFW" },
        { text: "Rain Default Login", url: "https://use.raincards.xyz" },
        { text: "Rain Docs", url: "https://docs.raincards.xyz" }
      ],
      image: "https://example.com/rain-image.jpg"
    },
    {
      id: "chase",
      label: "Chase",
      content: "Chase provides various banking and payment services",
      balance: "$5,678,901.23",
      functions: ["Wire Transfers", "ACH Payments"],
      links: [
        { text: "Chase Business Support", url: "https://www.chase.com/business/customer-service" },
        { text: "Online Banking", url: "https://secure.chase.com/web/auth/dashboard" }
      ],
      image: "https://example.com/chase-image.jpg"
    },
    {
      id: "1konto",
      label: "1Konto",
      content: "1Konto offers on-ramps and off-ramps of crypto assets",
      balance: "€3,456,789.01",
      functions: ["Crypto Exchange", "Fiat Conversion"],
      links: [
        { text: "1Konto Help Center", url: "https://1konto.com/help" },
        { text: "Trading Platform", url: "https://trading.1konto.com" }
      ],
      image: "https://example.com/1konto-image.jpg"
    },
    {
      id: "brale",
      label: "Brale",
      content: "They're like Bridge but smaller",
      balance: "$789,012.34",
      functions: ["Stablecoin Transfers", "Account Management"],
      links: [
        { text: "Brale Support", url: "https://brale.com/support" },
        { text: "Developer Docs", url: "https://docs.brale.com" }
      ],
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
                      <li key={index}>
                        <Link
                          href={link.url}
                          isExternal
                          showAnchorIcon
                          underline="hover"
                          color="primary"
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
  );
}