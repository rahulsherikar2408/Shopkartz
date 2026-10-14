import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function Modal({ name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="text-center rounded-xl text-white font-bold">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-full bg-pink-600 hover:bg-pink-700 py-3 text-center rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-all duration-200"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl p-6 text-left align-middle shadow-2xl transition-all bg-white border border-gray-100">
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                                        <h3 className="text-xl font-bold text-gray-900">Delivery Details</h3>
                                        <button 
                                            type="button" 
                                            onClick={closeModal}
                                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); buyNow(); closeModal(); }}>
                                        <div>
                                            <label htmlFor="name" className="block mb-1 text-sm font-semibold text-gray-700">Full Name</label>
                                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder="John Doe" className="border outline-none border-gray-300 text-gray-900 text-sm rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 block w-full p-2.5 bg-gray-50" required />
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block mb-1 text-sm font-semibold text-gray-700">Delivery Address</label>
                                            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" placeholder="123 Street Name, Area" className="border outline-none border-gray-300 text-gray-900 text-sm rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 block w-full p-2.5 bg-gray-50" required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label htmlFor="pincode" className="block mb-1 text-sm font-semibold text-gray-700">Pincode</label>
                                                <input value={pincode} onChange={(e) => setPincode(e.target.value)} type="text" name="pincode" id="pincode" placeholder="400001" className="border outline-none border-gray-300 text-gray-900 text-sm rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 block w-full p-2.5 bg-gray-50" required />
                                            </div>
                                            <div>
                                                <label htmlFor="mobileNumber" className="block mb-1 text-sm font-semibold text-gray-700">Mobile Number</label>
                                                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" name="mobileNumber" id="mobileNumber" placeholder="9876543210" className="border outline-none border-gray-300 text-gray-900 text-sm rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 block w-full p-2.5 bg-gray-50" required />
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <button 
                                                onClick={() => { buyNow(); closeModal(); }} 
                                                type="button" 
                                                className="w-full text-white bg-pink-600 hover:bg-pink-700 font-bold rounded-xl text-base px-5 py-3 shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                Confirm & Order Now
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}