"use client";

import { signIn, type ClientSafeProvider } from "next-auth/react";

export function AuthButton({ provider }: { provider: ClientSafeProvider }) {
  return (
    <button onClick={() => void signIn(provider.id)}>{provider.name}</button>
  );
}
