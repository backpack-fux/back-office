import { Select, SelectItem } from "@nextui-org/select";

import { prefundedCurrencyOptions } from "@/types/bridge";
import { BridgeCurrency } from "@backpack-fux/pylon-sdk";

type CurrencySelectProps = {
  value: BridgeCurrency | null;
  onChange: (value: BridgeCurrency) => void;
};

export default function CurrencySelect({ value, onChange }: CurrencySelectProps) {
  return (
    <Select
      className="max-w-xs"
      items={prefundedCurrencyOptions}
      label="Currency Options"
      placeholder="Select a currency"
      selectedKeys={value ? [value] : []}
      onChange={(e) => {
        onChange(e.target.value as BridgeCurrency);
      }}
    >
      {(item) => <SelectItem key={item.key}>{item.label.toUpperCase()}</SelectItem>}
    </Select>
  );
}
