const express = require('express');
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./conn/conn")


const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

const corsOptions = {
    origin: ["https://your-frontend-app.vercel.app"], // Укажите домен frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};


const PORT = process.env.PORT || 7000
app.use(express.json());
app.use(cors())
//routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);



//Creating PORT
app.listen(PORT,() => {
    console.log(`Server started on PORT ${PORT}`)
})