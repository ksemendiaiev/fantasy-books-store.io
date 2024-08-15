const mongoose = require("mongoose");

const conn = async () => {
    try{
      await mongoose.connect(process.env.URL)
        console.log("Connected to DataBase")
    }catch (e) {
        console.log(e)
    }
}
conn();