"use client";
import { useEffect, useState } from "react";
import ArrowIcon from "../ArrowIcon";
import DayState from "../dayState";
import { revalidatePath } from "next/cache";
import { db } from "@/app/services/firebaseConnection";
import { doc, setDoc, updateDoc } from "firebase/firestore";

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);
  const firstDayWeekDay = date.getDay();
  const numberOfEmptyDays = Array(firstDayWeekDay).fill(null);
  const days = [...numberOfEmptyDays];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

type ToggleHabitParams = {
  habit: string;
  habitStreak: Record<string, boolean> | null;
  date: string | null;
  done?: boolean;
};

function Calendar({
  habit,
  habitStreak,
  id,
}: {
  habit: string | undefined;
  habitStreak: Record<string, boolean> | null;
  id: string;
}) {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState(
    getDaysInMonth(currentMonth, currentYear)
  );

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(month, year));
    setSelectedDate(new Date(year, month, 1));
  }, [month, year]);

  function goToPreviousMonth() {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }

  function goToNextMonth() {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  function getFullDateString() {
    const monthName = `${selectedDate.toLocaleString("pt-BR", {
      month: "long",
    })}`;

    const upperCaseMonthName = monthName[0].toUpperCase() + monthName.slice(1);
    return `${upperCaseMonthName} de ${selectedDate.getFullYear()}`;
  }

  function getDayString(day: Date) {
    return `${year.toString()}-${(month + 1).toString().padStart(2, "0")}-${day
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  }

  async function toggleHabit({
    habit,
    habitStreak,
    date,
    done,
  }: ToggleHabitParams) {
    if (!habitStreak || !date) {
      return;
    }

    const updatedHabitStreak = {
      habit: {
        ...habitStreak,
        [date]: done === undefined ? true : !done,
      },
    };
    const updateRef = doc(db, "habits", id);
    await updateDoc(updateRef, updatedHabitStreak)
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <section className="w-full my-2 rounded-md bg-neutral-800">
      <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
        <button onClick={goToPreviousMonth}>
          <ArrowIcon className="stroke-neutral-400" width={12} height={12} />
        </button>
        <span>{getFullDateString()}</span>
        <button onClick={goToNextMonth}>
          <ArrowIcon
            width={12}
            height={12}
            className="rotate-180 stroke-neutral-400"
          />
        </button>
      </div>
      <div className="grid w-full grid-cols-7 mt-2">
        {weekDays.map((day) => (
          <div key={day} className="flex flex-col items-center p-2">
            <span className="font-sans text-xs font-light text-neutral-200">
              {day}
            </span>
          </div>
        ))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2 "
            onClick={() =>
              toggleHabit({
                habit,
                habitStreak,
                date: getDayString(day),
                done: habitStreak ? habitStreak[getDayString(day)] : true,
              })
            }
          >
            <span className="font-sans text-xs font-light text-neutral-400 text-center">
              {day?.getDate()}
            </span>
            {day && (
              <DayState
                day={habitStreak ? habitStreak[getDayString(day)] : undefined}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Calendar;
