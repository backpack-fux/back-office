import { Select, SelectItem } from "@nextui-org/select";

import { prefundedNetworkOptions, SupportedBlockchain } from "@/types/bridge";

type NetworkSelectProps = {
  value: SupportedBlockchain | null;
  onChange: (value: SupportedBlockchain) => void;
  options: SupportedBlockchain[];
};

export default function NetworkSelect({ value, onChange }: NetworkSelectProps) {
  return (
    <Select
      className="max-w-xs"
      items={prefundedNetworkOptions}
      label="Network Options"
      placeholder="Select a network as your payment rail"
      selectedKeys={value ? [value] : []}
      onChange={(e) => onChange(e.target.value as SupportedBlockchain)}
    >
      {(item) => (
        <SelectItem key={item.key}>
          {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
        </SelectItem>
      )}
    </Select>
  );
}
