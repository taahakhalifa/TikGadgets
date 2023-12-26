import { Menu } from 'lucide-react'

const MobileNav = () => {
  return (
    <div>
      <button
        type='button'
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 '>
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>
    </div>
  )
}

export default MobileNav