import { useEffect, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";


const ListProduct = () => {

    const [allProducts, setAllProducts] = useState([])

    const fetchProducts = async () => {
        await fetch('http://localhost:3000/allproducts')
            .then((res => res.json()))
            .then((data) => {
                setAllProducts(data.reverse())
                console.log(data)
            })
    }

    const removeProduct = async (id) => {
        await fetch('http://localhost:3000/deleteproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
            })
        })
           .then((res) => res.json())
           .then((data) => {
                if (data.success) {
                    console.log("remove product")
                    fetchProducts()
                }
            })


    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='flex flex-col gap-4 text-xl font-semibold sm:w-[70%] w-full'>
            <div className="pl-12 gap-4 flex flex-col mt-6">
                <h4 className="w-full text-xl font-bold">Product List</h4>

                <div className="max-h-[75vh] overflow-auto">
                    <table className='w-full mx-auto '>
                        <thead className="bg-slate-300">
                            <tr>
                                <th className='p-2'>Products</th>
                                <th className='p-2'>Title</th>
                                <th className='p-2'>Old price</th>
                                <th className='p-2'>New price</th>
                                <th className='p-2'>Category</th>
                                <th className='p-2'>Remove</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-500">

                            {allProducts.map((product, i) => (

                                <tr key={i}>
                                    <td className="border">
                                        <div className="flex items-center justify-center h-[115px]">
                                            <img src={product.image} alt="" className="h-[100px]" />

                                        </div>
                                    </td>
                                    <td className="border"> <div className="flex items-center justify-center"> {product.name}</div></td>
                                    <td className="border"> <div className="flex items-center justify-center"> ${product.old_price}</div></td>
                                    <td className="border"> <div className="flex items-center justify-center"> ${product.new_price}</div></td>
                                    <td className="border"> <div className="flex items-center justify-center"> {product.category}</div></td>
                                    <td className="border">
                                        <div className="flex items-center justify-center">
                                            <button onClick={() => removeProduct(product.id)}><RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    </td>

                                </tr>

                            ))}

                        </tbody>


                    </table>
                </div>

            </div>

        </div>
    )
}

export default ListProduct