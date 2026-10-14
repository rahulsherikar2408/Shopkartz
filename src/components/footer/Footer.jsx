import { useContext } from 'react'
import { Link } from 'react-router-dom'
import myContext from '../../context/data/MyContext'

export default function Footer() {
  const context = useContext(myContext)
  const { mode } = context
  return (
    <footer className="text-gray-600 body-font bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
      <div className="container px-5 py-12 mx-auto" >
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-gray-900 tracking-wider text-sm mb-4 uppercase" style={{ color: mode === 'dark' ? 'white' : '' }}>Quick Links</h2>
            <nav className="list-none mb-10 space-y-2">
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>Home</Link>
              </li>
              <li>
                <Link to={'/allproducts'} className="text-gray-600 hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>All Products</Link>
              </li>
              <li>
                <Link to={'/order'} className="text-gray-600 hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>Orders</Link>
              </li>
              <li>
                <Link to={'/cart'} className="text-gray-600 hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>Cart</Link>
              </li>
              <li>
                <Link to={'/wishlist'} className="text-gray-600 hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>Wishlist</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-gray-900 tracking-wider text-sm mb-4 uppercase" style={{ color: mode === 'dark' ? 'white' : '' }}>Customer Service</h2>
            <nav className="list-none mb-10 space-y-2">
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>Return Policy</Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>About Us</Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>Contact Support</Link>
              </li>
              <li>
                <Link to={'/'} className="text-gray-600 hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>FAQ & Help</Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-gray-900 tracking-wider text-sm mb-4 uppercase" style={{ color: mode === 'dark' ? 'white' : '' }}>Security & Trust</h2>
            <nav className="list-none mb-10 space-y-2">
              <li>
                <span className="text-gray-600 block text-sm" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>🔒 100% Secure Checkout</span>
              </li>
              <li>
                <span className="text-gray-600 block text-sm" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>🚚 Free Delivery over ₹300</span>
              </li>
              <li>
                <span className="text-gray-600 block text-sm" style={{ color: mode === 'dark' ? '#d1d5db' : '' }}>✨ Easy 7-Day Returns</span>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 flex flex-col justify-center items-center md:items-start">
            <p className="text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wider" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>We Accept</p>
            <img src="https://ecommerce-sk.vercel.app/pay.png" alt="Payment methods" className="max-w-[200px]" />
          </div>
        </div>

      </div>

      <div className="bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(55 57 61)' : '', color: mode === 'dark' ? 'white' : '', }}>
        <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
          <Link to={'/'} className='flex'>
            <div className="flex ">
              <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>ShopKartz</h1>
            </div>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4" style={{ color: mode === 'dark' ? 'white' : '' }}>© 2025 ShopKartz —
            <a rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank" style={{ color: mode === 'dark' ? 'white' : '' }}>www.shopkartz.com</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx={4} cy={4} r={2} stroke="none" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}