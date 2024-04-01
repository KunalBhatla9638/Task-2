const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/databaseConnection");

// function paginatedResult(model) {
//   return (req, res, next) => {
//     let page = Number(req.query.page) || 1;
//     let limit = Number(req.query.limit) || 3;
//     const startIdx = (page - 1) * limit;
//     const endIdx = page * limit;

//     const results = {};

//     if (endIdx < model.length) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }

//     if (startIdx > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }

//     results.results = model.slice(startIdx, endIdx);
//     req.paginatedResult = results;
//     next();
//   };
// }

// const displayAuthors = async (req, res) => {
// let page = Number(req.query.page) || 1;
// let limit = Number(req.query.limit) || 3;
// // let skip = (page - 1) * limit;
// const startIdx = (page - 1) * limit;
// const endIdx = page * limit;
//   try {
//     const authors = await sequelize.query("select * from authors", {
//       type: QueryTypes.SELECT,
//     });
//     if (authors.length == 0) {
//       return res.status(404).send("No Records");
//     }
//     res.status(200).json(authors);

// const results = {};

// if (endIdx < authors.length) {
//   results.next = {
//     page: page + 1,
//     limit: limit,
//   };
// }

// if (startIdx > 0) {
//   results.previous = {
//     page: page - 1,
//     limit: limit,
//   };
// }

//     results.result = authors.slice(startIdx, endIdx);
//     res.status(200).json(results);
//   } catch (err) {
//     res.status(500).json({ Error: err.message });
//   }
// };

const displayAuthors = async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;
  try {
    const authors = await sequelize.query("select * from authors", {
      type: QueryTypes.SELECT,
    });
    if (authors.length == 0) {
      return res.status(404).send("No Records");
    }
    const results = {};

    if (endIdx < authors.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIdx > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.result = authors.slice(startIdx, endIdx);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const insertAuthor = async (req, res) => {
  const { author_name, biography } = req.body;

  if (!author_name || !biography) {
    return res.status(400).json({ inputRegarding: "Fill all fields" });
  }

  try {
    await sequelize.query(
      "INSERT INTO `authors` (`author_name`, `biography`) VALUES (?, ?)",
      {
        type: QueryTypes.INSERT,
        replacements: [author_name, biography],
      }
    );
    res.status(200).json({ Data: "Added Successfully" });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const updateAuthor = async (req, res) => {
  const { author_name, biography } = req.body;
  const id = req.params.id;

  try {
    let author = await sequelize.query(
      "select * from authors where authors_id = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );

    if (author.length == 0) {
      return res.status(404).send("Author id Not Found");
    }
    author = author[0];
    sequelize.query(
      "UPDATE `authors` SET `author_name` = ?, `biography` = ? WHERE `authors`.`authors_id` = ?",
      {
        type: QueryTypes.UPDATE,
        replacements: [
          author_name || author.author_name,
          biography || author.biography,
          id,
        ],
      }
    );

    res.send("Updated author");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).send("Provide Id");
  }

  try {
    const author = await sequelize.query(
      "Select * from authors where authors_id = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    if (author.length == 0) {
      return res.status(404).send("author Not Found");
    }
    await sequelize.query(
      "DELETE FROM `authors` WHERE `authors`.`authors_id` = ?",
      {
        type: QueryTypes.DELETE,
        replacements: [id],
      }
    );
    res.send("Author Deleted Successfully");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = {
  displayAuthors,
  insertAuthor,
  updateAuthor,
  deleteAuthor,
};
