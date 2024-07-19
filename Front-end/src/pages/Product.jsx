
import { useParams } from "react-router-dom";

import { MdStar } from 'react-icons/md'

import { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";


const Product = () => {

  const { all_products, addToCart, scrollToTop } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_products.find(product => product.id === Number(productId));

  useEffect(() => {
    scrollToTop("productTop")
  }, [])

  if (!product) {
    return (
      <div className="flex flex-col gap-6 pl-6" id="productTop">
        <span className="font-base text-lg  mt-10">Product not found</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pl-6" id="productTop">
      <span className="font-base text-lg  mt-10">{product.name}</span>
      <div className="flex gap-4 justify-around">

        <img src={product.image} alt="" className="w-[35%]" />
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-3xl">{product.name}</span>
          <div className='flex flex-row gap-1 items-center'>
            <MdStar color="yellow" size={25} />
            <MdStar color="yellow" size={25} />
            <MdStar color="yellow" size={25} />
            <MdStar color="yellow" size={25} />
            <MdStar color="yellow" size={25} />
            <span className="px-4 font-semibold text-lg">5 star</span>
          </div>
          <div className="flex gap-4 text-xl font-semibold mb-4">
            <div className="text-orange-500 line-through">{product.old_price}</div>
            <div>{product.new_price}</div>
          </div>
          <div className='flex gap-2'>
            <button onClick={() => { addToCart(product.id) }} className="bg-black  text-white px-4 w-[300px] py-3 text-xl font-bold border-2 flex items-center justify-center">Add to cart </button>
            <button className="bg-white  text-black px-4 w-[300px] py-3 text-xl font-bold border-2 flex items-center justify-center" >Buy Now </button>

          </div>
        </div>
      </div>

      <div className="mt-10 bg-black  text-white px-4 w-[200px] py-1 text-xl font-bold border-2 flex items-center justify-center">Description</div>
      <p className="text-lg w-[90%] px-[5%] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis optio maxime iure sint ab minima, quisquam animi perspiciatis culpa nesciunt
        quis magnam maiores excepturi vero quaerat quasi dignissimos rerum ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores mollitia iure tenetur provident quibusdam sequi architecto numquam obcaecati, adipisci impedit nulla dolores nisi exercitationem repellendus sapiente quae perferendis saepe nemo.
        Aliquid quia deserunt accusamus, tempora sequi molestias voluptatibus, libero autem fugiat cumque ipsa, fugit corporis odio repellat! Sint, illo iusto, inventore id doloribus sapiente, quos at eligendi ex molestiae aspernatur!
        Cumque in voluptatum, praesentium blanditiis, delectus at deserunt libero aliquid deleniti facere sint magni itaque? Omnis alias tempora id corrupti, saepe amet, voluptas unde ab rerum, a iure obcaecati accusamus.
        Incidunt laudantium ducimus voluptates consequatur? Asperiores odio, iure, enim facere minima harum laborum nam tempore commodi magni a quisquam quis qui earum ratione eius expedita officiis deleniti. Ratione, debitis laboriosam.
        Dolore hic repellendus ab ipsa dignissimos est non alias eveniet sint porro aliquid facere, excepturi animi, dolor saepe tempora fugit perferendis minus soluta incidunt, quis ducimus? Provident aperiam tenetur consectetur!
        Odit et deserunt aliquam. Illo ipsam corporis architecto adipisci perferendis! Atque, pariatur hic, doloribus beatae corrupti iste ducimus consequatur numquam, quam similique ad! Quos maiores tenetur aut voluptatibus, repudiandae eveniet.
        Eligendi aspernatur dolor sapiente cumque ea praesentium perspiciatis magni molestias, deserunt modi natus! Aliquid ipsam consequatur ab beatae nobis accusantium blanditiis fugiat iste aliquam! Sed excepturi minus culpa libero eaque.
        Culpa, possimus nam veritatis nihil sint voluptatibus ex illum omnis cupiditate deleniti alias rerum natus enim. Exercitationem, pariatur illo consequuntur veniam quidem porro excepturi et quas a numquam eius ullam.
        Asperiores, quos saepe veniam libero quas nam fuga cumque ab minima magnam obcaecati natus tempora incidunt earum non tempore optio excepturi a exercitationem aspernatur praesentium. Autem, explicabo. Quam, eos voluptatum.</p>

    </div>



  );
};

export default Product;

