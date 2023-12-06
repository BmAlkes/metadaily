"use client";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebaseConnection";
import { useSession } from "next-auth/react";
import ButtonRegister from "../components/buttonRegister";

interface TasksProps {
  id: string;
  time: string;
  program: string;
  what: string;
  clarifying: string;
  user?: userProps;
  created: string;
}
interface userProps {
  email: string;
  image: string;
  name: string;
}

const Tracker = () => {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function loadTasks() {
      const taskRef = collection(db, "tasks");
      const q = query(
        taskRef,
        orderBy("created", "desc"),
        where("user", "==", session?.user)
      );
      onSnapshot(q, (snapshot) => {
        let taskList = [] as TasksProps[];
        snapshot.forEach((doc) => {
          taskList.push({
            id: doc.id,
            time: doc.data().time,
            program: doc.data().program,
            what: doc.data().whats,
            clarifying: doc.data().clarifying,
            created: doc.data().created,
            user: doc.data().user,
          });
        });
        setTasks(taskList);
      });
    }
    loadTasks();
  }, [session?.user?.email]);
  console.log(tasks);

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
    const items = reorder(tasks, result.source.index, result.destination.index);
    setTasks(items);
  };

  const handleDelete = async (id: string) => {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  };
  const handleEdit = async (id: string) => {
    console.log(id);
  };
  return (
    <main className="container max-w-[1024px]   flex flex-col gap-8 px-4 pt-16 pb-8  mr-auto ml-auto ">
      <h1 className="mt-5 text-3xl font-light text-white font-display text-center">
        Tracks Tasks
      </h1>
      {tasks.length === 0 ? (
        <>
          <h2 className="mt-5 text-xl font-light text-white font-display text-center">
            No Tacks in record
          </h2>
          <ButtonRegister />
        </>
      ) : (
        <>
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
                    {tasks.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.id}
                      >
                        {(provided) => (
                          <tr
                            className={styles.tr}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <td className={styles.tdLabel} data-label="Hour">
                              {item.time}
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
                            <td
                              className={styles.tdLabel}
                              data-label="clarifying"
                            >
                              {item.clarifying}
                            </td>
                            <td
                              className={styles.tdLabel}
                              data-label="complete"
                            >
                              <button
                                onClick={() => {
                                  handleDelete(item.id);
                                }}
                                className="action"
                                style={{ backgroundColor: "#f63535" }}
                              >
                                <MdDeleteOutline color="#fff" size={25} />
                              </button>
                              <button
                                onClick={() => handleEdit(item.id)}
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
          <ButtonRegister />
        </>
      )}
    </main>
  );
};

export default Tracker;
