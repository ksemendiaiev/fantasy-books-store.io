import React, {useEffect, useState} from 'react';
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import axios from "axios";
import api from '../api';

const AllBooks = () => {
    const [Data, setData] = useState();

    useEffect(() => {
        const fetch = async () => {
            const response = await api.get(
                "/get-all-books"
            );
            setData(response.data.data);
        };
        fetch();
    }, []);
    return (
        <div className="bg-zinc-900 px-12 py-8 h-screen">
            <h4 className="text-3xl text-yellow-100 mb-8">All books</h4>
            {!Data ? (
                <div className="flex items-center justify-center h-screen">
                    <Loader/>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-auto"
                     style={{maxHeight: 'calc(100vh - 160px)'}}>
                    {Data.map((items, i) => (
                        <BookCard key={i} data={items}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllBooks;