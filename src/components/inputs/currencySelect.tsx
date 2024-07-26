import { Select, SelectItem } from "@nextui-org/select";

import { prefundedCurrencyOptions, BridgeCurrency } from "@/types/bridge";

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
