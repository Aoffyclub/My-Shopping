import React from 'react'
import { Link } from 'react-router-dom'
import image1 from '../image/add_product.png'
import image2 from '../image/list_product.png'


const Sidebar = () => {
    return (
        <div className='py-7 flex gap-4 sm:w-[30%] sm:flex-col flex-row w-full bg-white  font-semibold text-lg items-center sm:justify-start justify-center'>
            <Link to={"/AddProduct"}>
                <button  className='flex justify-center items-center gap-4 bg-slate-200 px-6 py-2 rounded-xl'>
                    <img src={image1} alt="" height={50} width={50} />
                    <span>Add Product</span>
                </button>
            </Link>

            <Link to={"/ListProduct"} >
                <button className='flex justify-center items-center gap-4 bg-slate-200 px-6 py-2 rounded-xl'>
                    <img src={image2} alt="" height={50} width={50} />
                    <span>List Product</span>
                </button>
            </Link>
        </div>
    )
}

export default Sidebar