"use client";

import { TaskType } from "@/types/TaskType";
import data from "../json/data.json";
import { Check, ClipboardX, X } from "lucide-react";

export default function TaskList() {
  return (
    <div className="mt-5 shadow-2xl rounded overflow-hidden">
      {data.length ? (
        <>
        {data.map((task: TaskType) => (
          <div
            key={task.id}
            className="group bg-secondary relative text-lg px-6 py-4 not-last:border-b border-secondary-foreground 
            text-input flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                id={task.name}
                className="peer appearance-none"
              />
              <div
                className="w-6 h-6 rounded-full overflow-hidden bg-secondary-foreground
                group-hover:bg-[linear-gradient(140deg,hsl(192,100%,67%),hsl(280,87%,65%))]
                peer-checked:bg-[linear-gradient(140deg,hsl(192,100%,67%),hsl(280,87%,65%))]
                cursor-pointer flex items-center justify-center mr-5
                relative
                after:content-['']
                after:w-5 after:h-5 after:rounded-full
                after:bg-secondary
                after:absolute after:transition-all after:ease-in-out
                peer-checked:after:bg-transparent"
              />
              <Check className="w-3.5 h-3.5 text-white hidden peer-checked:block transition-all ease-in-out 
                absolute top-0 bottom-0 my-auto translate-x-1" />

              <label
                htmlFor={task.name}
                className="peer-checked:line-through peer-checked:text-secondary-foreground mt-[3px] w-full"
              >
                {task.name}
              </label>
            </div>

            <X className="text-secondary-foreground hidden group-hover:block"/>
          </div>
        ))}

        <div className="bg-secondary flex items-center justify-between gap-3 px-6 py-4 text-sm text-accent-foreground">
          <p>
            5 items left
          </p>

          <div className="flex items-center gap-3">
            <div>All</div>
            <div>Active</div>
            <div>Completed</div>
          </div>

          <div>
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
