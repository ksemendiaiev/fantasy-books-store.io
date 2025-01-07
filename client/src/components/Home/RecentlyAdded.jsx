import React, { useEffect, useState, useRef } from 'react';
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
import api from '../../api';

const RecentlyAdded = ({ excludeBookId }) => {
    const [Data, setData] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.get("/get-all-books");

                // Исключаем текущую книгу, если передан excludeBookId
                const filteredData = excludeBookId
                    ? response.data.data.filter((book) => book._id !== excludeBookId)
                    : response.data.data;

                setData(filteredData);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetch();
    }, [excludeBookId]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -scrollRef.current.offsetWidth / 1.2, // Прокрутка на ширину ~1 карточки
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: scrollRef.current.offsetWidth / 1.2, // Прокрутка на ширину ~1 карточки
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative mt-8 px-4">
            <h4 className="text-3xl text-yellow-100 mb-4">Recently added books</h4>
            {!Data.length && (
                <div className="flex items-center justify-center my-8">
                    <Loader />
                </div>
            )}

            {/* Левая стрелка */}
            {Data.length > 2 && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full z-10 hover:bg-gray-700 transition-all duration-300"
                >
                    &#8592;
                </button>
            )}

            {/* Карусель */}
            <div
                ref={scrollRef}
                className="flex overflow-x-scroll space-x-4 scrollbar-hide"
                style={{
                    maxWidth: '100%',
                }}
            >
                {Data.map((items, i) => (
                    <div
                        key={i}
                        className="w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex-shrink-0 transform hover:scale-105 transition-transform duration-300"
                    >
                        <BookCard data={items} />
                    </div>
                ))}
            </div>

            {/* Правая стрелка */}
            {Data.length > 2 && (
                <button
                    onClick={scrollRight}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full z-10 hover:bg-gray-700 transition-all duration-300"
                >
                    &#8594;
                </button>
            )}
        </div>
    );
};

export default RecentlyAdded;
