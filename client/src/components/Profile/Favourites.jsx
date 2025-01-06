import React, {useEffect, useState} from 'react';
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import api from '../../api';

const Favourites = () => {
    const [FavouriteBooks, setFavouriteBooks] = useState([])
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(() => {
        const fetch = async () => {

         try{
             const response = await api.get(
                 "/get-favourite-books",
                 {headers}
             );
             setFavouriteBooks(response.data.data)
         }catch (e) {
             console.log("Fetching favourite data error:", e)
         }
        };
        fetch();
    }, [FavouriteBooks]);


    return (
        <>
            {FavouriteBooks && FavouriteBooks.length === 0 && <div
                className={"text-5xl font-semibold h-[100%] text-zinc-500 flex items-center flex-col justify-center w-full "}>
                No Favourite Books
                <img src="./star.png" alt={"star"} className={"h-[5vh] my-8"}/>
            </div>}
            <div className={"grid grid-cols-4 gap-4 "}>

                {FavouriteBooks &&
                    FavouriteBooks.map((items, i) => (
                        <div key={i}>
                            <BookCard data={items} favourite={true}/>
                        </div>
                    ))}
            </div>
        </>

    );
};

export default Favourites;