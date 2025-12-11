"use client";

import TaskList from "@/components/TaskList";
import { Moon, MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function page() {
  const [newTask, setNewTask] = useState("");
  const [isLight, setIsLight] = useState(true);

  useEffect(()=>{
    if (isLight) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  },[isLight]);

  return (
    <div className="max-w-xl min-w-lg">
      <header className="w-full uppercase text-4xl text-white font-bold tracking-[1rem] flex items-center justify-between">
        Todo
        {isLight ? 
          <MoonStar className="w-6 h-6 cursor-pointer" onClick={()=>setIsLight(false)} /> : 
          <Sun className="w-6 h-6 cursor-pointer" onClick={()=>setIsLight(true)} />}
          {/* TODO: when hover on the sun or moon show floating change theme div */}
      </header>

      <div className="my-8">
        <input
          type="text"
          name="task"
          value={newTask}
          placeholder="Create a new todo..."
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full bg-secondary px-6 py-4 rounded text-lg shadow-2xl focus-visible:border-0 outline-0"
        />

        <TaskList />
      </div>
    </div>
  );
}
