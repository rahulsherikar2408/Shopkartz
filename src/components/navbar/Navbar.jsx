import React, { Fragment, useContext, useState, useEffect } from 'react'
import MyContext from '../../context/data/MyContext'
import { Link } from 'react-router-dom'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'

function Navbar() {

  const context = useContext(MyContext);
  const { mode, toggleMode, user: usersList } = context;

  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))

  // Match current user in Firestore users list to get full name
  const matchedUser = user && usersList && Array.isArray(usersList)
    ? usersList.find((u) => u.uid === user?.user?.uid || u.email === user?.user?.email)
    : null;

  const rawName =
    user?.user?.displayName ||
    user?.user?.name ||
    matchedUser?.name ||
    (user?.user?.email ? user.user.email.split('@')[0] : '');

  const userName = rawName
    ? rawName.charAt(0).toUpperCase() + rawName.slice(1)
    : '';

  useEffect(() => {
    if (user && matchedUser?.name && !user?.user?.displayName) {
      const updated = { ...user, user: { ...user.user, displayName: matchedUser.name } };
      localStorage.setItem('user', JSON.stringify(updated));
    }
  }, [matchedUser]);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login'
  }

  const cardItem = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);

  return (
    <div className="bg-white sticky top-0 z-50  " >
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[100] lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-[100] flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white shadow-2xl h-full overflow-y-auto" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100" style={{ borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                  <Link to={'/'} onClick={() => setOpen(false)} className="flex items-center">
                    <span className="text-xl font-extrabold text-pink-600 tracking-tight">ShopKartz</span>
                  </Link>
                  <button
                    type="button"
                    className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                    onClick={() => setOpen(false)}
                    style={{ backgroundColor: mode === 'dark' ? 'rgb(60 64 72)' : '' }}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 className="w-5 h-5" />
                  </button>
                </div>

                {/* User Info Card in Sidebar */}
                {user && userName ? (
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3 bg-pink-50/60" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                    <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-base flex-shrink-0 shadow-sm">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>Hello,</p>
                      <p className="text-sm font-bold text-gray-900 truncate" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {userName}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex-1 px-5 py-2 divide-y divide-gray-100" style={{ borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                  <Link
                    to={'/allproducts'}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 text-base font-medium transition-colors hover:text-pink-600"
                    style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                  >
                    <span>All Products</span>
                  </Link>

                  <Link
                    to={'/wishlist'}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 text-base font-medium transition-colors hover:text-pink-600"
                    style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                  >
                    <span>Wishlist</span>
                    {wishlistItems.length > 0 && (
                      <span className="bg-pink-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>

                  {user && (
                    <Link
                      to={'/order'}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3.5 text-base font-medium transition-colors hover:text-pink-600"
                      style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                    >
                      <span>My Orders</span>
                    </Link>
                  )}

                  {user?.user?.email === 'sherikarrahul59@gmail.com' && (
                    <Link
                      to={'/dashboard'}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3.5 text-base font-medium transition-colors hover:text-pink-600"
                      style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                    >
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  {!user ? (
                    <Link
                      to={'/login'}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3.5 text-base font-medium transition-colors hover:text-pink-600"
                      style={{ color: mode === 'dark' ? 'white' : '#1f2937' }}
                    >
                      <span>Login</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => { logout(); setOpen(false); }}
                      className="w-full flex items-center justify-between py-3.5 text-base font-semibold text-red-500 hover:text-red-600 transition-colors"
                    >
                      <span>Logout</span>
                    </button>
                  )}
                </div>

                <div className="mt-auto border-t border-gray-100 px-5 py-4" style={{ borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                  <div className="flex items-center">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt="India"
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-semibold tracking-wide" style={{ color: mode === 'dark' ? 'white' : '#374151', }}>INDIA</span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '', color: mode === 'dark' ? 'white' : '', }}>
          Get free delivery on orders over ₹300
        </p>

        <nav aria-label="Top" className="bg-gray-100 px-3 sm:px-6 lg:px-8 shadow-md" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="rounded-lg p-2 text-gray-500 lg:hidden hover:bg-gray-200 transition-colors"
                  onClick={() => setOpen(true)} 
                  style={{ backgroundColor: mode === 'dark' ? 'rgb(60 64 72)' : '', color: mode === 'dark' ? 'white' : '', }}
                >
                  <span className="sr-only">Open menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>

                {/* Logo */}
                <div className="ml-2 sm:ml-4 lg:ml-0 flex items-center">
                  <Link to={'/'} className='flex items-center'>
                    <h1 className='text-xl sm:text-2xl font-extrabold text-pink-600 tracking-tight'>ShopKartz</h1>
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-1 sm:space-x-3 lg:space-x-6">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  {user && userName && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 shadow-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                      <div className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-gray-800 max-w-[140px] truncate" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Hi, {userName}
                      </span>
                    </div>
                  )}

                  <Link to={'/allproducts'} className="text-sm font-medium hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? 'white' : '#374151', }}>
                    All Products
                  </Link>

                  <Link to={'/wishlist'} className="text-sm font-medium hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? 'white' : '#374151', }}>
                    Wishlist
                  </Link>

                  {!user ?
                    <Link to={'/login'} className="text-sm font-medium hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? 'white' : '#374151', }}>
                      Login
                    </Link> : ''}

                  {user ?
                    <Link to={'/order'} className="text-sm font-medium hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? 'white' : '#374151', }}>
                      Order
                    </Link> : ''}

                  {user?.user?.email === 'sherikarrahul59@gmail.com' ?
                    <Link to={'/dashboard'} className="text-sm font-medium hover:text-pink-600 transition-colors" style={{ color: mode === 'dark' ? 'white' : '#374151', }}>
                      Admin
                    </Link> : ''}

                  {user ? <button onClick={logout} className="text-sm font-medium hover:text-pink-600 transition-colors cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '#374151', }}>
                    Logout
                  </button> : ''}

                </div>

                {user && userName && (
                  <div className="hidden sm:flex lg:hidden items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                    <div className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-gray-800 max-w-[100px] truncate" style={{ color: mode === 'dark' ? 'white' : '' }}>
                      {userName}
                    </span>
                  </div>
                )}

                <div className="hidden lg:flex items-center">
                  <img
                    src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                    alt="India"
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-2 block text-xs font-semibold tracking-wider" style={{ color: mode === 'dark' ? 'white' : '#4b5563', }}>IND</span>
                </div>

                {/* Dark Mode Toggle */}
                <div className="flex items-center">
                  <button className='p-2 rounded-full hover:bg-gray-200 transition-colors' onClick={toggleMode} title="Toggle theme">
                    {mode === 'light' ?
                      (<FiSun size={22} className="text-gray-700" />
                      ) : (
                        <BsFillCloudSunFill size={22} className="text-yellow-400" />
                      )}
                  </button>
                </div>

                {/* Wishlist Icon */}
                <div className="flow-root">
                  <Link to={'/wishlist'} className="group flex items-center p-2 rounded-full hover:bg-gray-200 transition-colors relative" style={{ color: mode === 'dark' ? 'white' : '', }} title="Wishlist">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                    <span className="sr-only">items in wishlist</span>
                  </Link>
                </div>

                {/* Cart Icon */}
                <div className="flow-root">
                  <Link to={'/cart'} className="group flex items-center p-2 rounded-full hover:bg-gray-200 transition-colors relative" style={{ color: mode === 'dark' ? 'white' : '', }} title="Cart">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    {cardItem.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {cardItem.length}
                      </span>
                    )}
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar