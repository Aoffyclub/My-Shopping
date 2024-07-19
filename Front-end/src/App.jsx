
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Category from './pages/Category'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Footer from './components/Footer'

import bannermen from './image/banner/bannermens.png'
import bannerwomen from './image/banner/bannerwomens.png'
import bannerkid from './image/banner/bannerkids.png'




export default function App() {
  return (

    <main className="bg-primary text-base">

        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/mens' element={<Category category="Men" banner={bannermen} />} />
            <Route path='/womens' element={<Category category="Women" banner={bannerwomen} />} />
            <Route path='/kids' element={<Category category="Kid" banner={bannerkid} />} />
            <Route path='/product/:productId' element={<Product />} />

            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />

          </Routes>

          <Footer />
        </BrowserRouter>


    </main>
  )
}