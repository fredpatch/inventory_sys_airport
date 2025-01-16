"use server";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LogoutButton = async () => {
  return (
    <form action={logout}>
      <Button className="h-8">Logout</Button>
    </form>
    // <Link href={"/api/auth/logout"}>
    // </Link>
  );
};
