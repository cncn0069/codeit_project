import Image from 'next/image'
import React from 'react'
import { TodoListItemProps } from './Todo.types';
import Link from 'next/link';
import { updateTodo, uploadTodoImage } from '../action';

function TodoListItem({id,name,memo,imageUrl,isCompleted}:TodoListItemProps) {
  const imageSrc = `/ic/checkbox/${isCompleted ? 'checkbox.svg' : 'emptybox.svg'}`;

  const handleOnChange = async()=>{
    await updateTodo({
      id: id,
      name: name,
      memo: memo,
      imageUrl: imageUrl,
      isCompleted: !isCompleted
    })
  }

  return (
      <div className={`border w-full rounded-full pl-2 h-[50px] flex gap-2 items-center ${isCompleted ? "bg-[#ede9fe] line-through" : "bg-white"} cursor-pointer` }>
          <Image onClick={handleOnChange} src={imageSrc} alt='box' height={32} width={32}/>
          <Link href={`/detail/${id}`} className="flex-1 h-full flex items-center">
            <span className="text-sm cursor-pointer">{name}</span>
          </Link>
      </div>
  )
}

export default TodoListItem