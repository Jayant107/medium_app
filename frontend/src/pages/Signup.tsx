import Quotes from '../components/Quotes'
import Auth from '../components/Auth'

export default function Signup() {
  return (
    <div className='flex'>
      <div className='w-full lg:w-[50%]'>
        <Auth type={'signup'}/>
      </div>
      <div className='w-[50%] hidden lg:block'>
        <Quotes/>
      </div>
    </div>
  )
}
