import Quotes from '../components/Quotes'
import Auth1 from '../components/Auth1'

export default function Signin() {
  return (
    <div className='flex'>
      <div className='w-full lg:w-[50%]'>
        <Auth1 type={'signin'}/>
      </div>
      <div className='w-[50%] hidden lg:block'>
        <Quotes/>
      </div>
    </div>
  )
}
