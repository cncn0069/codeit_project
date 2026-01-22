'use server'
import Image from "next/image";
import Search from "./components/Search";
import MemoCRUDButton from "./components/ui/MemoCRUDButton";
import TodoList from "./components/TodoList";
import { TodoListItemProps, TodoListProps } from "./components/Todo.types";
import { getTodos } from "./action";
import TodoSearchInputSection from "./components/TodoSearchInputSection";

export default async function Home() {

  const todoData = await getTodos();

  return (
    <div className="flex w-full flex-col gap-10 bg-white">
      <TodoSearchInputSection />
      <div>
        <TodoList data={todoData} />
      </div>
    </div>
  );
}
