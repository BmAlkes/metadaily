"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

interface EditTask {
  params: {
    id: string;
  };
}

const editTask = ({ params: { id } }: EditTask) => {
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
                <Label htmlFor="name">Name</Label>
                <input id="name" placeholder="Name of your project" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/tracks">
            <button className="border-2 text-white py-2 px-7 rounded-md bg-red-500">
              Cancel
            </button>
          </Link>
          <button className="border-2 text-white py-2 px-7 rounded-md bg-green-500">
            Save Edit
          </button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default editTask;