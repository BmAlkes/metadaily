import { db } from "@/app/services/firebaseConnection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

const ButtonRegister = () => {
  const [time, setTime] = useState("");
  const [program, setProgram] = useState("");
  const [what, setWhat] = useState("");
  const [clarifying, setClarifying] = useState("");
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (time === "" && program === "" && clarifying === "" && what === "")
      return;
    try {
      await addDoc(collection(db, "tasks"), {
        time: time,
        program: program,
        clarifying: clarifying,
        whats: what,
        created: new Date(),
        user: session?.user,
      });
      setOpen(!open);
      setTime(""), setClarifying(""), setProgram(""), setWhat("");
    } catch (e: any) {
      console.log("Error" + e.message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-2/3 text-center fixed bottom-10 left-1/2 -translate-x-1/2 text-neutral-900 bg-green-500 font-display font-regular text-2xl p-2 hover:bg-green-300 rounded-lg max-w-[1024px]">
          New Tasks
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Make changes to your tasks here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Hour</Label>
              <input
                id="name"
                type="time"
                className="col-span-3"
                onChange={(e) => setTime(e.target.value)}
                value={time}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Program</Label>
              <input
                type="text"
                placeholder="Inform the task"
                className="col-span-3"
                onChange={(e) => setProgram(e.target.value)}
                value={program}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Clarifying</Label>
              <input
                id="username"
                type="text"
                placeholder="Clarifyng"
                className="col-span-3"
                onChange={(e) => setClarifying(e.target.value)}
                value={clarifying}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">What Actually Happened</Label>
              <textarea
                className="col-span-3 resize-none"
                placeholder="..."
                onChange={(e) => setWhat(e.target.value)}
                value={what}
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <button className="border-2 p-2 rounded-md" type="submit">
              Save changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonRegister;
