"use client";
import { PlayIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import React, { useState } from "react";

const newCycleSchema = zod.object({
  task: zod.string().min(1, "Inform the task"),
  minutesAmount: zod
    .number()
    .min(5, "Cycle must need to be more than 5 minutes")
    .max(90, "Cycle must be less than 90 minutes"),
});

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  cicle: string;
  minutesAmount: number;
  day: string;
}
const Watch = () => {
  const [cycle, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { handleSubmit, register, reset } = useForm({
    resolver: zodResolver(newCycleSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const date = new Date();
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      cicle: data.task,
      minutesAmount: data.minutesAmount,
      day: `${date.toLocaleDateString()}`,
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    reset();
  };

  const activeCycles = cycle.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycles ? activeCycles.minutesAmount * 60 : 0;
  const currentSeconds = activeCycles ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  return (
    <main className="container max-w-[1024px] flex flex-col gap-8 px-6 pt-16 pb-8 mr-auto ml-auto ">
      <div className="flex justify-between items-center">
        <h2 className="mt-5 text-3xl font-light text-white font-display text-center">
          Stop Watch
        </h2>
        <div>
          <Link href="/history">
            <button>
              <img src="/item1.png" alt="" />
            </button>
          </Link>
          <Link href="/watch">
            <button>
              <img src="/item2.png" alt="" />
            </button>
          </Link>
        </div>
      </div>
      <div className="h-full flex-1 flex items-center justify-center">
        <form
          className=" flex flex-col gap-14 items-center"
          onSubmit={handleSubmit(handleCreateNewCycle)}
        >
          <div className=" w-full flex items-center justify-center text-white gap-2 flex-wrap text-lg font-semibold">
            <label htmlFor="task"> Will work in</label>
            <input
              type="text"
              id="task"
              className=" bg-transparent border-b-[2px] border-gray-500 h-10 font-bold px-2 fle-1 placeholder:text-center focus:border-green-500 "
              placeholder="Type your project"
              list="task-sugesstions"
              {...register("task")}
            />
            <datalist id="task-sugesstions">
              <option value="Study" />
              <option value="Workout" />
              <option value="Meditation" />
              <option value="Morning Routine" />
            </datalist>
            <label htmlFor="minutesAmount">during</label>
            <input
              type="number"
              id="minutesAmount"
              placeholder="00"
              max={90}
              step={5}
              min={5}
              {...register("minutesAmount", { valueAsNumber: true })}
              className=" bg-transparent w-16 border-b-[2px] border-gray-500 h-10 font-bold px-2 "
            />
            <span>minutes.</span>
          </div>
          <div className="w-full flex items-center justify-center lg:text-9xl text-5xl gap-3 ">
            <span className="bg-gray-500 text-neutral-950 p-4 rounded-xl">
              {minutes[0]}
            </span>
            <span className="bg-gray-500 text-neutral-950  p-4 rounded-xl">
              {minutes[1]}
            </span>
            <span className="text-green-500 ">:</span>
            <span className="bg-gray-500 text-neutral-950  p-4 rounded-xl">
              {seconds[0]}
            </span>
            <span className="bg-gray-500 text-neutral-950 p-4 rounded-xl">
              {seconds[1]}
            </span>
          </div>
          <button
            type="submit"
            className="w-full  bottom-10  text-white bg-green-700 font-display font-regular text-2xl p-2 hover:bg-green-500 rounded-lg  flex items-center justify-center gap-3 "
          >
            <PlayIcon size={25} /> Start
          </button>
        </form>
      </div>
    </main>
  );
};

export default Watch;
