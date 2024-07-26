import { Input } from "@nextui-org/input";

export default function AmountInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error: string;
}) {
  return (
    <Input
      className="max-w-xs"
      errorMessage={error}
      isInvalid={!!error}
      label="Amount"
      placeholder="20.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-small text-default-400">$</span>
        </div>
      }
      type="text"
      value={value}
      onValueChange={onChange}
    />
  );
}
