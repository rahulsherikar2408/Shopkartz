import React, { useContext, useEffect } from 'react'
import Filter from '../../components/filter/Filter'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { addToWishlist, deleteFromWishlist } from '../../redux/wishlistSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

function AllProducts() {
    const context = useContext(MyContext)
    const { mode, product, searchkey, filterType, filterPrice } = context

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart);
    const wishlistItems = useSelector((state) => state.wishlist);
    const navigate = useNavigate();

    const addCart = (product) => {
        const user = localStorage.getItem('user');
        if (!user) {
            toast.error('Please login to add to cart');
            navigate('/login');
            return;
        }
        dispatch(addToCart(product));
        toast.success('Product added to cart');
    }

    const toggleWishlist = (item, e) => {
        if (e) e.stopPropagation();
        const user = localStorage.getItem('user');
        if (!user) {
            toast.error('Please login to use wishlist');
            navigate('/login');
            return;
        }
        const isWishlisted = wishlistItems.some(w => (w.id || w.title) === (item.id || item.title));
        if (isWishlisted) {
            dispatch(deleteFromWishlist(item));
            toast.success('Removed from wishlist');
        } else {
            dispatch(addToWishlist(item));
            toast.success('Added to wishlist');
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const filteredProducts = product
        .filter((obj) => {
            if (!searchkey || searchkey.trim() === '') return true;
            return (obj.title || '').toLowerCase().includes(searchkey.toLowerCase().trim());
        })
        .filter((obj) => {
            if (!filterType || filterType.trim() === '') return true;
            const category = (obj.category || '').toLowerCase().trim();
            const targetType = filterType.toLowerCase().trim();
            return category === targetType || category.includes(targetType);
        })
        .filter((obj) => {
            if (!filterPrice || filterPrice.trim() === '') return true;
            const priceNum = parseFloat(obj.price);
            if (isNaN(priceNum)) return true;
            if (filterPrice.includes('-above')) {
                const min = parseFloat(filterPrice.split('-')[0]);
                return priceNum >= min;
            }
            const [minStr, maxStr] = filterPrice.split('-');
            const min = parseFloat(minStr);
            const max = parseFloat(maxStr);
            if (!isNaN(min) && !isNaN(max)) {
                return priceNum >= min && priceNum <= max;
            }
            return true;
        });

    return (
        <Layout>
            <Filter />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-8 md:py-16 mx-auto">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                        <div className="h-1 w-20 bg-pink-600 rounded"></div>
                    </div>

                    <div className="flex flex-wrap -m-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item, index) => {
                                const { title, price, imageUrl, id } = item;
                                const isWishlisted = wishlistItems.some(w => (w.id || w.title) === (id || title));
                                return (
                                    <div key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                                        <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden relative" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <div className="relative">
                                                <div onClick={() => navigate(`/productinfo/${id || item.id}`)} className="flex justify-center cursor-pointer" >
                                                    <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out object-cover" src={imageUrl} alt="blog" />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => toggleWishlist(item, e)}
                                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all z-10"
                                                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                                >
                                                    {isWishlisted ? (
                                                        <AiFillHeart className="w-5 h-5 text-red-500" />
                                                    ) : (
                                                        <AiOutlineHeart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                                    )}
                                                </button>
                                            </div>
                                            <div className="p-5 border-t-2">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>ShopKartz</h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
                                                <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                                                <div className=" flex justify-center">
                                                    <button type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            addCart(item);
                                                        }}
                                                        className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">Add To Cart</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="w-full text-center py-8">
                                <p className="text-gray-500 text-lg" style={{ color: mode === 'dark' ? 'white' : '' }}>No products found</p>
                            </div>
                        )}
                    </div>

                </div>
            </section >
        </Layout>
    )
}

export default AllProducts