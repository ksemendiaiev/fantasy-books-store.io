import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import Loader from "../Loader/Loader";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import api from "../../api";
import RecentlyAdded from "../Home/RecentlyAdded";

const ViewDataDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const currentUserId = localStorage.getItem("id");

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.get(`/get-book-by-id/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetch();
    }, [id]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleRequestMeeting = () => {
        alert("Meeting request sent! (Prototype functionality)");
    };

    const handleFavourite = async () => {
        const response = await api.put("/add-book-to-favourite", {}, { headers });
        alert(response.data.message);
    };

    const handleCart = async () => {
        const response = await api.put("/add-to-cart", {}, { headers });
        alert(response.data.message);
    };

    const deleteBook = async () => {
        const response = await api.delete("/delete-book", { headers });
        alert(response.data.message);
        navigate("/all-books");
    };

    return (
        <>
            {Data ? (
                <div className="px-4 md:px-12 py-8 bg-zinc-900">
                    {/* Описание книги */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-3/6">
                            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-4 md:p-8 rounded">
                                <img
                                    src={Data.url}
                                    alt={Data.title}
                                    className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] w-auto mx-auto rounded"
                                />
                                {isLoggedIn && role === "user" && (
                                    <div className="flex flex-row md:flex-row lg:flex-col items-center justify-center mt-4 lg:mt-0 gap-4">
                                        <button
                                            className="bg-white rounded-full text-2xl p-3 text-red-700 flex items-center justify-center"
                                            onClick={handleFavourite}
                                        >
                                            <FaHeart />
                                        </button>
                                        <button
                                            className="text-white rounded-full text-2xl p-3 bg-blue-500 flex items-center justify-center"
                                            onClick={handleCart}
                                        >
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                )}
                                {isLoggedIn &&
                                    role === "admin" &&
                                    Data.owner?._id &&
                                    currentUserId &&
                                    String(Data.owner._id) === String(currentUserId) && (
                                        <div className="flex flex-row md:flex-row lg:flex-col items-center justify-center mt-4 lg:mt-0 gap-4">
                                            <Link
                                                to={`/updateBook/${id}`}
                                                className="bg-white rounded-full text-2xl p-3 flex items-center justify-center"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                className="text-red-500 rounded-full text-2xl p-3 bg-white flex items-center justify-center"
                                                onClick={deleteBook}
                                            >
                                                <MdOutlineDelete />
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="p-4 w-full lg:w-3/6">
                            <h1 className="text-3xl sm:text-4xl text-zinc-300 font-semibold text-center lg:text-left">
                                {Data.title}
                            </h1>
                            <p className="text-zinc-400 mt-2 text-center lg:text-left">by {Data.author}</p>
                            <p className="text-zinc-500 mt-4 text-md sm:text-lg">{Data.description}</p>
                            <p className="flex mt-4 items-center justify-center lg:justify-start text-zinc-400">
                                <GrLanguage className="me-3" /> {Data.language}
                            </p>
                            <p className="mt-4 text-zinc-100 text-2xl sm:text-3xl font-semibold text-center lg:text-left">
                                Price: {Data.price}
                            </p>
                            <p className="mt-4 text-zinc-400 text-lg italic text-center lg:text-left">
                                Added by: {Data.owner?.username || "Unknown"}
                            </p>
                            <button
                                className="mt-4 bg-green-500 text-white rounded px-4 py-2 text-md sm:text-xl font-semibold w-full sm:w-auto"
                                onClick={handleRequestMeeting}
                            >
                                Request Meeting
                            </button>
                        </div>
                    </div>

                    {/* Блок с недавно добавленными книгами */}
                    <div className="mt-12">
                        <hr className="border-t border-gray-700 my-8" />
                        <RecentlyAdded excludeBookId={id} />
                    </div>
                </div>
            ) : (
                <div className="h-screen bg-zinc-900 flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </>
    );
};

export default ViewDataDetails;
