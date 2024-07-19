
import Hero from '../components/Hero'
import NewCollection from '../components/NewCollection'
import Popular from '../components/Popular'
import { useEffect, useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'

const Home = () => {

  const { scrollToTop } = useContext(ShopContext)
  useEffect(() => {
    scrollToTop('HomeTop')
  }, [])

  return (
    <div id='HomeTop'>
        <Hero/>
        <NewCollection/>
        <Popular/>
    </div>
  )
}

export default Home