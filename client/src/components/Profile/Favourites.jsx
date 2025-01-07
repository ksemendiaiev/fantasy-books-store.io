import React, { useEffect, useState } from 'react';
import api from '../../api';
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
    const [FavouriteBooks, setFavouriteBooks] = useState([]);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.get(
                    "/get-favourite-books",
                    { headers }
                );
                setFavouriteBooks(response.data.data);
            } catch (e) {
                console.log("Fetching favourite data error:", e);
            }
        };
        fetch();
    }, []);

    return (
        <div className="bg-zinc-900 px-4 sm:px-8 py-4 min-h-screen">
            {/* Если список избранного пуст */}
            {FavouriteBooks && FavouriteBooks.length === 0 && (
                <div className="text-2xl sm:text-3xl font-semibold text-zinc-500 flex flex-col items-center justify-center min-h-[50vh]">
                    No Favourite Books
                    <img
                        src="./star.png"
                        alt="star"
                        className="h-[5vh] my-4 sm:my-8"
                    />
                </div>
            )}
            {/* Сетка избранных книг */}
            {FavouriteBooks && FavouriteBooks.length > 0 && (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
                    style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
                >
                    {FavouriteBooks.map((items, i) => (
                        <div key={i}>
                            <BookCard data={items} favourite={true} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourites;
