 import React from 'react'
 
interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
}

 function BaseButton({children, onClick, className,...props}: BaseButtonProps) {
   return (
     <button className={`relative flex items-center justify-center leading-none text-[0px] ${className}`} onClick={onClick} {...props}>
        {children}
    </button>
   )
 }
 
 export default BaseButton