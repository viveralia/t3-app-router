"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Todo, TodoSchema } from "../../schemas/Todo";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function TodoForm() {
  const router = useRouter();

  const form = useForm<Omit<Todo, "id">>({
    resolver: zodResolver(TodoSchema.omit({ id: true })),
  });

  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((values) => {
        createTodo.mutate(values);
      })}
    >
      <input type="text" {...form.register("title")} />
      <button type="submit" disabled={createTodo.isPending}>
        {createTodo.isPending ? "Adding..." : "Add todo"}
      </button>
    </form>
  );
}
