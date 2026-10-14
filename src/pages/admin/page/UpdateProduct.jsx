import React, { useContext } from 'react'
import MyContext from '../../../context/data/MyContext';

function UpdateProduct() {

    const context = useContext(MyContext);
    const { products, setProducts, updateProduct } = context;

    return (
        <div className='flex justify-center items-center min-h-screen px-4 py-8 bg-gray-900'>
            <div className='bg-gray-800 px-6 sm:px-8 py-6 sm:py-8 rounded-3xl shadow-2xl border border-gray-700 w-full max-w-md'>
                <div className="text-center mb-6">
                    <h1 className='text-white text-2xl font-bold'>Update Product</h1>
                    <p className='text-xs text-gray-400 mt-1'>Modify details for this catalog item</p>
                </div>
                <div className="space-y-3">
                    <div>
                        <input type="text"
                            value={products.title}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name='title'
                            className='bg-gray-700 border border-gray-600 px-4 py-2.5 w-full rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={products.price}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='price'
                            className='bg-gray-700 border border-gray-600 px-4 py-2.5 w-full rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm'
                            placeholder='Product price (₹)'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={products.imageUrl}
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            name='imageurl'
                            className='bg-gray-700 border border-gray-600 px-4 py-2.5 w-full rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={products.category}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='category'
                            className='bg-gray-700 border border-gray-600 px-4 py-2.5 w-full rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                        <textarea cols="30" rows="3" name='description'
                            value={products.description}
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className='bg-gray-700 border border-gray-600 px-4 py-2.5 w-full rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm resize-none'
                            placeholder='Product Description'>
                        </textarea>
                    </div>
                    <div className='pt-2'>
                        <button
                            onClick={() => updateProduct(products)}
                            className='bg-pink-600 hover:bg-pink-700 w-full text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm'>
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct