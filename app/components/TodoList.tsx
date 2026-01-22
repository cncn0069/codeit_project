'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import TodoListItem from './TodoListItem'
import { TodoListItemProps, TodoListProps } from './Todo.types'

function TodoList({ data }:TodoListProps) {
  if(!data)
    return;
  // true Todo 다 받아서 완료 한거 안한거 나눈 다음 Item으로 전부 표현
  const todoCompleted = data.filter((i:TodoListItemProps) => i.isCompleted);
  // false
  const todoUnCompleted = data.filter((i:TodoListItemProps) => !i.isCompleted);

  const [currentSize, setCurrentSize] = useState<'small' | 'large'>('large');
  
  useEffect(() => {
    // 375px 미만인지 확인하는 매치 쿼리
    const mediaQuery = window.matchMedia('(max-width: 374px)');
  
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      // e.matches가 true이면 375px 미만(small), false이면 이상(large)
      setCurrentSize(e.matches ? 'small' : 'large');
    };
  
    // 초기 실행
    handleResize(mediaQuery);
  
    // 이벤트 리스너 등록
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);
  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">

        {/* todo */}
          <div className='border-none p-4'>
            <Image className='mb-4' src={'/img/todo.svg'} alt='todo' height={36} width={101} />
            { todoUnCompleted.length == 0 ? 
            <div className='flex flex-col items-center'>
              <Image className='mb-4' src={currentSize === "large" ? '/img/empty/t_l.svg' : '/img/empty/t_s.svg'} alt='todo' height={currentSize === "large" ? 240 : 120} width={currentSize === "large" ? 240 : 120} />
              <span className='text-[#94a3b8]'>할일이 없어요</span>
              <span className='text-[#94a3b8]'>Todo를 새롭게 추가해조세요!</span>
            </div>
            :
              <div className='flex flex-col gap-4'>
              {todoUnCompleted.map((it:TodoListItemProps) => (<TodoListItem key={it.id} {...it} />))}
            </div>
            }
            
            
          </div>
          {/* done */}
          <div className='border-none p-4'>
            <Image className='mb-4' src={'/img/done.svg'} alt='todo' height={36} width={101} />
            <div className='flex flex-col gap-4'>
              {todoCompleted.length == 0 ? 
              <div className='flex flex-col items-center'>
                <Image className='mb-4' src={currentSize === "large" ? '/img/empty/d_l.svg' : '/img/empty/d_s.svg'} alt='todo' height={currentSize === "large" ? 240 : 120} width={currentSize === "large" ? 240 : 120} />
                <span className='text-[#94a3b8]'>아직 다 한 일이 없어요</span>
                <span className='text-[#94a3b8]'>해야 할 일을 체크해보세요!</span>
              </div>
              :
              todoCompleted.map((it:TodoListItemProps) => (<TodoListItem key={it.id} {...it} />))}
            </div>
          </div>
      </div>
  )
}

export default TodoList