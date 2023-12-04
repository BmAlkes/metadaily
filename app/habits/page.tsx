"use client";
import { FaRegTrashAlt } from "react-icons/fa";
import DayState from "../components/dayState";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebaseConnection";
interface HabitsProps {
  id: string;
  title: string;
  created: Date;
  habit: Habits;
  user: userProps;
}
interface userProps {
  email: string;
  image: string;
  name: string;
}
export type Habits = {
  [habit: string]: Record<string, boolean>;
};

const Habits = () => {
  const [habits2, setHabits] = useState<HabitsProps[]>([]);
  const { data: session } = useSession();

  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const sortedWeekDays = weekDays
    .slice(todayWeekDay + 1)
    .concat(weekDays.slice(0, todayWeekDay + 1));

  const last7Days = weekDays
    .map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);

      return date.toISOString().slice(0, 10);
    })
    .reverse();

  useEffect(() => {
    if (!session?.user) {
      redirect("/");
    }
  }, []);

  useEffect(() => {
    async function loadHabits() {
      const taskRef = collection(db, "habits");
      const q = query(
        taskRef,
        orderBy("created", "desc"),
        where("user", "==", session?.user)
      );
      onSnapshot(q, (snapshot) => {
        let habitLists = [] as HabitsProps[];
        snapshot.forEach((doc) => {
          habitLists.push({
            id: doc.id,
            title: doc.data().title,
            habit: doc.data().habit,
            created: doc.data().created,
            user: doc.data().user,
          });
        });
        setHabits(habitLists);
      });
    }
    loadHabits();
  }, [session?.user?.email]);

  const handleDelete = async (id: string) => {
    console.log(id);
    const docRef = doc(db, "habits", id);
    await deleteDoc(docRef);
  };

  return (
    <main className="container max-w-[1024px] relative flex flex-col gap-8 px-4 pt-16 pb-8  mr-auto ml-auto">
      {habits2 === null ||
        (Object.keys(habits2).length === 0 && (
          <h1 className="mt-20 text-4xl font-light text-white font-display text-center">
            You do not have registered habits
          </h1>
        ))}
      {habits2 !== null &&
        habits2.map((habit, index) => (
          <div key={habit.id} className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-white font-light text-xl font-sans">
                {habit.title}
              </span>
              <button onClick={() => handleDelete(habit.id)}>
                <FaRegTrashAlt size={26} color="#bf4242" />
              </button>
            </div>
            <Link href={`/habit/${habit.id}`}>
              <section className="grid grid-cols-7 bg-neutral-800 rounded-md px-2 py-3">
                {sortedWeekDays.map((day, index) => (
                  <div
                    className="flex flex-col items-center justify-center last:font-bold"
                    key={day}
                  >
                    <span key={day} className="font-sans text-sm text-white">
                      {day}
                    </span>
                    <DayState day={habit.habit[last7Days[index]]} />;
                  </div>
                ))}
              </section>
            </Link>
          </div>
        ))}
      <Link
        href="newHabit"
        className="w-2/3 text-center fixed bottom-10 left-1/2 -translate-x-1/2 text-neutral-900 bg-green-500 font-display font-regular text-2xl p-2 hover:bg-green-300 rounded-lg max-w-[1024px]"
      >
        New Habit
      </Link>
    </main>
  );
};

export default Habits;
