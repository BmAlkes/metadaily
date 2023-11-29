import { FaRegTrashAlt } from "react-icons/fa";
import DayState from "../components/dayState";
import Link from "next/link";

const Habits = () => {
  const habits = {
    "drink water": {
      "2023-11-30": true,
      "2023-11-29": true,
      "2023-11-28": false,
    },
    "Study Code": {
      "2023-11-30": false,
      "2023-11-29": true,
      "2023-11-28": false,
    },
    Gym: {
      "2023-11-30": true,
      "2023-11-29": false,
      "2023-11-28": true,
    },
  };
  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const sortedWeekDays = weekDays
    .slice(todayWeekDay + 1)
    .concat(weekDays.slice(0, todayWeekDay + 1));

  return (
    <main className="container max-w-[1024px] relative flex flex-col gap-8 px-4 pt-16  mr-auto ml-auto">
      {habits === null ||
        (Object.keys(habits).length === 0 && (
          <h1 className="mt-20 text-4xl font-light text-white font-display text-center">
            You do not have registered habits
          </h1>
        ))}
      {habits !== null &&
        Object.entries(habits).map(([habit, habitStreak]) => (
          <div key={habit} className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-white font-light text-xl font-sans">
                {habit}
              </span>
              <button>
                <FaRegTrashAlt size={26} color="#bf4242" />
              </button>
            </div>
            <section className="grid grid-cols-7 bg-neutral-800 rounded-md px-2 py-3">
              {sortedWeekDays.map((day) => (
                <div
                  className="flex flex-col items-center justify-center last:font-bold"
                  key={day}
                >
                  <span key={day} className="font-sans text-sm text-white">
                    {day}
                  </span>
                  {/* {day state} */}
                  <DayState day={true} />
                </div>
              ))}
            </section>
          </div>
        ))}
      <Link
        href="newHabit"
        className="w-2/3 text-center fixed bottom-10 left-1/2 -translate-x-1/2 text-neutral-900 bg-green-500 font-display font-regular text-2xl p-2 hover:bg-green-300 rounded-lg max-w-[1024px]"
      >
        New Habit
      </Link>
    </main>
  );
};

export default Habits;
