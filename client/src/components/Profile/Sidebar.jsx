import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Sidebar = ({ data }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector((state) => state.auth.role);

    // Функция для переключения роли
    const toggleRole = async () => {
        const headers = {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            id: localStorage.getItem("id"),
        };

        try {
            const response = await axios.put(
                "http://localhost:1000/api/v1/toggle-role",
                {},
                { headers }
            );

            alert(response.data.message);
            const newRole = response.data.newRole;

            // Обновляем роль в Redux
            dispatch(authActions.changeRole(newRole));
        } catch (error) {
            console.error("Error toggling role:", error);
            alert("Failed to toggle role");
        }
    };

    return (
        <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-full">
            {/* Вверху информация о пользователе */}
            <div className="flex items-center flex-col justify-center">
                <img src={data.avatar} alt="/" className="h-[13vh]" />
                <p className="mt-3 text-xl text-zinc-100 font-semibold">{data.username}</p>
                <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
                <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
            </div>

            {/* Ссылки в Sidebar */}
            {role === "user" && (
                <div className="w-full flex-col items-center justify-center hidden lg:flex">
                    <Link
                        to="/profile"
                        className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"
                    >
                        Favourites
                    </Link>
                    <Link
                        to="/profile/orderHistory"
                        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
                    >
                        Order History
                    </Link>
                    <Link
                        to="/profile/settings"
                        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
                    >
                        Settings
                    </Link>
                </div>
            )}
            {role === "admin" && (
                <div className="w-full flex-col items-center justify-center hidden lg:flex">
                    <Link
                        to="/profile"
                        className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all"
                    >
                        All Orders
                    </Link>
                    <Link
                        to="/profile/add-book"
                        className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
                    >
                        Add Book
                    </Link>
                </div>
            )}

            {/* Кнопки внизу */}
            <div className="mt-auto w-full">
                <button
                    className="bg-blue-500 w-full text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300 mb-2"
                    onClick={toggleRole}
                >
                    {role === "admin" ? "Switch to User" : "Switch to Admin"}
                </button>
                <button
                    className="bg-zinc-900 w-full text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
                    onClick={() => {
                        dispatch(authActions.logout());
                        dispatch(authActions.changeRole("user"));
                        localStorage.clear("id");
                        localStorage.clear("token");
                        localStorage.clear("role");
                        history("/");
                    }}
                >
                    Log Out <FaArrowRightFromBracket className="ms-4" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
