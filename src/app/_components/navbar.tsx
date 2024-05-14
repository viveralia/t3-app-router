import { getServerAuthSession } from "~/server/auth";
import { SignOut } from "./sign-buttons";

export async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="flex items-center justify-between p-4">
      <p>My todos app</p>
      {session ? <SignOut /> : null}
    </nav>
  );
}
