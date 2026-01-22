'use server'

import { revalidatePath } from "next/cache";
import { TodoListItemProps, TodoListUpdateDto } from "./components/Todo.types";

const BACKEND_URL = 'https://assignment-todolist-api.vercel.app/api/cncn0069/items/'

//목록 가져오기
export async function getTodos() {
    const res = await fetch(`${BACKEND_URL}`,{cache: 'no-cache'})
    return res.json();
}
//디테일 가져오기
export async function getTodoDetail(id:string) {
    const res = await fetch(`${BACKEND_URL}${id}`,{cache: 'no-cache'})
    return res.json();
}

export async function updateTodo(data:TodoListItemProps){

    const receiveData = data;

    const updateData:TodoListUpdateDto = {
        name: receiveData.name,
        memo:receiveData.memo ?? "",
        isCompleted:receiveData.isCompleted,
        imageUrl: receiveData.imageUrl ?? "",
    }

    const res = await fetch(`${BACKEND_URL}${receiveData.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    })
    revalidatePath('/');
    revalidatePath(`/todo/${data.id}`);
}

export async function uploadTodoImage(formData:FormData){
    const res = await fetch(`https://assignment-todolist-api.vercel.app/api/cncn0069/images/upload`,{
        method: 'POST',
        body: formData,
    })

    return res.json();
}

// 삭제
export async function deleteTodo(id:string){
    await fetch(`${BACKEND_URL}${id}`,{method: 'DELETE'})
    revalidatePath('/');
}