import React, { useContext } from 'react'
import myContext from '../../context/data/MyContext'

function Testimonial() {
    const context = useContext(myContext)
    const { mode } = context

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Fashion Enthusiast, Delhi",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
            comment: "ShopKartz has completely transformed my online shopping experience! The fabric quality of the apparel exceeded my expectations and delivery was super prompt."
        },
        {
            name: "Rahul Verma",
            role: "Software Engineer, Bangalore",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
            comment: "The checkout process was fast and effortless. Plus, getting free shipping on orders above ₹300 is a fantastic bonus. The product matched the description 100%!"
        },
        {
            name: "Ananya Patel",
            role: "Interior Designer, Mumbai",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
            comment: "Exceptional service and timely updates at every step of delivery. The wishlist feature makes it so convenient to save items for seasonal sales. Highly recommended!"
        }
    ];

    return (
        <section className="text-gray-600 body-font mb-12">
            <div className="container px-5 py-10 mx-auto">
                <div className="text-center mb-12">
                    <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight' style={{ color: mode === 'dark' ? 'white' : '' }}>Customer Testimonials</h1>
                    <div className="h-1 w-20 bg-pink-600 rounded mx-auto mt-2 mb-3"></div>
                    <h2 className='text-xl font-medium' style={{ color: mode === 'dark' ? '#9ca3af' : '#4b5563' }}>What our happy <span className='text-pink-600 font-bold'>shoppers</span> say</h2>
                </div>
                <div className="flex flex-wrap -m-4">
                    {testimonials.map((item, index) => (
                        <div key={index} className="lg:w-1/3 md:w-1/2 p-4 w-full">
                            <div 
                                className="h-full bg-white border border-gray-100 p-8 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}
                            >
                                <div>
                                    <div className="flex text-amber-400 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p style={{ color: mode === 'dark' ? '#d1d5db' : '' }} className="leading-relaxed text-gray-600 mb-6 italic">
                                        "{item.comment}"
                                    </p>
                                </div>
                                <div className="flex items-center pt-4 border-t border-gray-100" style={{ borderColor: mode === 'dark' ? 'rgb(55 65 81)' : '' }}>
                                    <img alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-pink-500 shadow-sm" src={item.avatar} />
                                    <div className="pl-4">
                                        <h3 style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-900 font-bold text-base">{item.name}</h3>
                                        <p style={{ color: mode === 'dark' ? '#9ca3af' : '' }} className="text-xs text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonial