import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {GrLanguage} from "react-icons/gr";

const ViewDataDetails = () => {
    const {id} = useParams();
    console.log(id)

    const [Data, setData] = useState({ url: '', title: '', author: '', descriptions: '', language: '', price: '' });

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `http://localhost:1000/api/v1/get-book-by-id/${id}`
            );
            console.log(response)
            setData(response.data.data);
        };
        fetch();
    }, [id]);

    return (
        <>
            <div className="px-12 py-8 bg-zinc-900 flex gap-8">
                <div className="bg-zinc-800 rounded p-4 h-[88vh] w-3/6 flex items-center justify-center">
                    <img src={Data.url} alt="" className="h-[70vh]"/>
                </div>
                <div className="p-4 w-3/6">
                    <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
                    <p className="text-zinc-400 mt-1">by {Data.author}</p>
                    <p className="text-zinc-500 mt-4 text-xl">{Data.description}</p>
                    <p className="flex mt-4 items-center justify-start text-zinc-400">
                        <GrLanguage className="me-3"/> {Data.language}
                    </p>
                    <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                        Price : {Data.price}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ViewDataDetails;