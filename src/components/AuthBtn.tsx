"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function AuthBtn() {
  const { data: session } = useSession();
  if (!session?.user) return <Button onClick={() => signIn()}>Login</Button>;
  return (
    <div className="flex items-center justify-between gap-2">
      <Button onClick={() => signOut()}>Logout</Button>
      <Image
        src={session.user.image ?? ""}
        className="rounded-full border-2 border-primary"
        alt="Profile"
        width={40}
        height={40}
      />
    </div>
  );
}
