const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/databaseConnection");

const registerUser = async (req, res) => {
  const { uname, uemail, upassword } = req.body;
  //const imageName = req.file.path;
  //   const imageName = req.file.filename;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageName = req.file.filename;

  console.log(typeof imageName);
  console.log(uname + " " + uemail + " " + upassword + " " + imageName);
  console.log(imageName);
  try {
    //check name
    if (!uname) {
      return res.status(204).json({ error: "Name is required" });
    }
    //check password
    if (!upassword || upassword.length < 6) {
      return res.status(204).json({
        error: "Password is required and should be at least 6 character long",
      });
    }
    //check email
    const emailExist = await sequelize.query(
      "select * from registration where uemail = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [uemail],
      }
    );
    if (emailExist.length != 0) {
      return res.status(409).json({ error: "Email is taken already" });
    }

    const user = await sequelize.query(
      "INSERT INTO `registration` (`uname`, `uemail`, `upassword`, `uprofilepic`) VALUES (?, ?, ?, ?)",
      {
        type: QueryTypes.INSERT,
        replacements: [uname, uemail, upassword, imageName],
      }
    );

    if (user) res.status(200).json({ success: "User Created", user }); //[2, 1]
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
};
