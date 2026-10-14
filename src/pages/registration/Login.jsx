import { Link, useNavigate } from 'react-router-dom'
import MyContext from '../../context/data/MyContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firedb } from '../../firebase/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const context = useContext(MyContext);
    const { loading, setLoading, loadUserCartAndWishlist } = context;

    const navigate = useNavigate();

    const login = async () => {
        if (email === '' || password === '') {
            return toast.error("All fields are required")
        }
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            try {
                const q = query(collection(firedb, "users"), where("uid", "==", result.user.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data?.name) {
                        result.user.displayName = data.name;
                    }
                });
            } catch (err) {
                console.log("Error fetching user name:", err);
            }
            localStorage.setItem('user', JSON.stringify(result));
            if (loadUserCartAndWishlist) {
                await loadUserCartAndWishlist();
            }
            toast.success("Login Successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            // window.location.href='/'
            navigate('/')
            setLoading(false);
        } catch (error) {
            toast.error('Sigin Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
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
                    <h1 className='text-white text-xl font-bold mt-2'>Welcome Back</h1>
                    <p className='text-xs text-gray-400 mt-1'>Please sign in to your account</p>
                </div>
                <div className="space-y-4">
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
                            onClick={login}
                            className='bg-pink-600 hover:bg-pink-700 w-full text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm'>
                            Login
                        </button>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className='text-sm text-gray-400'>
                        Don't have an account? <Link className='text-pink-500 hover:underline font-bold ml-1' to={'/signup'}>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login