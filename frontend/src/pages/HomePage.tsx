// src/pages/HomePage.tsx
import  { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../lib/api';

// Google ka icon


export default function HomePage() {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogin = async (response: any) => {
        try {
            // Google se mile token ko backend par bhejo
            const res = await API.post("/auth/google-login", { idToken: response.credential });
            const { token, user } = res.data;
            setAuth(user, token); // User ko login karo
            navigate("/dashboard"); // Dashboard par redirect karo
        } catch (err) {
            console.error("Google Login Failed", err);
            alert("Google login failed. Please try again.");
        }
    };

    useEffect(() => {
        
        // @ts-ignore
        google.accounts.id.initialize({
            client_id: "334608535320-g2i7n6l0llr6e5004lla02vl3cmji7t2.apps.googleusercontent.com", 
            callback: handleGoogleLogin,
        });
        // @ts-ignore
        google.accounts.id.renderButton(
            document.getElementById("google-signin-btn"),
            { theme: "outline", size: "large", text: "continue_with", width: "300" }
        );
    }, []);

    return (

        <div className="flex h-[100vh] items-center justify-center bg-gray-50">
            <div className="flex w-full h-full  bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="hidden md:flex absolute top-3 left-3  items-center mb-6 self-start">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z" fill="#367AFF" />
                        <path d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z" fill="#367AFF" />
                        <path d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z" fill="#367AFF" />
                        <path d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z" fill="#367AFF" />
                        <path d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z" fill="#367AFF" />
                        <path d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z" fill="#367AFF" />
                    </svg>
                    <span className="h-9 w-9 flex items-center justify-center  text-black rounded-full font-bold">HD</span>
                </div>

                {}
                <div className="w-[90vw] h-full mx-10 md:w-1/2 pb-10 md:p-10 flex flex-col justify-center">

                    <div className="flex w-full text-center md:hidden  items-center mb-6 justify-center">
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z" fill="#367AFF" />
                            <path d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z" fill="#367AFF" />
                            <path d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z" fill="#367AFF" />
                            <path d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z" fill="#367AFF" />
                            <path d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z" fill="#367AFF" />
                            <path d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z" fill="#367AFF" />
                        </svg>
                        <span className="h-9 w-9 flex items-center justify-center  text-black rounded-full font-bold">HD</span>
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold w-full text-center md:text-start text-gray-800">Welcome!</h1>
                        <p className="my-2 w-full text-center  md:text-start text-gray-500">Choose an option to continue</p>
                    </div>

                    <div className="space-y-4">
                        <Link to="/login" className="block w-full text-center md:px-4 px-3 py-3 text-sm md:text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                            Login with Email
                        </Link>
                        <Link to="/signup" className="block w-full text-center md:px-4 px-3 py-3  text-sm md:text-base font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition">
                            Sign Up with Email
                        </Link>
                    </div>

                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">OR</span>
                        </div>
                    </div>
                    
                    <div id="google-signin-btn" className="flex justify-center"></div>


                </div>

                
                <div className="hidden md:block  m-1">
                    <img
                        src="/image.png.jpg" 
                        alt="Sign In background"
                        className="h-full w-full object-cover rounded-2xl"
                    />
                </div>
            </div>
        </div>


    );
}