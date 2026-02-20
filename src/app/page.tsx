"use client";

import Todo from "@/components/Todo";
import useTheme from "@/utils/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function page() {
  const queryClient = new QueryClient();

  const { theme, setTheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <Todo theme={theme} setTheme={setTheme} />
    </QueryClientProvider>
  );
}
