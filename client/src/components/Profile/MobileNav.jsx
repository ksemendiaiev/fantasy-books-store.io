import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false); // Скрываем меню после клика
    };

    return (
        <div className="relative">
            {/* Кнопка гамбургера */}
            <button
                onClick={toggleMenu}
                className="lg:hidden text-zinc-100 font-bold text-xl"
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* Навигационное меню */}
            <div
                className={`${
                    isOpen ? "block" : "hidden"
                } bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center transition-all duration-300`}
            >
                <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="block text-white text-xl mb-4 hover:text-blue-500 transition"
                >
                    Home
                </Link>
                <Link
                    to="/all-books"
                    onClick={handleLinkClick}
                    className="block text-white text-xl mb-4 hover:text-blue-500 transition"
                >
                    All Books
                </Link>
                {role === "admin" && (
                    <Link
                        to="/admin-profile"
                        onClick={handleLinkClick}
                        className="block text-white text-xl mb-4 hover:text-blue-500 transition"
                    >
                        Admin Profile
                    </Link>
                )}
                <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="block bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4 hover:bg-blue-600 transition"
                >
                    Log in
                </Link>
                <Link
                    to="/sign-up"
                    onClick={handleLinkClick}
                    className="block bg-white text-blue-500 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default MobileNav;
