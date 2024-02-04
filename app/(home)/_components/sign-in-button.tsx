"use client";

import { Button, ButtonProps } from "@/app/_components/ui/button";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

const SignInButton = (props: ButtonProps) => {
  return (
    <Button {...props} onClick={() => signIn("google")} className="flex gap-2">
      <LogInIcon size={18} />
      Fazer Login
    </Button>
  );
};

export default SignInButton;
