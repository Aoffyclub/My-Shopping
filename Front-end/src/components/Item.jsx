import { Link } from "react-router-dom"

const Item = ({ id, name, image, new_price, old_price }) => {
  return (
    <div className="shadow-lg rounded-xl flex flex-col items-center overflow-hidden w-[295px]">
      <div className="h-[400px] w-[295px] overflow-hidden">
        <Link to={`/product/${id}`} >
            <img src={image} alt="product popular" className="scale-105 hover:scale-110 translate-x-1 duration-150 " />
        </Link>

      </div>
      <div className="mt-4 w-[95%]">
        <h4 className="text-lg font-bold">{name}</h4>
        <div className="flex gap-4 text-lg mb-4">
          <div className="text-orange-500 line-through">{old_price}</div>
          <div>{new_price}</div>
        </div>
      </div>
    </div>
  )
}

export default Item