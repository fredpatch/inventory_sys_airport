"use client";

import { LoginButton } from "./login-button";
// import { useUser } from "@auth0/nextjs-auth0/client";

export default function AuthButtons() {
  // Use the async cookies API

  // if (!user) return null;
  let isAuthenticated ;
  return <>{!isAuthenticated && <LoginButton />}</>;
}
