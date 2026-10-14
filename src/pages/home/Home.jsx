import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <div className="flex justify-center my-8">
        <Link to={'/allproducts'}>
          <button className='bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-2.5 rounded-xl shadow-md transition-all duration-300 hover:scale-105'>
            See More Products
          </button>
        </Link>
      </div>
      <Track />
      <Testimonial />
    </Layout>
  )
}

export default Home