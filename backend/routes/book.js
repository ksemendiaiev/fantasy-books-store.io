const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/books");
const { authenticateToken } = require("./userAuth");

// Add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; // Get user ID from headers
        const user = await User.findById(id);

        if (!user || user.role !== "admin") {
            return res.status(400).json({ message: "You don't have access to perform this action" });
        }

        // Add the owner field when creating the book
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
            owner: user._id, // Associate the book with the user ID
        });

        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (e) {
        console.log("Adding book error: ", e);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update book
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const { id: userId } = req.headers; 

        const book = await Book.findById(bookid);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (String(book.owner) !== String(userId)) {
            return res.status(403).json({ message: "You are not authorized to update this book" });
        }

       
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });

        return res.status(200).json({ message: "Book updated successfully" });
    } catch (e) {
        console.log("Update book error: ", e);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const { id: userId } = req.headers; 

        const book = await Book.findById(bookid);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

       
        if (String(book.owner) !== String(userId)) {
            return res.status(403).json({ message: "You are not authorized to delete this book" });
        }

    
        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (e) {
        console.log("Delete book error", e);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get all books
router.get("/get-all-books", async (req, res) => {
    try {
        // Populate the owner field to include username and email
        const books = await Book.find().sort({ createdAt: -1 }).populate("owner", "username email");
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (e) {
        console.log("Getting all books error", e);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get recently added books
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4).populate("owner", "username email");
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (e) {
        console.log("Getting recent books error", e);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get book by ID
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Populate the owner field to get user details
        const book = await Book.findById(id).populate("owner", "username email _id");
        return res.json({
            status: "Success",
            data: book,
        });
    } catch (e) {
        console.log("Getting book by ID error: ", e);
        return res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;
