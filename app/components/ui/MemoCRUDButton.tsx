'use client'
import React, { useEffect, useState } from 'react'
import { BtnProps, MEMO_CRUD_BUTTON_IMAGE_MAP } from './Button.types'
import BaseButton from './BaseButton';
import Image from 'next/image';



function MemoCRUDButton({ action= 'add', stat = 'active', ...props }: BtnProps) {
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

  const fileName =  '/img/btn/'+ MEMO_CRUD_BUTTON_IMAGE_MAP[action][currentSize][stat];

  return (
    <BaseButton {...props}>
      <Image
        src={fileName}
        alt={`${action} button`}
        fill
        className='object-fill'
      />
    </BaseButton>
  )
}

export default MemoCRUDButton