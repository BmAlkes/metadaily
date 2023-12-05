import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

const Tracker = () => {
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
            <th scope="col">Complete</th>
          </tr>
        </thead>
        <tbody id="body">
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="teste1">
              teste 1
            </td>
            <td className={styles.tdLabel} data-label="teste2">
              teste 2
            </td>
            <td className={styles.tdLabel} data-label="teste3">
              teste 3
            </td>
            <td className={styles.tdLabel} data-label="teste4">
              teste 4
            </td>
            <td className={styles.tdLabel} data-label="teste5">
              <input type="checkbox" />
            </td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="teste1">
              teste 1
            </td>
            <td className={styles.tdLabel} data-label="teste2">
              teste 2
            </td>
            <td className={styles.tdLabel} data-label="teste3">
              teste 3
            </td>
            <td className={styles.tdLabel} data-label="teste4">
              teste 4
            </td>
            <td className={styles.tdLabel} data-label="teste5">
              <input type="checkbox" />
            </td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="teste1">
              teste 1
            </td>
            <td className={styles.tdLabel} data-label="teste2">
              teste 2
            </td>
            <td className={styles.tdLabel} data-label="teste3">
              teste 3
            </td>
            <td className={styles.tdLabel} data-label="teste4">
              teste 4
            </td>
            <td className={styles.tdLabel} data-label="teste5">
              <input type="checkbox" />
            </td>
          </tr>
        </tbody>
      </table>
      <Link
        href="/"
        className="w-2/3 text-center fixed bottom-10 left-1/2 -translate-x-1/2 text-neutral-900 bg-green-500 font-display font-regular text-2xl p-2 hover:bg-green-300 rounded-lg max-w-[1024px]"
      >
        <button>New Tasks</button>
      </Link>
    </main>
  );
};

export default Tracker;
