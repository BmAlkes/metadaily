"use client";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      redirect("/habits");
    }
  }, [session?.user]);
  return (
    <main
      className={`container flex flex-col gap-8 px-4 pt-16 max-w-[1024px] mr-auto ml-auto justify-center`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className=" text-6xl  text-white font-sans">
          Welcome to Meta <span className="text-green-400 ">Daily</span>
        </h1>
        <p className="text-white font-san text-xl font-display">
          Manage your habits in the palm of your hand
        </p>
      </div>
      <Image
        src="/habit.svg"
        alt="Home welcome"
        width={0}
        height={0}
        className="w-full max-w-[700px] h-auto object-contain mr-auto ml-auto"
      />
    </main>
  );
}
