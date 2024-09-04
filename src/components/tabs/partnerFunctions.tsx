import { useEffect, useState } from "react";

import PrefundedTransferTabs from "./prefundedTransferTabs";

interface PartnerFunctionsProps {
  selectedPartner: string;
}

export default function PartnerFunctions({ selectedPartner }: PartnerFunctionsProps) {
  const [functionComponent, setFunctionComponent] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    switch (selectedPartner) {
      case "bridge":
        setFunctionComponent(<PrefundedTransferTabs />);
        break;
      // Add cases for other partners here
      //   case 'rain':
      //     setFunctionComponent(<RainTransferTabs />);
      //     break;
      //   case 'worldpay':
      //     setFunctionComponent(<WorldpayTransferTabs />);
      //     break;
      //   case 'chase':
      //     setFunctionComponent(<ChaseTransferTabs />);
      //     break;
      //   case '1konto':
      //     setFunctionComponent(<OneKontoTransferTabs />);
      //     break;
      //   case 'Brale':
      //     setFunctionComponent(<BraleTransferTabs />);
      //     break;
      default:
        setFunctionComponent(null);
    }
  }, [selectedPartner]);

  return functionComponent;
}
