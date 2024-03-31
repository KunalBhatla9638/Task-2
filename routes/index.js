const express = require("express");

// Book Controller
const {
  welcome,
  insertBook,
  displayBooks,
  updateBook,
  deleteBook,
} = require("../controllers/booksControllers");

//Author Controller
const {
  displayAuthors,
  insertAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorsControllers");

//Genre Controller
const {
  displayGenre,
  insertgenre,
  updategenre,
  deletegenre,
} = require("../controllers/genreControllers");

const router = express();

router.get("/", welcome);
//Books Routes
router.get("/books", displayBooks);
router.post("/insertbook", insertBook);
router.patch("/updatebook/:id", updateBook);
router.delete("/deletebook/:id", deleteBook);

//Authors Routes
router.get("/authors", displayAuthors); //This contain pagination
router.post("/insertauthor", insertAuthor);
router.patch("/updateauthor/:id", updateAuthor);
router.delete("/deleteauthor/:id", deleteAuthor);

//Genre Routes
router.get("/genres", displayGenre);
router.post("/insertgenre", insertgenre);
router.patch("/updategenre/:id", updategenre);
router.delete("/deletegenre/:id", deletegenre);

module.exports = router;
