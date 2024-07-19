import { useEffect, useState } from 'react'
// import POPULAR from '../data/popular'
import Item from './Item'

const NewCollection = () => {
    const [newcollection, setNewcollection] = useState([])

    const getNewcollection = () => {
        fetch("http://localhost:3000/newcollection")
            .then((response) => response.json())
            .then((data) => {
                setNewcollection(data.reverse())
                console.log(data)
            })
    }

    useEffect(() => {
        getNewcollection()

    }, [])

    return (
        <div className='flex flex-col items-center gap-4'>
            <h1 className='text-3xl font-bold border-b-4 mt-10'>New Collection Product</h1>
            <hr />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-14 '>
                {newcollection.map((item) => (
                    < Item key={item.id} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>
        </div>
    )
}

export default NewCollection