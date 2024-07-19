import { useState } from 'react'
import icons from '../image/upload.png'

const AddProduct = () => {

    const [image, setImage] = useState(false)

    const [productDetails, setProductDetails] = useState({
        name: '',
        category: '',
        new_price: '',
        old_price: '',
        image: ''
    })

    const imageHandle = (e) => {
        setImage((e.target.files[0]))
    }

    const changeHandle = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value
        })
    }

    const addProduct = async () => {

        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image)

        await fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData
        }).then((res) => res.json())
            .then( async (data) => {
                if (data.success) {
                    product.image = data.image_url
                    console.log(product);

                    await fetch('http://localhost:3000/addproduct', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)

                    }).then((res) => res.json())
                        .then((data)=> {
                            data.success?alert("Prduct add success"):alert("Upload Failed")
                        })
                }
            })

    }



    return (
        <div className='flex flex-col gap-4 text-xl font-semibold sm:w-[70%] w-full'>

            <div className='pl-12 gap-4 flex flex-col mt-6'>

                <div className='w-[80%] flex flex-col gap-4'>
                    <h4>Product title: </h4>
                    <input value={productDetails.name} onChange={changeHandle} type="text" name='name' placeholder='Type here...' className='w-[50%] border-[2px] rounded-md p-2 ' />
                </div>
                <div className='w-[80%] flex flex-col gap-4' >
                    <h4>Price: </h4>
                    <input value={productDetails.old_price} onChange={changeHandle} type="text" name='old_price' placeholder='Type here...' className='w-[50%] border-[2px] rounded-md p-2 ' />
                </div>
                <div className='w-[80%] flex flex-col gap-4' >
                    <h4>Offer Price: </h4>
                    <input value={productDetails.new_price} onChange={changeHandle} type="text" name='new_price' placeholder='Type here...' className=' w-[50%] border-[2px] rounded-md p-2 ' />
                </div>

                <div className='w-[80%] flex flex-col gap-4' >
                    <h4>Product category: </h4>
                    <select value={productDetails.category} onChange={changeHandle} name='category' id='' className='w-[20%]'>
                        <option value="Women">Women</option>
                        <option value="Men">Men</option>
                        <option value="Kid">Kid</option>
                    </select >
                </div>
                <div className='w-[80%] flex gap-2 items-center'>
                    <label htmlFor="file-input">
                        <img src={image ? URL.createObjectURL(image) : icons} alt="" className='h-[200px] rounded-sm inline-block' />
                    </label>
                    <input onChange={imageHandle} type="file" name='image' id='file-input' hidden className='text-lg font-medium' />
                </div>

                <button onClick={() => addProduct()} className='bg-black rounded-xl text-center text-white text-xl py-2 w-[200px]'>Add Product</button>

                <div className='h-[20px]'></div>
            </div>
        </div>
    )
}

export default AddProduct