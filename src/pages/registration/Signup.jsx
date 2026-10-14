import { Link } from 'react-router-dom'
import MyContext from '../../context/data/MyContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, firedb } from '../../firebase/FirebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const context = useContext(MyContext);
    const { loading, setLoading } = context;

    const signup = async () => {
        setLoading(true);
        if (name === '' || email === '' || password === '') {
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            try {
                await updateProfile(users.user, { displayName: name });
            } catch (profileErr) {
                console.log("Could not set displayName in auth profile:", profileErr);
            }

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            }

            const userRef = collection(firedb, "users");
            await addDoc(userRef, user);
            toast.success("Signup Successfully")
            setName('');
            setEmail('');
            setPassword('');
            setLoading(false);

        } catch (error) {
            // console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen px-4 py-8 bg-gray-900'>
            {loading && <Loader />}
            <div className='bg-gray-800 px-6 sm:px-8 py-8 sm:py-10 rounded-3xl shadow-2xl border border-gray-700 w-full max-w-md'>
                <div className="text-center mb-6">
                    <Link to={'/'} className="inline-block">
                        <h2 className="text-2xl font-extrabold text-pink-500 tracking-tight">ShopKartz</h2>
                    </Link>
                    <h1 className='text-white text-xl font-bold mt-2'>Create an Account</h1>
                    <p className='text-xs text-gray-400 mt-1'>Join ShopKartz for exclusive offers & faster checkout</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1">Full Name</label>
                        <input 
                            type="text"
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='bg-gray-700 border border-gray-600 px-4 py-3 w-full rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm'
                            placeholder='John Doe'
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1">Email Address</label>
                        <input 
                            type="email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='bg-gray-700 border border-gray-600 px-4 py-3 w-full rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm'
                            placeholder='name@example.com'
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='bg-gray-700 border border-gray-600 px-4 py-3 pr-11 w-full rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm'
                                placeholder='••••••••'
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className='pt-2'>
                        <button
                            onClick={() => signup()}
                            className='bg-pink-600 hover:bg-pink-700 w-full text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm'>
                            Create Account
                        </button>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className='text-sm text-gray-400'>
                        Already have an account? <Link className='text-pink-500 hover:underline font-bold ml-1' to={'/login'}>Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup