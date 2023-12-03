"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ToolTip from "../tooltip";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <header className="w-100 max-w-[1024px] mr-auto ml-auto p-6 h-28 flex justify-between items-center ">
      <div>
        <Link href="/">
          <Image
            src="/logo.png"
            width={230}
            height={200}
            alt="logo"
            className="object-fill"
          />
        </Link>
      </div>

      {status === "loading" ? (
        <></>
      ) : session ? (
        <div className="flex items-center gap-3">
          <button className="bg-green-400 text-neutral-900 text-lg cursor-pointer px-4 py-2 rounded-xl uppercase font-sans hover:bg-green-300">
            Hello {session?.user?.name}
          </button>
          {session?.user?.image && (
            <ToolTip text="logout">
              <img
                src={session?.user?.image}
                onClick={() => signOut()}
                className="rounded-full max-w-[60px] cursor-pointer"
              />
            </ToolTip>
          )}
        </div>
      ) : (
        <button
          className="bg-green-400 text-neutral-900 text-lg cursor-pointer px-4 py-2 rounded-xl uppercase font-sans hover:bg-green-300"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
