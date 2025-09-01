import  { useContext, useState } from "react";
import API from "../lib/api.js";
import { AuthContext } from "../context/AuthContext";
import { Link,useNavigate } from "react-router-dom";

export default function SignUp() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [stage, setStage] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOtp = async () => {
    try {
      setError(null);
      if (!email) return setError("Email required");
      setLoading(true);
      console.log("kya dikka thai ji")
      await API.post("/auth/send-otp", { email, name });
      console.log("sahi mai kya")
      setStage("otp");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally { setLoading(false); }
  };

  const verify = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await API.post("/auth/verify-otp", { email, otp, name });
      const { token, user } = res.data;
      setAuth(user, token);
      
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "OTP verify failed");
    } finally { setLoading(false); }
  };


  return (
    <div className="h-[100vh] flex items-center justify-center bg-gray-50">
      <div className="flex w-full h-full  bg-white shadow-lg rounded-2xl overflow-hidden">

        <div className="hidden md:flex absolute top-3 left-3 items-center mb-6">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z" fill="#367AFF" />
            <path d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z" fill="#367AFF" />
            <path d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z" fill="#367AFF" />
            <path d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z" fill="#367AFF" />
            <path d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z" fill="#367AFF" />
            <path d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z" fill="#367AFF" />
          </svg>
          <span className="h-9 w-9 flex items-center justify-center  text-black rounded-full font-bold">
            HD
          </span>
        </div>
        
        <div className=" w-[90vw] mx-10 flex h-full flex-col md:w-1/2 pb-10 md:p-10 justify-center">
        
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

          
          <h2 className="text-3xl w-full text-center md:text-start font-bold text-gray-800 mb-2">Sign up</h2>
          <p className="text-sm w-full text-center md:text-start text-gray-500 mb-6">
            Sign up now to enjoy the features of HD
          </p>


          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
          />

          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />

          {stage == "otp" &&
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter OTP"
            />
          }

          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}

          {stage === "form" ? (
            <button
              onClick={sendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Sending..." : "Get OTP"}
            </button>
          ) : <button
            onClick={verify}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Verifying..." : "Sign up"}
          </button>}

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>



        </div>
        <div className="hidden md:block m-1">
          <img
            src="/image.png.jpg"
            alt="Wallpaper"
            className="h-full rounded-2xl w-full object-cover"
          />
        </div>
      </div>
    </div>
  );

}
