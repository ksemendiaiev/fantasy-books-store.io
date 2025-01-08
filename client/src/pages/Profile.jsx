import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
import api from "../api";
import { jwtDecode } from "jwt-decode"; // Исправлено на default import

const Profile = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [Profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenValidity = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decodedToken = jwtDecode(token); // Декодируем токен
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decodedToken.exp < currentTime) {
                        // Если токен истёк
                        localStorage.removeItem("token"); // Удаляем только токен
                        alert("Your session has expired. Please log in again.");
                        navigate("/login");
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    localStorage.removeItem("token"); // Удаляем только токен
                    alert("Invalid token. Please log in again.");
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }
        };

        const fetchProfile = async () => {
            try {
                const headers = {
                    id: localStorage.getItem("id"),
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const response = await api.get("/get-user-information", { headers });
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching user information:", error);
                alert("Unable to fetch profile data. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        checkTokenValidity();
        fetchProfile();
    }, [isLoggedIn, navigate]);

    return (
        <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
            {!Profile && (
                <div className="w-full h-[100%] flex items-center justify-center">
                    <Loader />
                </div>
            )}
            {Profile && (
                <>
                    {/* Sidebar для десктопа и мобильного меню */}
                    <div className="w-full md:w-1/6 h-auto lg:h-screen">
                        <Sidebar data={Profile} />
                        <MobileNav />
                    </div>
                    {/* Контент */}
                    <div className="w-full md:w-5/6">
                        <Outlet />
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
