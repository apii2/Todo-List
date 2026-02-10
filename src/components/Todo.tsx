"use client";

import TaskList from "@/components/TaskList";
import { MoonStar, Pencil, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { TaskType } from "@/types/TaskType";
import { toast } from "sonner";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { addTodo, getTodos } from "@/services/todoServices";
import { useQuery } from "@tanstack/react-query";

export default function Todo() {
  const [newTask, setNewTask] = useState("");
  const [isLight, setIsLight] = useState(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const { data: todos, isLoading: todoLoading, error } = useQuery({
    queryKey: ["todos", refresh],
    queryFn: getTodos,
  });

  useEffect(() => {
    if (todos) {
      setTasks(todos.results);
    }
    setIsLoading(todoLoading);
  }, [todos, todoLoading]);

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [isLight]);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const taskAlreadyExist = tasks.find((task) => task.name === newTask.trim());
    if (taskAlreadyExist) {
      toast.warning("Task already added!");
      setNewTask("");
      return;
    }

    await addTodo(newTask);
    setRefresh((prev) => prev + 1);
    setNewTask("");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const draggedTaskId = active.id as number;
    const targetTaskId = over.id as number;

    const draggedIndex = tasks.findIndex((task) => task.id === draggedTaskId);
    const targetIndex = tasks.findIndex((task) => task.id === targetTaskId);

    if (draggedIndex === -1 || targetIndex === -1) {
      return;
    }

    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);

    setTasks(newTasks);
  };

  return (
    <div className="w-full max-w-[86%] sm:max-w-xl min-h-screen md:min-w-lg">
      <header className="w-full text-white flex items-center justify-between">
        <h1 className="uppercase text-4xl font-bold tracking-[1rem]">Todo</h1>

        <div className="relative group">
          {isLight ? (
            <MoonStar
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsLight(false)}
            />
          ) : (
            <Sun
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsLight(true)}
            />
          )}

          {/* Floating tooltip */}
          <div
            className="absolute top-0 right-0 translate-x-full
              bg-white text-black text-sm px-2 pt-1 rounded 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-500 pointer-events-none
              whitespace-nowrap shadow-lg"
          >
            {isLight ? "Switch to dark mode" : "Switch to light mode"}
          </div>
        </div>
      </header>

      <form className="my-4 sm:my-8" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center justify-between w-full bg-secondary shadow-xl rounded px-4 sm:px-6">
          <input
            type="text"
            name="task"
            value={newTask}
            placeholder="Create a new todo..."
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full pt-4 sm:pt-5 pb-3 sm:pb-4 text-lg focus-visible:border-0 outline-0"
          />

          <button type="submit">
            <Pencil className="w-5 h-5 text-input cursor-pointer hover:scale-110" />
          </button>
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <TaskList list={tasks} isLoading={isLoading} setRefresh={setRefresh} error={error} />
        </DndContext>

        {tasks.length > 0 && (
          <div className="text-accent-foreground text-center mt-5 sm:mt-10 text-sm">
            Drag and drop to reorder list
          </div>
        )}
      </form>
    </div>
  );
}
