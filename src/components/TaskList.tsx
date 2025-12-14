"use client";

import { TaskType } from "@/types/TaskType";
import data from "../data/data.json";
import { Check, ClipboardX, X } from "lucide-react";
import { useState } from "react";

const filters: { id: number; label: "All" | "Active" | "Completed" }[] = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Active",
  },
  {
    id: 3,
    label: "Completed",
  },
];

export default function TaskList() {
  const [filterOption, setFilterOption] = useState<"All" | "Active" | "Completed">("All");

  return (
    <div className="mt-5 shadow-2xl rounded overflow-hidden">
      {data.length ? (
        <>
          {data.map((task: TaskType) => (
            <div
              key={task.id}
              className="group bg-secondary relative text-lg px-6 py-4 not-last:border-b border-secondary-foreground 
              text-input grid grid-cols-[1fr_5%] items-center justify-between cursor-pointer"
            >
              <div className="grid grid-cols-[10%_1fr] items-center w-full">
                <input type="checkbox" id={task.name} className="peer hidden" />
                <div
                  className="w-6 h-6 rounded-full overflow-hidden bg-secondary-foreground
                  group-hover:bg-[linear-gradient(140deg,hsl(192,100%,67%),hsl(280,87%,65%))]
                  peer-checked:bg-[linear-gradient(140deg,hsl(192,100%,67%),hsl(280,87%,65%))]
                  cursor-pointer flex items-center justify-center
                  relative
                  after:content-['']
                  after:w-5 after:h-5 after:rounded-full
                  after:bg-secondary
                  after:absolute after:transition-all after:ease-in-out
                  peer-checked:after:bg-transparent"
                />
                <Check
                  className="w-3.5 h-3.5 text-white hidden peer-checked:block transition-all ease-in-out 
                  absolute top-0 bottom-0 my-auto translate-x-1.25"
                />

                <label
                  htmlFor={task.name}
                  className="peer-checked:line-through peer-checked:text-secondary-foreground mt-[3px] w-full"
                >
                  {task.name}
                </label>
              </div>

              <X className="text-secondary-foreground hidden group-hover:block" />
            </div>
          ))}

          <div className="bg-secondary flex items-center justify-between gap-3 px-6 py-4 text-sm text-accent-foreground">
            <p>{data.length} items left</p>

            <div className="flex items-center gap-3 font-bold">
              {filters.map((filter) => (
                <div
                  key={filter.id}
                  className={
                    filterOption === filter.label
                      ? "text-accent"
                      : "hover:text-hover cursor-pointer"
                  }
                  onClick={() => setFilterOption(filter.label)}
                >
                  {filter.label}
                </div>
              ))}
            </div>

            <div className="cursor-pointer hover:text-hover">
              Clear completed
            </div>
          </div>
        </>
      ) : (
        <div className="text-xl flex items-center justify-center gap-3 text-red-300">
          <ClipboardX className="w-10 h-10" />
          Looks empty here… Add your first task to begin!
        </div>
      )}
    </div>
  );
}
