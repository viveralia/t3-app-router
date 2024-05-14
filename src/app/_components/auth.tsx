import { getProviders } from "next-auth/react";
import { AuthButton } from "./auth-button";

export async function AuthProviders() {
  const providers = await getProviders();

  if (!providers) {
    throw new Error("No auth providers configured");
  }

  return (
    <div>
      {Object.values(providers).map((provider) => (
        <AuthButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
