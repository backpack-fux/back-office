import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { BridgeCurrency } from "@backpack-fux/pylon-sdk";

import { isValidEVMAddress, getValidNetworksForAddress } from "@/utils/bridge";
import { SupportedBlockchain } from "@/types/bridge";

import DestinationAddressInput from "../inputs/destinationAddressInput";
import NetworkSelect from "../inputs/networkSelect";
import CurrencySelect from "../inputs/currencySelect";

type DestinationTabProps = {
  handleSubmit: (data: {
    destinationAddress: string;
    network: SupportedBlockchain;
    currency: BridgeCurrency;
  }) => void;
};

export default function DestinationTab({ handleSubmit }: DestinationTabProps) {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<SupportedBlockchain | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<BridgeCurrency | null>(null);
  const [validNetworks, setValidNetworks] = useState<SupportedBlockchain[]>([]);

  const handleDestinationAddressChange = (value: string) => {
    setDestinationAddress(value);
    const networks = getValidNetworksForAddress(value);

    setValidNetworks(networks);
  };

  const handleNetworkChange = (value: SupportedBlockchain) => {
    setSelectedNetwork(value);
  };

  const handleCurrencyChange = (value: BridgeCurrency) => {
    setSelectedCurrency(value);
  };

  const onSubmit = () => {
    if (destinationAddress && selectedNetwork && selectedCurrency) {
      handleSubmit({
        destinationAddress,
        network: selectedNetwork,
        currency: selectedCurrency,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-start">
        <h3 className="text-lg font-semibold">Destination Details</h3>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-4">
        <DestinationAddressInput
          isInvalid={destinationAddress !== "" && !isValidEVMAddress(destinationAddress)}
          value={destinationAddress}
          onChange={handleDestinationAddressChange}
        />
        <NetworkSelect
          options={validNetworks}
          value={selectedNetwork}
          onChange={handleNetworkChange}
        />
        <CurrencySelect value={selectedCurrency} onChange={handleCurrencyChange} />
        <Button
          color="primary"
          disabled={!destinationAddress || !selectedNetwork || !selectedCurrency}
          onClick={onSubmit}
        >
          Submit Transfer
        </Button>
      </CardBody>
    </Card>
  );
}
