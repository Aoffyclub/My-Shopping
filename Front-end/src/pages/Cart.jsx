import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { RiDeleteBin6Line } from "react-icons/ri";


const Cart = () => {
  const { all_products, cartItems, removeFromCart, getTotalCartAmount, scrollToTop } = useContext(ShopContext);

  useEffect(() => {
   scrollToTop("cartTop")
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center " id="cartTop">
      {/* loop cart */}
      <table className="w-[90%] mt-6">
        <thead>
          <tr className="bg-stone-200">
            <th className="p-1 py-2 border">Products</th>
            <th className="p-1 py-2 border">Title</th>
            <th className="p-1 py-2 border">Price</th>
            <th className="p-1 py-2 border">Quantity</th>
            <th className="p-1 py-2 border">Total</th>
            <th className="p-1 py-2 border">Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cartItems).map(([productId, quantity]) => {
            if (quantity > 0) {
              const product = all_products.find(product => product.id === Number(productId));
              return (
                <tr key={product.id}>
                  <td className="p-1 py-2 border text-center">
                    <img src={product.image} alt={product.name} className="w-[60px] my-0 mx-auto rounded-md" />
                  </td>
                  <td className="p-1 py-2 border text-center">{product.name}</td>
                  <td className="p-1 py-2 border text-center">${product.new_price.toFixed(2)}</td>
                  <td className="p-1 py-2 border text-center">{quantity}</td>
                  <td className="p-1 py-2 px-6 border text-center">${(product.new_price * quantity).toFixed(2)}</td>
                  <td className="p-1 py-2 border text-center">
                    <button onClick={() => removeFromCart(product.id)}><RiDeleteBin6Line /></button>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <div className="mt-6 flex flex-col gap-2 w-[90%] items-center">
        <span className="font-bold text-2xl">Summary</span>
        <div className="w-[80%] flex justify-between items-center">
          <span className="font-semibold">Subtotal:</span>
          <span>${getTotalCartAmount().toFixed(2)}</span>
        </div>
        <hr className="w-[80%]" />
        <div className="w-[80%] flex justify-between items-center">
          <span className="font-semibold">Shipping Fee:</span>
          <span>Free</span>
        </div>
        <hr className="w-[80%]" />
        <div className="w-[80%] flex justify-between items-center">
          <span className="font-bold text-lg">Total:</span>
          <span>${getTotalCartAmount().toFixed(2)}</span>
        </div>
        <hr className="w-[80%]" />
        <div className="w-[80%] mt-8">
          <button className="flex justify-center items-center bg-black text-white font-semibold rounded-3xl py-2 px-4">
            <span>Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
