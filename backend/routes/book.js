const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const Book = require("../models/books")
const {authenticateToken} = require("./userAuth")



//add book --admin
router.post("/add-book", authenticateToken, async(req, res) => {
    try{
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res.status(400).json({message: "You don't have an access to perform admin"})
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({message: "Book added successfully"})
    }catch (e) {
        console.log("Adding book error:  ", e)
        res.status(500).json({message: "Internal server error"});
    }
})
//update book
router.put("/update-book", authenticateToken, async(req, res) => {
    try{
        const {bookid} = req.headers;

       await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });
        return res.status(200).json({message: "Book updated successfully"})
    }catch (e) {
        console.log("Update book error:  ", e)
        return res.status(500).json({message: "An error occurred"});
    }
} )

//delete book
router.delete("/delete-book", authenticateToken, async(req, res) => {
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message: "Book deleted successfully"})
        
    }catch (e) {
        console.log("Delete book error", e)
        return res.status(500).json({message: "An error occurred"});

    }
})

//get all books
router.get("/get-all-books", async(req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        })
    }catch (e) {
        console.log("Getting all books error", e);
        return res.status(500).json({message: "An error occurred"})
    }
})
//get recently added books
router.get("/get-recent-books", async(req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        })
    }catch (e) {
        console.log("Getting recent books error", e);
        return res.status(500).json({message: "An error occurred"})
    }
})
//get book by id

router.get("/get-book-by-id/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });
    }catch (e) {
        console.log("Getting book by id error: ", e);
        return res.status(500).json({message: "An error occurred"})
    }
})
module.exports = router;