import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { AuthProviders } from "../_components/auth";
import { TodoForm } from "../_components/todo-form";
import { TodoItem } from "../_components/todo-item";

export default async function TodosPage() {
  const session = await getServerAuthSession();

  if (!session) return <AuthProviders />;

  return (
    <div className="grid grid-cols-2">
      <AllTodos />
      <TodoForm />
    </div>
  );
}

async function AllTodos() {
  const todos = await api.todo.getOwn();

  return (
    <div>
      <h1>All of your todos:</h1>
      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <p>No todos yet</p>
      )}
    </div>
  );
}
