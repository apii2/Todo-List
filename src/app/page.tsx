"use client";

import Todo from "@/components/Todo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function page() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
}
