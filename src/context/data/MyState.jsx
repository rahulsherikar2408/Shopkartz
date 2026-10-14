import React, { useEffect, useRef, useState } from 'react'
import MyContext from './MyContext';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { firedb } from '../../firebase/FirebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../redux/cartSlice';
import { setWishlist } from '../../redux/wishlistSlice';

function MyState(props) {

    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17,24,39)'
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white'

        }
    }

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProduct = async () => {
        if (products.title === null || products.price === null || products.imageUrl === null || products.category === null || products.description === null) {
            return toast.error('All fields are required');
        }

        setLoading(true);
        try {

            const productRef = collection(firedb, 'products');
            await addDoc(productRef, products);
            toast.success('Product added successfully');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800)
            getProductData();
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const [product, setProduct] = useState([]);

    const getProductData = async () => {

        setLoading(true);

        // try {
        //     const productRef = collection(firedb,'product');
        //     const data = await productRef.get();
        //     setProduct(data.docs.map(doc => ({...doc.data(),id : doc.id})));
        //     setLoading(false);
        // } catch (error) {
        //     console.log(error);
        //     setLoading(false);
        // }

        try {

            const q = query(
                collection(firedb, 'products'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot => {
                let productArray = [];
                QuerySnapshot.forEach(doc => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
                setLoading(false);
            }));

            return () => data;

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    // update product function

    const edithandle = (item) => {
        setProducts(item);
    }

    const updateProduct = async () => {
        setLoading(true);
        try {

            await setDoc(doc(firedb, "products", products.id), products);
            toast.success('Product updated successfully');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // delete product

    const deleteProduct = async (item) => {
        setLoading(true);
        try {

            await deleteDoc(doc(firedb, 'products', item.id));
            toast.success('Product deleted successfully');
            getProductData();
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(firedb, 'orders'));
            const orderArray = [];
            result.forEach(doc => {
                orderArray.push(doc.data());
                setLoading(false);
            })
            setOrder(orderArray);
            console.log(orderArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }



    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(firedb, 'users'));
            const userArray = [];
            result.forEach(doc => {
                userArray.push(doc.data());
                setLoading(false);
            })
            setUser(userArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const wishlistItems = useSelector((state) => state.wishlist);

    const isCartLoaded = useRef(false);
    const isWishlistLoaded = useRef(false);

    const loadUserCartAndWishlist = async () => {
        try {
            const userData = localStorage.getItem('user');
            if (!userData) {
                isCartLoaded.current = true;
                isWishlistLoaded.current = true;
                return;
            }
            const parsedUser = JSON.parse(userData);
            const uid = parsedUser?.user?.uid;
            if (!uid) {
                isCartLoaded.current = true;
                isWishlistLoaded.current = true;
                return;
            }

            // Load Cart from Firestore
            const cartDocSnap = await getDoc(doc(firedb, 'carts', uid));
            if (cartDocSnap.exists()) {
                const data = cartDocSnap.data();
                if (data && Array.isArray(data.cartItems)) {
                    dispatch(setCart(data.cartItems));
                    localStorage.setItem('cart', JSON.stringify(data.cartItems));
                }
            } else {
                const localCart = JSON.parse(localStorage.getItem('cart')) || [];
                if (localCart.length > 0) {
                    await setDoc(doc(firedb, 'carts', uid), {
                        uid,
                        email: parsedUser?.user?.email || '',
                        cartItems: localCart,
                        updatedAt: new Date().toISOString()
                    });
                }
            }
            isCartLoaded.current = true;

            // Load Wishlist from Firestore
            const wishlistDocSnap = await getDoc(doc(firedb, 'wishlists', uid));
            if (wishlistDocSnap.exists()) {
                const data = wishlistDocSnap.data();
                if (data && Array.isArray(data.wishlistItems)) {
                    dispatch(setWishlist(data.wishlistItems));
                    localStorage.setItem('wishlist', JSON.stringify(data.wishlistItems));
                }
            } else {
                const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                if (localWishlist.length > 0) {
                    await setDoc(doc(firedb, 'wishlists', uid), {
                        uid,
                        email: parsedUser?.user?.email || '',
                        wishlistItems: localWishlist,
                        updatedAt: new Date().toISOString()
                    });
                }
            }
            isWishlistLoaded.current = true;
        } catch (error) {
            console.log('Error loading cart/wishlist from firestore:', error);
            isCartLoaded.current = true;
            isWishlistLoaded.current = true;
        }
    };

    useEffect(() => {
        getProductData();
        getOrderData();
        getUserData();
        loadUserCartAndWishlist();
    }, []);

    // Save Cart to Firestore whenever cartItems change
    useEffect(() => {
        if (!isCartLoaded.current) return;
        const userData = localStorage.getItem('user');
        if (userData) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
            const parsedUser = JSON.parse(userData);
            const uid = parsedUser?.user?.uid;
            if (uid) {
                setDoc(doc(firedb, 'carts', uid), {
                    uid,
                    email: parsedUser?.user?.email || '',
                    cartItems,
                    updatedAt: new Date().toISOString()
                }).catch(err => console.log('Error saving cart to firestore:', err));
            }
        }
    }, [cartItems]);

    // Save Wishlist to Firestore whenever wishlistItems change
    useEffect(() => {
        if (!isWishlistLoaded.current) return;
        const userData = localStorage.getItem('user');
        if (userData) {
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
            const parsedUser = JSON.parse(userData);
            const uid = parsedUser?.user?.uid;
            if (uid) {
                setDoc(doc(firedb, 'wishlists', uid), {
                    uid,
                    email: parsedUser?.user?.email || '',
                    wishlistItems,
                    updatedAt: new Date().toISOString()
                }).catch(err => console.log('Error saving wishlist to firestore:', err));
            }
        }
    }, [wishlistItems]);

    return (
        <MyContext.Provider value={{ mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct, order, user, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice, loadUserCartAndWishlist }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState