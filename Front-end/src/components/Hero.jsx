import React from 'react'
import { MdStar } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import bg from '../image/bg/bgecom.png'

const Hero = () => {
    return (
        <div className='w-full h-[800px] relative flex flex-col px-8 items-center'>

            <img src={bg} alt="" className='-z-10 absolute h-[100%] w-[95%]' />

            <div className='pl-[5%] gap-3 flex flex-col mt-[10%]'>
                <h1 className='text-5xl font-bold'>Digital Shopping Hub</h1>
                <p className='w-[70%] text-xl mt-2 text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum harum libero eligendi, tempora temporibus animi iure nostrum quisquam iste facere consectetur voluptatem amet, atque exercitationem expedita? Ad excepturi autem dolores?</p>
                <div className='flex flex-row items-center gap-2 mt-4'>
                    <div className='flex flex-row gap-2'>
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <MdStar />

                    </div>
                    <div className='gap-2 flex items-center'>
                        <span className='font-bold text-xl'>176k</span>
                        <span className='text-lg'>Exellent Reviews</span>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <NavLink to={""} className="bg-black rounded-2xl text-white px-4 py-2 text-xl font-bold">Shop now </NavLink>
                    <NavLink to={""} className="bg-black rounded-2xl text-white px-4 py-2 text-xl font-bold">Offers </NavLink>

                </div>


            </div>

        </div>
    )
}

export default Hero