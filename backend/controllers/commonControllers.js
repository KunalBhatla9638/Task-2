const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/databaseConnection");

const searchBook = async (req, res) => {
  const str = req.query.searchstr;

  let result;

  try {
    const book = await sequelize.query(
      //   "select * from books where title like '%?%'",
      `
      select * from books where title like '${str}%'
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const author = await sequelize.query(
      //   "select * from books where title like '%?%'",
      `
      select * from authors where author_name like '${str}%'
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const genres = await sequelize.query(
      //   "select * from books where title like '%?%'",
      `
      select * from genres where genre_name like '${str}%'
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    result = [...book, ...author, ...genres];
  } catch (err) {
    res.send(err.message);
  }

  if (result.length == 0)
    res.status(404).json({ Status: `Search for '${str}' not found` });

  res.status(200).json({ Search: `Search found for '${str}'`, Result: result });
};

module.exports = {
  searchBook,
};
