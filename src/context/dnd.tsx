"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

interface DndProviderProps {
  children: React.ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
}

export function DndProvider({ children, onDragEnd }: DndProviderProps) {
  return (
    <DndContext onDragEnd={onDragEnd}>
      <>{children}</>
    </DndContext>
  );
}
