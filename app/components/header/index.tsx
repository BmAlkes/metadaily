"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          {session?.user?.image && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session.user.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <h2>Welcome {session.user.name}</h2>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-green-300 w-full">
                  <Link href="/habits" className="text-base ">
                    Habit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-green-300 w-ful mb-3">
                  <Link href="/tracks" className="text-base">
                    Track Tasks
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-green-300 w-ful mb-3">
                  <Link href="/watch" className="text-base">
                    Stop Watch / Report
                  </Link>
                </DropdownMenuItem>
                <button
                  className="w-full bg-green-500 text-white rounded-md"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
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
