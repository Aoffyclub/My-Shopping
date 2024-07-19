import { Route, Routes } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import AddProduct from "../components/AddProduct"
import ListProduct from "../components/ListProduct"


const Admin = () => {
  return (
    <div className="flex sm:flex-row  flex-col">
        <Sidebar/>

        <Routes>
            <Route path="/addproduct" element={<AddProduct/>}/>
            <Route path="/listproduct" element={<ListProduct/>}/>
        </Routes>

    </div>
  )
}

export default Admin