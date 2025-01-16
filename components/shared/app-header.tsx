import Link from "next/link";
import React from "react";

import { BsBoxFill } from "react-icons/bs";

export default function AppHeader() {
  return (
    <div className="p-0 flex justify-between items-center ">
      <AppLogo />
      {/* <ToggleTheme /> */}
    </div>
  );
}

export const AppLogo = () => {
  return (
    <div className={`flex items-center gap-2 transition-all`}>
      <div
        className={`flex aspect-square size-6 items-center justify-center rounded-lg text-primary-foreground bg-primary`}
      >
        <BsBoxFill className="text-md" />
      </div>

      <div className="flex items-center gap-1 text-left text-sm leading-tight poppins">
        <span className="truncate font-semibold text-[15px]">Item Box</span>
      </div>
    </div>
  );
};

export const NavBar = () => {
  return (
    <nav className="flex items-center gap-7">
      <AppHeader />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 text-left text-sm leading-tight poppins">
          <Link href="/">
            <span className="truncate underline font-semibold text-[15px]">
              Home
            </span>
          </Link>
          <Link href="/dashboard">
            <span className="truncate underline font-semibold text-[15px]">
              Dashboard
            </span>
          </Link>
          <Link href="/ink">
            <span className="truncate underline font-semibold text-[15px]">
              Ink
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
/*
Type de sim
- Prepayee
- Postpayee

RBAC with domain controller
*/
