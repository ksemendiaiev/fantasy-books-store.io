import React from 'react';
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewDataDetails from "./components/ViewBookDetails/ViewDataDetails";

const App = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/"  element={<Home />} />
                    <Route path="/all-books"  element={<AllBooks />} />
                    <Route path="/cart"  element={<Cart />} />
                    <Route path="/profile"  element={<Profile />} />
                    <Route path="/login"  element={<Login />} />
                    <Route path="/signup"  element={<SignUp />} />
                    <Route path="/view-book-details/:id" element={<ViewDataDetails />}  />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default App;