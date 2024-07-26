import { Input } from "@nextui-org/input";

export default function DestinationAddressInput({
  value,
  onChange,
  isInvalid,
}: {
  value: string;
  onChange: (value: string) => void;
  isInvalid: boolean;
}) {
  return (
    <Input
      className="max-w-xs"
      errorMessage={isInvalid ? "Invalid address" : ""}
      isInvalid={isInvalid}
      label="Destination Address"
      placeholder="0xdead...beef"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
