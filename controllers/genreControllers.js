const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/databaseConnection");

const displayGenre = async (req, res) => {
  try {
    const genres = await sequelize.query("select * from genres", {
      type: QueryTypes.SELECT,
    });
    if (genres.length == 0) {
      return res.status(404).send("No Records");
    }
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const insertgenre = async (req, res) => {
  const { genre_name } = req.body;

  if (!genre_name) {
    return res
      .status(400)
      .json({ inputRegarding: "Fill the genre_name fields" });
  }

  try {
    const genere = await sequelize.query(
      "select * from genres where genre_name = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [genre_name],
      }
    );
    if (genere.length !== 0) {
      return res.send("Genre exists");
    }
    await sequelize.query("INSERT INTO `genres` (`genre_name`) VALUES (?)", {
      type: QueryTypes.INSERT,
      replacements: [genre_name],
    });
    res
      .status(200)
      .json({ Data: `Added genre name '${genre_name}' Successfully` });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const updategenre = async (req, res) => {
  const { genre_name } = req.body;
  const id = req.params.id;

  try {
    let genre = await sequelize.query(
      "select * from genres where genre_id = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );

    if (genre.length == 0) {
      return res.status(404).send("genre id Not Found");
    }
    genre = genre[0];
    sequelize.query(
      "UPDATE `genres` SET `genre_name` = ? WHERE `genres`.`genre_id` = ?",
      {
        type: QueryTypes.UPDATE,
        replacements: [genre_name, id],
      }
    );
    res.send("Updated Genre");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const deletegenre = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).send("Provide Id");
  }

  try {
    const genre = await sequelize.query(
      "Select * from genres where genre_id = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    if (genre.length == 0) {
      return res.status(404).send("genre Not Found");
    }
    await sequelize.query(
      "DELETE FROM `genres` WHERE `genres`.`genre_id` = ?",
      {
        type: QueryTypes.DELETE,
        replacements: [id],
      }
    );
    res.send("genre Deleted Successfully");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = {
  displayGenre,
  insertgenre,
  updategenre,
  deletegenre,
};
