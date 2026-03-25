"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>welcome to NawaJeeva App</h1>
        <Link className="text-primary font-bold" href="/auth/signin">
          Sign in
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>welcome to NawaJeeva App</h1>
        <h3>Hallo, {session?.user?.name}</h3>
      </div>
    </>
  );
}

export default Home;
