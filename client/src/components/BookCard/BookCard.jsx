import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import * as response from "autoprefixer";

const BookCard = ({data, favourite}) => {
   
    console.log(data)
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id
    }
    const handleRemoveBook = async () => {

        try{
            const response = await axios.put(
                "http://localhost:1000/api/v1/remove-book-from-favourite", {},
                {headers}
            );
            alert(response.data.message);

        }catch (e) {

        }
    }
    return (
        <div className={"bg-zinc-800 rounded p-4 flex flex-col"}>
            <Link to={`/view-book-details/${data._id}`}>
                <div className={""}>
                    <div className={"bg-zinc-900 rounded flex items-center justify-center"}>
                        <img src={data.url} alt={"/"} className={"h-[25vh]"}/>
                    </div>
                    <h2 className={"mt-4 text-xl text-zinc-200 font-semibold"}>{data.title}</h2>
                    <p className={"mt-2 text-zinc-400 font-semibold"}>by {data.author}</p>
                    <p className={"mt-2 text-zinc-200 font-semibold text-xl"}>$ {data.price}</p>
                    <button></button>
                </div>
            </Link>
            
            {favourite && (
                <button
                    className={"bg-red-600  px-4 py-2 rounded border border-yellow-500 text-white font-semibold text-xl mt-4"}
                    onClick={handleRemoveBook}
                >
                    Remove from favourite
                </button>
            )}
        </div>
    );
};

export default BookCard;