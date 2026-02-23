"use client";

import dynamic from "next/dynamic";

const Todo = dynamic(() => import("@/components/Todo"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center text-xl">
      <Loader className="w-10 h-10 animate-spin text-accent" />
      Loading...
    </div>
  ),
});


import useTheme from "@/utils/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export default function page() {
  const queryClient = new QueryClient();

  const { theme, setTheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <Todo theme={theme} setTheme={setTheme} />
    </QueryClientProvider>
  );
}
