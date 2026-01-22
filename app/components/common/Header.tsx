import Gnb from '../Gnb'

function Header() {
  return (
    <header className='w-full border-b border-[#E2E8F0] bg-white mb-4'>
      <div className='max-w-[1200px] mx-auto px-4 md:px-6 h-[60px] flex items-center'>
        <Gnb />
      </div>
    </header>
  )
}

export default Header