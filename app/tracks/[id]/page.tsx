"use client";
import { db } from "@/app/services/firebaseConnection";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";

interface EditTask {
  params: {
    id: string;
  };
}

const editTask = ({ params: { id } }: EditTask) => {
  // const [task, setTasks] = useState();

  // useEffect(() => {
  //   loadHabit(id);
  // }, []);

  // const loadTask = async (id: string) => {
  //   const docRef = doc(db, "tasks", id);
  //   const snapshot = await getDoc(docRef);
  //   if (snapshot.data() === undefined) {
  //     router.push("/tracks");
  //   }

  //   const Tasks = {
  //     title: snapshot.data()?.title,
  //     habit: snapshot.data()?.habit,
  //     user: snapshot.data()?.user,
  //     taskId: id,
  //   };
  //   setTasks(Tasks);
  // };

  return (
    <main className="container max-w-[1024px]   flex flex-col gap-8 px-4 pt-16 pb-8  mr-auto ml-auto ">
      <Card className=" w-full max-w-[850px] mr-auto ml-auto ">
        <CardHeader>
          <CardTitle>Edit Task</CardTitle>
          <CardDescription>Here you can edit the Task</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Time</Label>
                <input type="time" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Program</Label>
                <input type="text" placeholder="Program..." />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Whats Actually Happen</Label>
                <input type="text" placeholder="Whats Actually Happen" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Clarifying</Label>
                <input type="text" placeholder="Clarifying" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/tracks">
            <button className="border-2 text-white py-2 px-7 rounded-md bg-red-500 hover:bg-red-300">
              Cancel
            </button>
          </Link>
          <button className="border-2 text-white py-2 px-7 rounded-md bg-green-500 hover:bg-green-300">
            Save Edit
          </button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default editTask;
