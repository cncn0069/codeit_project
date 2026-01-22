'use client'
import React, { useState } from 'react'
import Search from './Search';
import MemoCRUDButton from './ui/MemoCRUDButton';
import { TodoListItemProps } from './Todo.types';
import { useRouter } from 'next/navigation';

function TodoSearchInputSection() {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const [todoData,setTodoData] = useState<TodoListItemProps[]>([]);

    const handleOnClick = async ()=>{
        if(inputValue === "") {
            console.log("input을 찾을 수 없습니다.");
            return;
        }
        try {
            const res = await fetch('/api/todo' ,{
            method : 'POST',
            body: JSON.stringify({
                    "name": inputValue
                })
            })
            // fetchTodos();
            
        } catch (error) {
            console.log(error);
        }

        setInputValue('');
        //버튼 누른후 새로고침
        router.refresh();
    }
  return (
    <div className="flex w-full pr-2 gap-4 m-4">
        <Search value={inputValue} onChange={(e:any) => {setInputValue(e.target.value)}}/>
        <MemoCRUDButton action="add" stat={inputValue === "" ? 'default' : 'active'} onClick={handleOnClick} className={'h-[56px] max-w-[56px] min-w-[56px]  min-[375px]:w-[168px] min-[375px]:min-w-[168px] cursor-pointer'}/>
    </div>
  )
}

export default TodoSearchInputSection