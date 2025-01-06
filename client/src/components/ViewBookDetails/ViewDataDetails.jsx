import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import Loader from "../Loader/Loader";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import api from '../../api';

const ViewDataDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.get(
                    `/get-book-by-id/${id}`
                );
                setData(response.data.data); // Устанавливаем данные книги
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
        const response = await api.put(
            "/add-book-to-favourite", {}, { headers }
        );
        alert(response.data.message);
    };

    const handleCart = async () => {
        const response = await api.put("/add-to-cart", {}, { headers });
        alert(response.data.message);
    };

    const deleteBook = async () => {
        const response = await api.delete(
            "/delete-book",
            { headers }
        );
        alert(response.data.message);
        navigate("/all-books");
    };

    return (
        <>
            {Data ? (
                <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/6">
                        <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded">
                            <img
                                src={Data.url}
                                alt={Data.title}
                                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
                            />
                            {isLoggedIn && role === "user" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
                                    <button className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-700 flex items-center justify-center"
                                        onClick={handleFavourite}
                                    >
                                        <FaHeart />
                                        <span className="ms-4 block lg:hidden">Favourites</span>
                                    </button>
                                    <button
                                        className="text-white rounded mt-8 md:mt-0 lg:rounded-full text-4xl lg:text-3xl p-3 bg-blue-500 lg:mt-8 flex items-center justify-center"
                                        onClick={handleCart}
                                    >
                                        <FaShoppingCart />
                                        <span className="ms-4 block lg:hidden">Add to cart</span>
                                    </button>
                                </div>
                            )}
                            {isLoggedIn && role === "admin" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
                                    <Link to={`/updateBook/${id}`} className="bg-white rounded lg:rounded-full text-3xl p-3 flex items-center justify-center">
                                        <FaEdit />
                                        <span className="ms-4 block lg:hidden">Edit</span>
                                    </Link>
                                    <button
                                        className="text-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-8 md:mt-0 bg-white flex items-center justify-center"
                                        onClick={deleteBook}>
                                        <MdOutlineDelete />
                                        <span className="ms-4 block lg:hidden">Delete book</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/6">
                        <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
                        <p className="text-zinc-400 mt-1">by {Data.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">{Data.description}</p>
                        <p className="flex mt-4 items-center justify-start text-zinc-400">
                            <GrLanguage className="me-3" /> {Data.language}
                        </p>
                        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                            Price: {Data.price}
                        </p>
                        <p className="mt-4 text-zinc-400 text-lg italic">
                            Added by: {Data.owner?.username || "Unknown"}
                        </p>
                        <button
                            className="mt-4 bg-green-500 text-white rounded px-4 py-2 text-xl font-semibold"
                            onClick={handleRequestMeeting}
                        >
                            Request Meeting
                        </button>
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
