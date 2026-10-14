import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext'
import Loader from '../../components/loader/Loader'
import { Link } from 'react-router-dom'

function Order() {
  const user = JSON.parse(localStorage.getItem('user'))
  const userid = user?.user?.uid
  const context = useContext(MyContext);
  const { mode, loading, order } = context;

  const userOrders = userid ? order.filter(obj => obj.userid === userid) : [];

  return (
    <Layout>
      {loading && <Loader />}
      <div className="min-h-[75vh] py-10 px-4 md:px-8" style={{ backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb' }}>
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold title-font text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
            My Orders
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded mt-2"></div>
        </div>

        {userOrders.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {userOrders.map((orderData, orderIndex) => {
              const orderTotal = (orderData.cartItem || []).reduce((acc, item) => acc + (parseInt(item.price) || 0), 0);
              return (
                <div 
                  key={orderData.id || orderData.paymentId || orderIndex}
                  className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}
                >
                  {/* Order Card Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4" style={{ backgroundColor: mode === 'dark' ? 'rgb(40 42 46)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Order Placed</p>
                      <p className="text-sm font-medium text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {orderData.date || 'Recent'}
                      </p>
                    </div>

                    {orderData.paymentId && (
                      <div className="space-y-1 hidden sm:block">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Payment ID</p>
                        <p className="text-xs font-mono text-gray-600 truncate max-w-[160px]" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                          {orderData.paymentId}
                        </p>
                      </div>
                    )}

                    {orderData.addressInfo?.name && (
                      <div className="space-y-1 hidden md:block">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Ship To</p>
                        <p className="text-sm font-medium text-gray-800" style={{ color: mode === 'dark' ? 'white' : '' }}>
                          {orderData.addressInfo.name}
                        </p>
                      </div>
                    )}

                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        ● Order Confirmed
                      </span>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="p-6 divide-y divide-gray-100" style={{ borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                    {(orderData.cartItem || []).map((item, itemIndex) => (
                      <div key={item.id || itemIndex} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-24 h-24 object-cover rounded-xl border border-gray-100 flex-shrink-0"
                          style={{ borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}
                        />
                        <div className="flex-1 text-center sm:text-left space-y-1">
                          <h3 className="font-bold text-gray-900 text-base" style={{ color: mode === 'dark' ? 'white' : '' }}>
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-gray-500 line-clamp-2" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                              {item.description}
                            </p>
                          )}
                          <p className="text-sm font-extrabold text-pink-600 pt-1">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Card Footer */}
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(40 42 46)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                    <span className="text-gray-500" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                      Total ({orderData.cartItem?.length || 0} item{(orderData.cartItem?.length || 0) > 1 ? 's' : ''})
                    </span>
                    <span className="font-extrabold text-lg text-pink-600">
                      ₹{orderTotal}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-6" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
            <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-4 text-pink-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
              No Orders Yet
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
              You haven't placed any orders with us yet. Discover our top collections now!
            </p>
            <Link to="/allproducts">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all duration-200">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Order