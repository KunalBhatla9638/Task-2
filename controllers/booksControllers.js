const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/databaseConnection");

const welcome = (req, res) => {
  res.send("Hello");
};

const displayBooks = async (req, res) => {
  try {
    const books = await sequelize.query("select * from books", {
      type: QueryTypes.SELECT,
    });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const insertBook = async (req, res) => {
  const { title, description, publish_year, quantity } = req.body;

  if (!title || !description || !publish_year || !quantity) {
    return res.status(400).json({ inputRegarding: "Fill all fields" });
  }

  try {
    await sequelize.query(
      "INSERT INTO `books` (`title`, `description`, `publish_year`, `quantity`) VALUES (?, ?, ? ,?)",
      {
        type: QueryTypes.INSERT,
        replacements: [title, description, publish_year, quantity],
      }
    );
    res.status(200).json({ Data: "Added Successfully" });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const updateBook = async (req, res) => {
  const { title, description, publish_year, quantity } = req.body;
  const id = req.params.id;

  try {
    let book = await sequelize.query("select * from books where books_id = ?", {
      type: QueryTypes.SELECT,
      replacements: [id],
    });

    if (book.length == 0) {
      return res.status(404).send("Book Not Found");
    }
    book = book[0];
    sequelize.query(
      "UPDATE `books` SET `title` = ?, `description` = ?, `publish_year` = ?, `quantity` = ? WHERE `books`.`books_id` = ?",
      {
        type: QueryTypes.UPDATE,
        replacements: [
          title || book.title,
          description || book.description,
          publish_year || book.publish_year,
          quantity || book.quantity,
          id,
        ],
      }
    );

    res.send(book);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).send("Provide Id");
  }

  try {
    const book = await sequelize.query(
      "Select * from books where books_id = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    if (book.length == 0) {
      return res.status(404).send("Book Not Found");
    }
    await sequelize.query("DELETE FROM `books` WHERE `books`.`books_id` = ?", {
      type: QueryTypes.DELETE,
      replacements: [id],
    });
    res.send("Deleted Successfully");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = {
  welcome,
  insertBook,
  displayBooks,
  updateBook,
  deleteBook,
};
