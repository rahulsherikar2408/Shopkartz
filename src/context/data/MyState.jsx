import React, { useEffect, useState } from 'react'
import MyContext from './MyContext';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { firedb } from '../../firebase/FirebaseConfig';
import { use } from 'react';

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

    useEffect(() => {
        getProductData();
        getOrderData();
        getUserData();
    }, []);

    return (
        <MyContext.Provider value={{ mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct, order, user, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState