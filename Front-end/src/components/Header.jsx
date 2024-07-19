import { Link } from 'react-router-dom'
import logo from '../image/shop_logo.png'
import Navbar from './Navbar'
import { BsCart3 } from "react-icons/bs";
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

const Header = () => {

  const { getTotalItemsInCart, NavbarSelect } = useContext(ShopContext);

  const token = localStorage.getItem('token');

  const logOutHandler = () => {

    localStorage.removeItem('token');
    window.location.href = '/';
    NavbarSelect("select1")
  }

  return (

    <section className='flex justify-center sticky top-0 fix z-10 border-black-600 border-b-10 bg-white py-2 ring-1 ring-slate-200 overflow-hidden'>

      <div className='flex justify-between items-center w-[90%] text-xl font-semibold'>
        {/* Logo */}
        <div >
          <Link><img src={logo} alt="" className='h-[80px]' /></Link>

        </div>

        < Navbar />
        <div className='flex justify-center items-center gap-4' >
          <Link to={"/cart"} className='relative h-[50px] w-[50px] flex items-center justify-center'>
            <BsCart3 size={25} />
            <div className='rounded-full bg-orange-600 absolute top-0 right-0 h-[20px] w-[20px] flex items-center justify-center text-xs text-white' >
              <span>{getTotalItemsInCart()}</span>
            </div>
          </Link>
          {token ?
            <div className='bg-orange-600 rounded-3xl text-center px-6 py-2 text-white cursor-pointer' onClick={logOutHandler}>Log out</div> :
            <Link to={"/login"}>  <div className='bg-orange-600 rounded-3xl text-center px-6 py-2 text-white cursor-pointer'>Login</div></Link>
          }


        </div>


      </div>
    </section>


  )
}

export default Header