import { MdOutlineKeyboardArrowDown } from "react-icons/md"
// import all_products from "../data/all_products"
import Item from "../components/Item";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

const Category = ({ category, banner }) => {

  const { all_products, scrollToTop } = useContext(ShopContext)
  const [sortedItems, setSortedItems] = useState(all_products);

  const [open, setOpen] = useState(false)
  const [ nameSort, setNameSort] = useState("")

  const totalProduct = all_products.filter(product => product.category === category).length

  const sortItems = (order) => {
    const sorted = [...all_products].sort((a, b) => {
      if (order === 'Price high to low') {
        return b.new_price - a.new_price;
      } else if (order === 'Price low to high') {
        return a.new_price - b.new_price;
      }
      return 0;
    });
    setSortedItems(sorted);
    setOpen(false); // Close the dropdown
    setNameSort(order)
  };

  useEffect(() => {
    scrollToTop("categoryTop")
    
  }, [])

  return (
    <div className="pb-10 px-8 flex flex-col items-center gap-8" id="categoryTop">
      <div className="w-full h-[420px]">
        <img src={banner} alt="banner" className="w-full h-full" />
      </div>

      <div className="w-[85%] flex justify-between items-center text-lg relative " >
        <div>
          <span className="font-semibold">Showing </span>
          <span className="pl-1">{totalProduct} products</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border-[2px] border-sky-200 rounded-3xl" onClick={() => setOpen(!open)}>Sort by {nameSort} <div className={` ${open && ('rotate-180')} `}><MdOutlineKeyboardArrowDown /></div> </div>

        {open && (
          <div className="absolute h-[100px] w-[150px] bg-[#fff] border-[2px] border-sky-200 shadow-md rounded-md -right-4 top-12 z-10 flex flex-col items-center justify-center gap-2">
            <span onClick={() => sortItems('Price high to low')}>Price high to low</span>
            <span onClick={() => sortItems('Price low to high')}>Price low to high</span>
          </div>
        )}



      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-14 '>
        {(sortedItems).map((item) => {
          if (item.category === category) {
            return (
              < Item key={item.id} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />

            );
          } else {
            return null;
          }
        })}

      </div>


    </div >
  )
}

export default Category