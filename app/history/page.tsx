"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./styles.module.css";

const History = () => {
  const [tasks, setTasks] = useState([
    {
      day: new Date().getDate(),
      task: "Study Js",
      during: "25:00",
      start: "",
      status: "done",
    },
    {
      day: new Date().getDay(),
      task: "Study React",
      during: "60:00",
      start: "",
      status: "cancel",
    },
    {
      day: new Date().getDay(),
      task: "Break",
      during: "15:00",
      start: "",
      status: "progress",
    },
  ]);
  return (
    <main className="container max-w-[1024px] flex flex-col gap-8 px-6 pt-16 pb-8 mr-auto ml-auto ">
      <div className="flex justify-between items-center">
        <h2 className="mt-5 text-3xl font-light text-white font-display text-center">
          Historic
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Task</th>
            <th scope="col">During</th>
            <th scope="col">Start</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody id="body">
          {tasks.map((item, index) => (
            <tr className={styles.tr} key={item.task}>
              <td className={styles.tdLabel} data-label="Day">
                {item.day}
              </td>
              <td className={styles.tdLabel} data-label="Task">
                {item.task}
              </td>
              <td className={styles.tdLabel} data-label="During">
                {item.during}
              </td>
              <td className={styles.tdLabel} data-label="Start">
                {item.start}
              </td>
              {item.status === "done" && (
                <td
                  className={`${styles.tdLabel} flex items-center gap-2 justify-center before:bg-green-500`}
                  data-label="Status"
                >
                  {item.status}
                </td>
              )}
              {item.status === "cancel" && (
                <td
                  className={`${styles.tdLabel} flex items-center gap-2 justify-center before:bg-red-500`}
                  data-label="Status"
                >
                  {item.status}
                </td>
              )}
              {item.status === "progress" && (
                <td
                  className={`${styles.tdLabel} flex items-center gap-2 justify-center before:bg-amber-400`}
                  data-label="Status"
                >
                  {item.status}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default History;
