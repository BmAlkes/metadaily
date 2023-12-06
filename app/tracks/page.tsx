"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
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

const Tracker = () => {
  const [task, setTask] = useState([
    {
      id: "0",
      hour: "10:00",
      program: "Work on Project",
      what: "didnt have time",
      clarifying: "Get out for super",
      complete: false,
    },
    {
      id: "1",
      hour: "11:00",
      program: "Work on Project2",
      what: "complete",
      clarifying: "",
      complete: true,
    },
    {
      id: "2",
      hour: "12:00",
      program: "Work on Project2",
      what: "didnt have time",
      clarifying: "Lunch time",
      complete: false,
    },
  ]);
  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(task, result.source.index, result.destination.index);
    setTask(items);
  };
  return (
    <main className="container max-w-[1024px]   flex flex-col gap-8 px-4 pt-16 pb-8  mr-auto ml-auto ">
      <h1 className="mt-5 text-3xl font-light text-white font-display text-center">
        Tracks Tasks
      </h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Hour</th>
            <th scope="col">Program</th>
            <th scope="col">What actually happened</th>
            <th scope="col">Clarifying</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" type="list" direction="vertical">
            {(provided) => (
              <tbody
                id="body"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {task.map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                      <tr
                        className={styles.tr}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <td className={styles.tdLabel} data-label="Hour">
                          {item.hour}
                        </td>
                        <td className={styles.tdLabel} data-label="Program">
                          {item.program}
                        </td>
                        <td
                          className={styles.tdLabel}
                          data-label="Whats actually happened"
                        >
                          {item.what}
                        </td>
                        <td className={styles.tdLabel} data-label="clarifying">
                          {item.clarifying}
                        </td>
                        <td className={styles.tdLabel} data-label="complete">
                          <button
                            className="action"
                            style={{ backgroundColor: "#f63535" }}
                          >
                            <MdDeleteOutline color="#fff" size={25} />
                          </button>
                          <button
                            className="action"
                            style={{ backgroundColor: "#353bf6" }}
                          >
                            <FaRegEdit color="#fff" size={25} />
                          </button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      <Link
        href="/"
        className="w-2/3 text-center fixed bottom-10 left-1/2 -translate-x-1/2 text-neutral-900 bg-green-500 font-display font-regular text-2xl p-2 hover:bg-green-300 rounded-lg max-w-[1024px]"
      ></Link>

      <Dialog>
        <DialogTrigger asChild>
          <button className="w-2/3 text-center fixed bottom-10 left-1/2 -translate-x-1/2 text-neutral-900 bg-green-500 font-display font-regular text-2xl p-2 hover:bg-green-300 rounded-lg max-w-[1024px]">
            New Tasks
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Make changes to your tasks here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Hour</Label>
              <input id="name" type="time" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Program</Label>
              <input
                id="username"
                type="text"
                placeholder="Inform the task"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Clarifying</Label>
              <input
                id="username"
                type="text"
                placeholder="Clarifyng"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">What Actually Happened</Label>
              <textarea
                className="col-span-3 resize-none"
                placeholder="..."
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <button className="border-2 p-2 rounded-md" type="submit">
              Save changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Tracker;
