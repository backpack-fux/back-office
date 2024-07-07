import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";

export const SignIn = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Sign In</h1>
    </div>
  );
};
