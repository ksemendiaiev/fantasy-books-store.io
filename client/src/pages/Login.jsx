import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
    const [Values, setValues] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...Values, [name]: value });
    };

    const submit = async () => {
        try {
            if (Values.username === "" || Values.password === "") {
                alert("All fields are required!");
            } else {
                const response = await api.post("/sign-in", Values);

                // Store token and user ID in localStorage
                const { token, id } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("id", id);

                //alert("Logged in successfully!");
                navigate("/profile"); // Redirect to profile after login
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    const handleSocialLogin = (provider) => {
        alert(`We are working on ${provider} login functionality!`);
    };

    return (
        <div className="bg-zinc-900 px-12 py-8 flex items-center justify-center h-screen">
            <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
                <p className="text-zinc-200 text-xl">Log in</p>
                <div className="mt-4">
                    <div>
                        <label htmlFor="" className="text-zinc-400">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="username"
                            name="username"
                            value={Values.username}
                            onChange={change}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="" className="text-zinc-400">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="password"
                            name="password"
                            value={Values.password}
                            onChange={change}
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:text-blue-600 transition-all duration-300"
                            onClick={submit}
                        >
                            Log In
                        </button>
                    </div>
                    <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
                        Or
                    </p>
                    {/* Social Login Buttons */}
                    <div className="mt-4 flex flex-col space-y-3">
                        <button
                            className="w-full bg-black text-white font-semibold py-3 rounded-full flex items-center justify-center space-x-3 hover:bg-zinc-700 transition-all duration-300"
                            onClick={() => handleSocialLogin("Google")}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                                alt="Google"
                                className="h-5 w-5"
                            />
                            <span>Continue with Google</span>
                        </button>
                        <button
                            className="w-full bg-black text-white font-semibold py-3 rounded-full flex items-center justify-center space-x-3 hover:bg-zinc-700 transition-all duration-300"
                            onClick={() => handleSocialLogin("Apple")}
                        >
                            <img
                                src="https://www.nicepng.com/png/full/945-9459181_apple-logo-wonderful-picture-images-ios-white-logo.png"
                                alt="Apple"
                                className="h-5 w-5"
                            />
                            <span>Continue with Apple</span>
                        </button>
                    </div>
                    <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
                        Don't have an account?&nbsp;
                        <Link to="/signUp" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
