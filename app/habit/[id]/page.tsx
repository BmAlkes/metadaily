"use client";
import Calendar from "@/app/components/Calendar.tsx";
import { db } from "@/app/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface HabitsDetailProps {
  params: {
    id: string;
  };
}
interface HabitProps {
  title: string;
  created: string;
  habit: Record<string, boolean> | undefined;
  user: string;
  taskId: string;
}

const HabitDetails = ({ params: { id } }: HabitsDetailProps) => {
  const router = useRouter();
  const [habit, setHabit] = useState<HabitProps | undefined>();

  useEffect(() => {
    loadHabit(id);
  }, [habit]);

  const loadHabit = async (id: string) => {
    const docRef = doc(db, "habits", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.data() === undefined) {
      router.push("/habits");
    }
    const miliseconds = snapshot.data()?.created?.seconds * 1000;
    const habit = {
      title: snapshot.data()?.title,
      habit: snapshot.data()?.habit,
      created: new Date(miliseconds).toLocaleDateString(),
      user: snapshot.data()?.user,
      taskId: id,
    };
    setHabit(habit);
  };

  return (
    <main className="container max-w-[1024px] relative flex flex-col gap-8 px-4 pt-16 pb-8  mr-auto ml-auto">
      <h1 className="text-2xl font-light text-center text-white font-display">
        {habit?.title}
      </h1>
      <Link
        href="/habits"
        className="flex items-center font-sans text-lg text-white gap-4"
      >
        <FaArrowLeft size={25} />
        Back
      </Link>

      <Calendar habit={habit?.title} habitStreak={habit?.habit} id={id} />
    </main>
  );
};

export default HabitDetails;
