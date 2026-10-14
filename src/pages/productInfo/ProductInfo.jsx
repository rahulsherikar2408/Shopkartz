import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { addToWishlist, deleteFromWishlist } from '../../redux/wishlistSlice';
import { firedb } from '../../firebase/FirebaseConfig';

function ProductInfo() {
    const context = useContext(MyContext);
    const { loading, setLoading, mode } = context;

    const [products, setProducts] = useState('')
    const params = useParams()
    const navigate = useNavigate();
    // console.log(products.title)

    const getProductData = async () => {
        setLoading(true)
        try {
            const productTemp = await getDoc(doc(firedb, "products", params.id))
            // console.log(productTemp)
            setProducts(productTemp.data());
            // console.log(productTemp.data())
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getProductData()

    }, [])



    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)
    const wishlistItems = useSelector((state) => state.wishlist)
    const isWishlisted = products ? wishlistItems.some(w => (w.id || w.title) === (params.id || products.title)) : false;

    // add to cart
    const addCart = (products) => {
        const user = localStorage.getItem('user');
        if (!user) {
            toast.error('Please login to add to cart');
            navigate('/login');
            return;
        }
        dispatch(addToCart(products));
        toast.success('Product added to cart');
    }

    const toggleWishlist = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            toast.error('Please login to use wishlist');
            navigate('/login');
            return;
        }
        const itemToToggle = { ...products, id: params.id };
        if (isWishlisted) {
            dispatch(deleteFromWishlist(itemToToggle));
            toast.success('Removed from wishlist');
        } else {
            dispatch(addToWishlist(itemToToggle));
            toast.success('Added to wishlist');
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems])




    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden py-10" style={{ color: mode === 'dark' ? 'white' : '' }}>
                <div className="container px-5 py-6 mx-auto">
                    {products &&
                        <div className="lg:w-4/5 mx-auto flex flex-wrap items-center bg-white p-6 sm:p-10 rounded-3xl shadow-lg border border-gray-100" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                            <div className="lg:w-1/2 w-full flex justify-center items-center p-4">
                                <img
                                    alt={products.title}
                                    className="w-full max-h-[420px] object-contain object-center rounded-2xl shadow-sm transition-transform duration-300 hover:scale-105"
                                    src={products.imageUrl}
                                />
                            </div>
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-xs font-bold tracking-widest text-pink-600 uppercase mb-2">
                                    {products.category || 'ShopKartz Exclusive'}
                                </h2>
                                <h1 className="text-gray-900 text-2xl sm:text-3xl title-font font-bold mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    {products.title}
                                </h1>
                                <div className="flex items-center mb-5">
                                    <span className="flex items-center">
                                        {[...Array(4)].map((_, i) => (
                                            <svg
                                                key={i}
                                                fill="currentColor"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-5 h-5 text-amber-400"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5 text-amber-400"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span className="text-gray-500 ml-3 text-sm font-medium" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>4.0 (28 Customer Reviews)</span>
                                    </span>
                                </div>
                                <p className="leading-relaxed border-b border-gray-200 mb-6 pb-6 text-gray-700" style={{ color: mode === 'dark' ? '#d1d5db' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                                    {products.description}
                                </p>

                                <div className="flex items-center">
                                    <div>
                                        <span className="text-xs text-gray-400 block uppercase">Price</span>
                                        <span className="title-font font-extrabold text-3xl text-pink-600">
                                            ₹{products.price}
                                        </span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <button 
                                            onClick={() => addCart(products)} 
                                            className="flex items-center gap-2 text-white bg-pink-600 border-0 py-3 px-6 sm:px-8 focus:outline-none hover:bg-pink-700 rounded-xl font-bold shadow-md shadow-pink-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                        >
                                            Add To Cart
                                        </button>
                                        <button
                                            type="button"
                                            onClick={toggleWishlist}
                                            className={`rounded-xl w-12 h-12 p-0 border inline-flex items-center justify-center ml-3 transition-all duration-300 shadow-sm ${
                                                isWishlisted ? 'bg-red-50 text-red-500 border-red-200' : 'bg-gray-100 text-gray-500 border-gray-200 hover:text-red-500 hover:bg-red-50'
                                            }`}
                                            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                        >
                                            <svg
                                                fill={isWishlisted ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-6 h-6"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>
            </section>

        </Layout>
    )
}

export default ProductInfo