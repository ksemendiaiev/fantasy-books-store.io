import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FaGripLines} from "react-icons/fa";

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "About Us",
            link: "/about-us"
        },
        {
            title: "All Books",
            link: "/all-books"
        },
        {
            title: "Cart",
            link: "/cart"
        },
        {
            title: "Profile",
            link: "/profile"
        }
    ];
    const [MobileNav, setMobileNav] = useState("hidden")
    return (
        <>
            <nav className=" z-50 relative bg-zinc-800 text-white px-8 py-4 flex justify-between items-center">
                <Link to={"/"}>
                    <h1 className="text-2xl font-semibold">BookDream</h1>
                </Link>
                <div className="nav-links-bookdream block md:flex items-center gap-4 cursor-pointer">
                    <div className="hidden md:flex gap-4">
                        {links.map((items, i) => (
                            <Link
                                to={items.link}
                                className="hover:text-blue-500 transition-all duration-300"
                                key={i}>
                                {items.title}{" "}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden md:flex gap-4">
                        <Link to={"/login"}
                              className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                            Log in
                        </Link>
                        <Link to={"/signup"}
                              className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                            Sign Up
                        </Link>
                    </div>
                    <button
                        className="block md:hidden text-white text-2xl hover:text-zinc-400"
                        onClick={() =>
                        MobileNav === "hidden"
                            ? setMobileNav( "block")
                            : setMobileNav("hidden")}
                    >
                        <FaGripLines/>
                    </button>
                </div>

            </nav>
            <div
                className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
            >
                {links.map((items, i) => (
                    <Link
                        to={items.link}
                        className={`${MobileNav} text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`}
                        key={i}
                        onClick={() =>
                            MobileNav === "hidden" ?
                                setMobileNav( "block") :
                                setMobileNav("hidden")}
                    >
                        {items.title} {" "}
                    </Link>
                ))}
                <Link to={"/login"}
                      className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>
                    Log in
                </Link>
                <Link to={"/signup"}
                      className={`${MobileNav} px-8 mb-8 text-4xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>
                    Sign Up
                </Link>
            </div>

        </>
    );
};

export default Navbar;