import React, { useContext } from 'react'
import { FaUserTie } from 'react-icons/fa';
import MyContext from '../../../context/data/MyContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';

function Dashboard() {
    const context = useContext(MyContext)
    const { mode, product, order, user } = context
    return (
        <Layout>
            <section className="text-gray-600 body-font mt-6 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="flex flex-wrap -m-4 text-center justify-center">
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border border-gray-200 hover:border-pink-500 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-6 py-6 rounded-2xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                                <div className="text-pink-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={40} />
                                </div>
                                <h2 className="title-font font-extrabold text-3xl text-gray-900 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    {product ? product.length : 0}
                                </h2>
                                <p className="text-pink-600 font-bold text-sm tracking-wide uppercase">Total Products</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border border-gray-200 hover:border-pink-500 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-6 py-6 rounded-2xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                                <div className="text-pink-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={40} />
                                </div>
                                <h2 className="title-font font-extrabold text-3xl text-gray-900 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    {order ? order.length : 0}
                                </h2>
                                <p className="text-pink-600 font-bold text-sm tracking-wide uppercase">Total Orders</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border border-gray-200 hover:border-pink-500 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-6 py-6 rounded-2xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                                <div className="text-pink-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={40} />
                                </div>
                                <h2 className="title-font font-extrabold text-3xl text-gray-900 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    {user ? user.length : 0}
                                </h2>
                                <p className="text-pink-600 font-bold text-sm tracking-wide uppercase">Total Users</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DashboardTab />
            </section>
        </Layout>
    )
}

export default Dashboard