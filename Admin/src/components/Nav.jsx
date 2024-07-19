
import image from '../image/shop_logo.png';
import profile from '../image/profile.png';

const Nav = () => {
  return (
    <div className='bg-white flex justify-between items-center px-10 text-2xl font-bold py-2 ring-1 ring-slate-200'>
        <div> <img src={image} alt="" className='h-[75px]' /></div>
        <div className='uppercase bg-orange-400 px-6 py-4 rounded-md tracking-widest line-clamp-1 text-white'>Admin Panel</div>
        <div><img src={profile} alt=""  className='h-[50px] rounded-full'/></div>
    </div>
  )
}

export default Nav