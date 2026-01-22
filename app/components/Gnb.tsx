import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Gnb() {
  return (
    <div className='w-fit pl-[10%]'>
        <Link href={'/'}> 
            {/* 모바일 */}
            <div className='block md:hidden'>
                <Image loading="eager" alt='Mobile' src='/img/do_it-mobile.svg' width={71} height={40} />
            </div>
            {/* 태블릿 */}
            <div className='hidden md:block lg:hidden'>
                <Image loading="eager" alt='desktop' src='/img/do_it-pc.svg' width={151} height={40} />
            </div>
            {/* pc */}
            <div className='hidden lg:block'>
                <Image loading="eager" alt='desktop' src='/img/do_it-pc.svg' width={151} height={40} />
            </div>
        </Link>    
    </div>
  )
}

export default Gnb