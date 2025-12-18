"use client";

import { TaskType } from "@/types/TaskType";
import { Check, ClipboardX, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface PropType {
  list: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

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

export default function TaskList({ list, setTasks }: PropType) {
  const [filterOption, setFilterOption] = useState<"All" | "Active" | "Completed">("All");
  const [filteredList, setFilteredList] = useState<TaskType[]>(list);

  useEffect(() => {
    if (filterOption === "All") {
      setFilteredList(list);
    } else if (filterOption === "Active") {
      setFilteredList((_) => list.filter((task) => task.completed === false));
    } else {
      setFilteredList((_) => list.filter((task) => task.completed === true));
    }
  }, [list, filterOption]);

  const completeTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast.success("Task removed successfully!");
  };
    
  const removeCompletedTasks = () => {
    if(list.filter((task => task.completed===true)).length>0) {
      setTasks((prev) => prev.filter((task) => task.completed !== true));
      toast.success("All the completed task removed successfully!");
      return;
    }
    toast.warning("No task is complete, nothing to remove!");
  };

  return (
    <>
      <div className="mt-5 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6)] rounded overflow-hidden">
        {filteredList.length ? (
          filteredList.map((task: TaskType) => (
            <div
              key={task.id}
              className="group bg-secondary relative text-lg px-4 sm:px-6 py-3 sm:py-4 not-last:border-b border-secondary-foreground 
                text-input grid grid-cols-[1fr_8%] xs:grid-cols-[1fr_5%] items-center justify-between cursor-pointer"
            >
              <div className="grid grid-cols-[10%_1fr] items-center w-full min-w-0">
                <input
                  type="checkbox"
                  id={task.name}
                  className="peer hidden"
                  checked={task.completed}
                  onChange={() => completeTask(task.id)}
                />

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
                  className="peer-checked:line-through peer-checked:text-secondary-foreground mt-[3px] pl-2.5 sm:pl-0 w-full
                    lowercase [&:first-letter]:uppercase block break-all overflow-wrap-anywhere min-w-0"
                >
                  {task.name}
                </label>
              </div>

              <X
                className="text-secondary-foreground hidden group-hover:block"
                onClick={() => removeTask(task.id)}
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center gap-1 bg-secondary py-10 px-4 font-semibold text-error">
            <ClipboardX className="w-10 h-10" />
            Looks empty here… Add a task to begin!
          </div>
        )}

        {/* Bottom Filter */}
        <div className="bg-secondary flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 text-sm text-accent-foreground">
          <p>
            {list.filter((task) => task.completed === false).length} items left
          </p>

          <div className="hidden sm:flex items-center gap-3 font-semibold">
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

          <div
            className="cursor-pointer hover:text-hover"
            onClick={removeCompletedTasks}
          >
            Clear completed
          </div>
        </div>
      </div>

      <div className="sm:hidden flex items-center justify-center gap-6 font-semibold bg-secondary mt-6 py-3 sm:py-4 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6)]">
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
    </>
  );
}
