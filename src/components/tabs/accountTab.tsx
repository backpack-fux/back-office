import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Snippet } from "@nextui-org/snippet";
import { Button } from "@nextui-org/button";

import { formatAmount, validateAmount } from "@/utils/bridge";

import AmountInput from "../inputs/amountInput";
import CustomerSelect from "../inputs/customerSelect";
import TransferFeeInput from "../inputs/transferFeeInput";

type AccountTabProps = {
  accountId: string;
  handleSetValues: (data: { amount: number; oboCustomer: string; transferFee: number }) => void;
};

export default function AccountTab({ accountId, handleSetValues }: AccountTabProps) {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [selectedOboCustomer, setSelectedOboCustomer] = useState("");
  const [transferFee, setTransferFee] = useState("");
  const [transferFeeError, setTransferFeeError] = useState("");

  const handleAmountChange = (value: string) => {
    const formattedValue = formatAmount(value);

    console.log("handleAmountChange", formattedValue);

    setAmount(formattedValue);
    setAmountError(validateAmount(formattedValue));
  };

  const handleOboCustomerChange = (value: string) => {
    setSelectedOboCustomer(value);
    console.log("handleOboCustomerChange", selectedOboCustomer);
  };

  const handleTransferFeeChange = (value: string) => {
    const formattedValue = formatAmount(value);

    console.log("handleTransferFeeChange", formattedValue);
    setTransferFee(formattedValue);
    setTransferFeeError(validateAmount(formattedValue, true));
  };

  const handleSubmit = () => {
    if (amount && selectedOboCustomer && transferFee) {
      console.log("handleSubmit", amount);
      console.log("handleSubmit", selectedOboCustomer);
      console.log("handleSubmit", transferFee);
      handleSetValues({
        amount: parseFloat(amount),
        oboCustomer: selectedOboCustomer,
        transferFee: parseFloat(transferFee),
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-start">
        <h3 className="text-lg font-semibold">Account Details</h3>
        <Snippet codeString={accountId} color="default" symbol="ID:" variant="bordered">
          {accountId}
        </Snippet>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-4">
        <AmountInput error={amountError} value={amount} onChange={handleAmountChange} />
        <CustomerSelect value={selectedOboCustomer} onChange={handleOboCustomerChange} />
        <TransferFeeInput
          error={transferFeeError}
          value={transferFee}
          onChange={handleTransferFeeChange}
        />
        <Button
          color="primary"
          disabled={!amount || !selectedOboCustomer || !transferFee}
          onClick={handleSubmit}
        >
          Set Values and Continue
        </Button>
      </CardBody>
    </Card>
  );
}
