import React, {useEffect} from 'react';
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewDataDetails from "./components/ViewBookDetails/ViewDataDetails";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.role);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
   // const role = localStorage.getItem("role");
        if (
            id &&
            token &&
            role
        ) {
dispatch(authActions.login({token,
                            role}));
dispatch(authActions.changeRole(localStorage.getItem("role")));
        }
    }, [dispatch]);
    return (
        <div>

            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/all-books" element={<AllBooks/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/profile" element={<Profile/>}>
                    {role === "user" ? <Route index element={<Favourites />}/> : <Route index element={<AllOrders />}/>}
                    {role === "admin" &&  <Route path={"/profile/add-book"} element={<AddBook />}/>}
                    <Route path={"/profile/orderHistory"} element={<UserOrderHistory />}/>
                    <Route path={"/profile/settings"} element={<Settings />}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/updateBook/:id" element={<UpdateBook/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/view-book-details/:id" element={<ViewDataDetails/>}/>
            </Routes>
            <Footer/>

        </div>
    );
};

export default App;