import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import { Link } from 'react-router-dom'
import MyContext from '../../context/data/MyContext'

function NoPage() {
    const context = useContext(MyContext)
    const mode = context?.mode || 'light'

    return (
        <Layout>
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16" style={{ backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb' }}>
                <div className="w-24 h-24 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-6">
                    <span className="text-4xl font-extrabold">404</span>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                    Page Not Found
                </h1>
                <p className="text-gray-500 max-w-sm mb-8 text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '' }}>
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/">
                    <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                        Back to Home
                    </button>
                </Link>
            </div>
        </Layout>
    )
}

export default NoPage;