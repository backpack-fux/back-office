import { Input } from "@nextui-org/input";

export default function TransferFeeInput({
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
      label="Transfer Fee"
      placeholder="0.00"
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
