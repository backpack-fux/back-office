import { Select, SelectItem } from "@nextui-org/select";
import { useCallback } from "react";

import { oboCustomers } from "@/types/bridge";

type CustomerSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CustomerSelect({ value, onChange }: CustomerSelectProps) {
  const handleSelectionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;

      console.log("Selected value:", selectedValue);
      onChange(selectedValue);
    },
    [onChange]
  );

  return (
    <Select
      className="max-w-xs"
      items={[...oboCustomers, { key: "custom", label: "Custom", value: "custom" }]}
      label="Bridge Customer ID"
      placeholder="Customer IDs in bridge dashboard"
      selectedKeys={value ? [value] : []}
      onChange={handleSelectionChange}
    >
      {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
    </Select>
  );
}
