"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/auth-store";
import Link from "next/link";
import { useEffect } from "react";

export const LoginButton = () => {
  const { user } = useAuthStore();
  const access_token = user?.access_token;
  if (access_token) return null;

  if (access_token === undefined) {
    return (
      <Link href={"/auth/login"}>
        <Button className="h-8 space-x-3">Login</Button>
      </Link>
    );
  }
};
