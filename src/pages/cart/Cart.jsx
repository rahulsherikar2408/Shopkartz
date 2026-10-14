import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../context/data/MyContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, clearCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { firedb } from '../../firebase/FirebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


function Cart() {

  const context = useContext(MyContext)
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  // console.log(cardItem);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Product deleted from cart');
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItem));
  }, [cartItem])

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItem.map((item) => {
      temp = temp + parseInt(item.price);
    })
    setTotalAmount(temp);
  }, [cartItem])

  const shipping = (totalAmount > 300 || totalAmount === 0) ? 0 : 100;

  const grandTotal = totalAmount + shipping;

  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")


  const buyNow = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      return toast.error("Please login to place an order");
    }
    const parsedUser = JSON.parse(userData);

    // validation 
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }
    console.log(addressInfo);

    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "ShopKartz",
      description: "for testing purpose",
      handler: async function (response) {
        // console.log(response)
        toast.success('Payment Successful')
        const paymentId = response.razorpay_payment_id
        // store in firebase 
        const orderInfo = {
          cartItem,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: parsedUser?.user?.email,
          userid: parsedUser?.user?.uid,
          paymentId
        }

        try {
          const orderRef = collection(firedb, "orders");
          await addDoc(orderRef, orderInfo);
          dispatch(clearCart());
          localStorage.removeItem('cart');
          if (parsedUser?.user?.uid) {
            await setDoc(doc(firedb, 'carts', parsedUser.user.uid), {
              uid: parsedUser.user.uid,
              email: parsedUser.user.email || '',
              cartItems: [],
              updatedAt: new Date().toISOString()
            });
          }
        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }


    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
  }


  return (
    <Layout>
      <div className="min-h-[75vh] py-10 px-4 md:px-8 bg-gray-50" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold title-font">Shopping Cart</h1>
          <div className="h-1 w-20 bg-pink-600 rounded mt-2"></div>
        </div>

        {cartItem.length > 0 ? (
          <div className="mx-auto max-w-5xl justify-center md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3 space-y-4">
              {cartItem.map((item, index) => {
                const { title, price, imageUrl, description } = item;
                return (
                  <div key={index} className="rounded-2xl border drop-shadow-md bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:shadow-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : 'rgb(229 231 235)' }}>
                    <img src={imageUrl} alt={title} className="w-full sm:w-28 md:w-32 h-48 sm:h-28 md:h-32 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
                      <div className="space-y-1">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                        {description && (
                          <p className="text-xs text-gray-500 line-clamp-2 max-w-md" style={{ color: mode === 'dark' ? 'rgb(156 163 175)' : '' }}>{description}</p>
                        )}
                        <p className="text-base sm:text-lg font-semibold text-pink-600">₹{price}</p>
                      </div>
                      <div className="flex sm:justify-end self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => deleteCart(item)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-red-200"
                          title="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 md:mt-0 rounded-2xl border bg-white p-6 shadow-md md:w-1/3 h-fit" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : 'rgb(229 231 235)' }}>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ borderColor: mode === 'dark' ? 'rgb(55 65 81)' : 'rgb(229 231 235)' }}>Order Summary</h2>
              <div className="mb-3 flex justify-between">
                <p className="text-gray-600" style={{ color: mode === 'dark' ? 'rgb(209 213 219)' : '' }}>Subtotal</p>
                <p className="font-semibold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600" style={{ color: mode === 'dark' ? 'rgb(209 213 219)' : '' }}>Shipping</p>
                <p className={shipping === 0 && totalAmount > 0 ? "text-green-600 font-semibold" : "font-semibold text-gray-900"} style={{ color: shipping === 0 && totalAmount > 0 ? '' : (mode === 'dark' ? 'white' : '') }}>
                  {shipping === 0 && totalAmount > 0 ? "FREE" : `₹${shipping}`}
                </p>
              </div>
              {totalAmount > 0 && totalAmount <= 300 && (
                <p className="text-xs text-pink-600 mb-3 bg-pink-50 p-2 rounded-lg">
                  Add ₹{301 - totalAmount} more to qualify for Free Delivery!
                </p>
              )}
              <hr className="my-4" style={{ borderColor: mode === 'dark' ? 'rgb(55 65 81)' : 'rgb(229 231 235)' }} />
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
                <p className="text-xl font-bold text-pink-600">₹{grandTotal}</p>
              </div>
              <Modal
                name={name}
                address={address}
                pincode={pincode}
                phoneNumber={phoneNumber}
                setName={setName}
                setAddress={setAddress}
                setPincode={setPincode}
                setPhoneNumber={setPhoneNumber}
                buyNow={buyNow}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 text-pink-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>Your Cart is Empty</h2>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet.</p>
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

export default Cart