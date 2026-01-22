import Image from 'next/image'
import React, { forwardRef } from 'react'

//할일 하기 입력칸


const Search =({value,onChange}:any) => {
  return (
      <input 
        type="text" 
        placeholder="할 일을 입력해주세요" 
        className="w-full max-[1016px] h-[56px] pl-3
              bg-[#f1f5f9] text-slate-700 placeholder-slate-400
              border-2 border-[#0f172a] rounded-full 
              shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]
              outline-none"
        value={value}
        onChange={onChange}
      />
  )
};

export default Search