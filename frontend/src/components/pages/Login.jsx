import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiShow } from "react-icons/bi";
import validator from "validator";
import RingLoader from "react-spinners/RingLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const override = {
    display: "flex",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.2)",
    margin: "0 auto",
    borderColor: "red",
    width: "100vw",
    height: "100vh",
    zIndex: "50",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleSubmit = () => {
    setLoading(true);
    fetch("http://localhost:5000/loginUser", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((apiRes) => apiRes.json())
      .then((finalRes) => {
        setLoading(false);
        if (Object.keys(finalRes).length === 0) {
          toast.error("Invalid Credentials", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        else navigate("/welcome");
      });
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center w-[100vw] h-[100vh]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={loading === true ? override : {}}>
        <RingLoader color="#0B2447" size={200} margin={15} loading={loading} />
      </div>
      <div className="w-10/12 lg:w-2/5 h-4/6 flex-col justify-center items-center bg-white shadow-2xl rounded-md py-12 px-3">
        {/* Already have account component */}
        <Link to="/register">
          <div className="w-fit mx-auto cursor-pointer">
            <div className="p-4 mb-2 bg-[#0B2447] w-fit rounded-full mx-auto">
              <BiUser className="text-5xl text-white" />
            </div>
            <p className="text-center text-xl text-[#0B2447] font-poppins font-bold">
              Create a new account!
            </p>
          </div>
        </Link>

        {/* Input fields */}
        <div className="w-10/12 mt-5 mx-auto">
          <input
            className={`w-full border-2 border-white mt-4 mb-3 py-2 px-4 rounded-md text-lg text-gray-600 bg-gray-100 focus:outline-none`}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />{" "}
          <br />
          <div className="relative">
            <input
              className={`w-full py-2 px-4 rounded-md text-lg text-gray-600 bg-gray-100 focus:outline-none`}
              type={showPassword === true ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <BiShow
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-600 hover:cursor-pointer"
            />
          </div>
          <div className="flex flex-wrap justify-between text-[#0B2447] font-bold my-5">
            <div className="my-[2px]">
              <input
                className="mr-2 h-[17px] w-[17px] relative top-1"
                type="checkbox"
                name="remember"
                id="remember"
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <div className="my-[2px]">
              <button className="bg-white">Forgot Password</button>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="mx-auto w-10/12 mt-10">
          <button
            onClick={handleSubmit}
            className={`w-full h-14 text-white text-xl font-bold rounded-md ${
              validator.isEmail(email) && validator.isStrongPassword(password)
                ? "bg-[#0B2447]"
                : "bg-[#0b2447ae] pointer-events-none"
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

//C07ABE
