"use client";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import { db } from "../services/firebaseConnection";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const NewHabit = () => {
  const { data: session } = useSession();
  async function newHabit(formData: FormData) {
    const habit = formData.get("habit");
    try {
      await addDoc(collection(db, "habits"), {
        title: habit,
        daysHabit: {},
        created: new Date(),
        user: session?.user,
      });
    } catch (e: any) {
      console.log("Error" + e.message);
    }
    redirect("/habits");
  }

  return (
    <main className="container ralative flex flex-col gap-8 max-w-[1024px] mr-auto ml-auto px-12 pt-16">
      <h1 className="text-center font-light text-4xl text-white font-display">
        New Habit
      </h1>

      <form action={newHabit} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          name="habit"
          id="habit"
          placeholder="type a new habit..."
          className="p-2 font-sans text-xl text-white rounded-md bg-neutral-700"
        />
        <button
          className="bg-green-500 font-display text-neutral-900 font-regular text-2xl p-2 rounded-md mt-8"
          type="submit"
        >
          Create a new habit
        </button>
        <Link href="/habits" className="w-full">
          <button className="bg-neutral-800 font-display text-[#f85858] font-regular text-2xl p-2 rounded-md mt-8 w-full">
            Back to Habit Pages
          </button>
        </Link>
      </form>
    </main>
  );
};

export default NewHabit;
