"use client";

import { TaskType } from "@/types/TaskType";
import data from "../json/data.json";
import { ClipboardX, SaveOff } from "lucide-react";

export default function TaskList() {
  return (
    <div className="mt-5 shadow-2xl rounded overflow-hidden">
      {data.length ? (
        data.map((task:TaskType) => (
          <div key={task.id} className="bg-secondary text-lg px-6 py-4 not-last:border-b border-secondary-foreground text-input">
            {task.name}
          </div>
        ))
      ) : (
        <div className="text-xl flex items-center justify-center gap-3 text-red-300">
          <ClipboardX className="w-10 h-10" />
          Looks empty here… 
          Add your first task to begin!
        </div>
      )}
    </div>
  );
}
