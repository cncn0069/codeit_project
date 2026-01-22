'use server'

import { getTodoDetail } from '@/app/action';
import EditTodoForm from './EditTodoForm';
import { TodoListItemProps } from '@/app/components/Todo.types';


export default async function page({params}:any) {
  const { id } = await params;

  const initialData:TodoListItemProps = await getTodoDetail(id);

  return (
    <EditTodoForm initialData={initialData} id={id}/>
  );
}