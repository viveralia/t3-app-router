"use client";

import { api } from "~/trpc/react";
import type { Todo } from "~/schemas/Todo";
import { useRouter } from "next/navigation";

export function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter();

  const updateTodo = api.todo.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <li
      className={todo.isComplete ? "line-through" : ""}
      onClick={() => {
        if (updateTodo.isPending) return;

        updateTodo.mutate({ id: todo.id, isComplete: !todo.isComplete });
      }}
    >
      {todo.title}
    </li>
  );
}
