"use client";

import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  if (!session?.user) return <Button onClick={() => signIn()}>Login</Button>;
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
      <div>{session.user.email}</div>
    </div>
  );

  // return <div>Navbar</div>;
}
