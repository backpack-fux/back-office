import { Select, SelectItem } from "@nextui-org/select";

import { oboCustomers } from "@/types/bridge";

type CustomerSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CustomerSelect({ value, onChange }: CustomerSelectProps) {
  return (
    <Select
      className="max-w-xs"
      items={[...oboCustomers, { key: "custom", label: "Custom", value: "custom" }]}
      label="Bridge Customer ID"
      placeholder="Customer IDs in bridge dashboard"
      selectedKeys={value ? [value] : []}
      onChange={(e) => onChange(e.target.value)}
    >
      {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
    </Select>
  );
}
