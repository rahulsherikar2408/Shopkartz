import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromWishlist } from '../../redux/wishlistSlice'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillDelete, AiOutlineShoppingCart } from 'react-icons/ai'

function Wishlist() {
    const context = useContext(MyContext)
    const { mode } = context

    const dispatch = useDispatch()
    const wishlistItems = useSelector((state) => state.wishlist)
    const navigate = useNavigate()

    const removeFromWishlist = (item) => {
        dispatch(deleteFromWishlist(item))
        toast.success('Removed from wishlist')
    }

    const moveToCart = (item) => {
        const user = localStorage.getItem('user')
        if (!user) {
            toast.error('Please login to add to cart')
            navigate('/login')
            return
        }
        dispatch(addToCart(item))
        toast.success('Added to cart')
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 min-h-[70vh]">
                <div className="mb-8">
                    <h1
                        className="text-2xl sm:text-3xl font-bold title-font text-gray-900"
                        style={{ color: mode === 'dark' ? 'white' : '' }}
                    >
                        My Wishlist ({wishlistItems.length})
                    </h1>
                    <div className="h-1 w-20 bg-pink-600 rounded mt-2"></div>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((item, index) => {
                            const { id, title, price, imageUrl, category, description } = item
                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl border-2 border-gray-200 border-opacity-60 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                                    style={{
                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                                        color: mode === 'dark' ? 'white' : '',
                                    }}
                                >
                                    <div
                                        onClick={() => navigate(`/productinfo/${id || item.id}`)}
                                        className="cursor-pointer overflow-hidden relative group"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={title}
                                            className="w-full h-64 object-cover p-2 rounded-2xl group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {category && (
                                            <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                                                {category}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div>
                                            <h2
                                                className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                                style={{ color: mode === 'dark' ? 'rgb(156 163 175)' : '' }}
                                            >
                                                ShopKartz
                                            </h2>
                                            <h1
                                                className="title-font text-lg font-medium text-gray-900 mb-2 truncate"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}
                                                title={title}
                                            >
                                                {title}
                                            </h1>
                                            {description && (
                                                <p
                                                    className="text-xs text-gray-500 mb-2 line-clamp-2"
                                                    style={{ color: mode === 'dark' ? 'rgb(209 213 219)' : '' }}
                                                >
                                                    {description}
                                                </p>
                                            )}
                                            <p
                                                className="text-lg font-bold text-gray-900 mb-4"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}
                                            >
                                                ₹{price}
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <button
                                                type="button"
                                                onClick={() => moveToCart(item)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                                            >
                                                <AiOutlineShoppingCart className="w-4 h-4" />
                                                Add to Cart
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeFromWishlist(item)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                                                title="Remove from Wishlist"
                                            >
                                                <AiFillDelete className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 text-pink-600 mb-4">
                            <svg
                                className="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <h2
                            className="text-2xl font-bold mb-2"
                            style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            Explore our latest collections and save your favorite items for later!
                        </p>
                        <Link to="/allproducts">
                            <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-md transition-all">
                                Explore Products
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Wishlist
