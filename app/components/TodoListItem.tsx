import Image from 'next/image'
import React from 'react'
import { TodoListItemProps } from './Todo.types';
import Link from 'next/link';

function TodoListItem({id,name,memo,imageUrl,isCompleted}:TodoListItemProps) {
    const imageSrc = `/ic/checkbox/${isCompleted ? 'checkbox.svg' : 'emptybox.svg'}`;

  return (
    <Link href={'/detail/' + id} >
      <div className={`border w-full rounded-full pl-2 h-[50px] flex gap-2 items-center ${isCompleted ? "bg-[#ede9fe] line-through" : "bg-white"} cursor-pointer` }>
          <Image src={imageSrc} alt='box' height={32} width={32}/>
          <span className='text-sm'>{name}</span>
      </div>
    </Link>
  )
}

export default TodoListItem