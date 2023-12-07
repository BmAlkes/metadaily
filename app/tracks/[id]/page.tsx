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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";

interface EditTask {
  params: {
    id: string;
  };
}

const editTask = ({ params: { id } }: EditTask) => {
  const [time, setTime] = useState("");
  const [program, setProgram] = useState("");
  const [what, setWhat] = useState("");
  const [clarifying, setClarifying] = useState("");

  useEffect(() => {
    loadHabit(id);
  }, []);

  const loadHabit = async (id: string) => {
    const docRef = doc(db, "tasks", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.data() === undefined) {
      router.push("/tracks");
    }

    const databaseTask = {
      clarifying: snapshot.data()?.clarifying,
      created: snapshot.data()?.created,
      user: snapshot.data()?.user,
      program: snapshot.data()?.program,
      time: snapshot.data()?.time,
      what: snapshot.data()?.whats,
      id: id,
    };
    setTime(databaseTask.time);
    setProgram(databaseTask.program);
    setClarifying(databaseTask.clarifying);
    setWhat(databaseTask.what);
  };

  const handleUpdate = async () => {
    "use client";
    const updateTask = {
      time: time,
      program: program,
      whats: what,
      clarifying: clarifying,
    };
    const updateRef = doc(db, "tasks", id);
    await updateDoc(updateRef, updateTask)
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
    setTime("");
    setProgram("");
    setClarifying("");
    setWhat("");
  };

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

                <input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Program</Label>
                <input
                  type="text"
                  placeholder="Program..."
                  onChange={(e) => setProgram(e.target.value)}
                  value={program}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Whats Actually Happen</Label>
                <input
                  type="text"
                  placeholder="Whats Actually Happen"
                  onChange={(e) => setWhat(e.target.value)}
                  value={what}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Clarifying</Label>
                <input
                  type="text"
                  placeholder="Clarifying"
                  onChange={(e) => setClarifying(e.target.value)}
                  value={clarifying}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/tracks">
            <button className="border-2 text-white py-2 px-7 rounded-md bg-red-500 hover:bg-red-300">
              Back to Track Page
            </button>
          </Link>
          <Link href="/tracks">
            <button
              className="border-2 text-white py-2 px-7 rounded-md bg-green-500 hover:bg-green-300"
              onClick={handleUpdate}
            >
              Save Edit
            </button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default editTask;
