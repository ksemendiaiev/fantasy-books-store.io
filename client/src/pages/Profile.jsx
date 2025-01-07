import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
import api from "../api";

const Profile = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [Profile, setProfile] = useState(null);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.get("/get-user-information", { headers });
                setProfile(response.data);
            } catch (e) {
                console.error("Error fetching user information:", e);
            }
        };
        fetch();
    }, [isLoggedIn]);

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
