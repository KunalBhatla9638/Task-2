const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/databaseConnection");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { uname, uemail, upassword } = req.body;
  //const imageName = req.file.path;
  //   const imageName = req.file.filename;

  // body("uemail").isEmail().withMessage("Invalid email address");
  if (!uemail.endsWith("@gmail.com" || "@email.com" || "@yahoo.com")) {
    return res
      .status(550)
      .json({ Error: "User Unknown - Email must be from example.com" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageName = req.file.filename;

  console.log(imageName);
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

    const data = await sequelize.query("select * from registration", {
      type: QueryTypes.SELECT,
    });

    // const userEmail = data.map((item) => {
    //   const compare = bcrypt.compare(uemail, item.uemail);
    //   if (compare) {
    //     return true;
    //   }
    // });

    let compare;
    // console.log(data);
    for (let encryptedemail of data) {
      const temp = encryptedemail.uemail;
      compare = await bcrypt.compare(uemail, temp);
      if (compare) {
        console.log("final value : " + compare);
        break;
      }
    }

    if (compare) {
      return res.status(409).json({ error: "Email is taken already" });
    }

    if (!compare) {
      const emailExist = await sequelize.query(
        "select * from registration where uemail = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [uemail],
        }
      );

      const saltRounds = 10;
      const securePassword = await bcrypt.hash(upassword, saltRounds);
      const secureEmail = await bcrypt.hash(uemail, saltRounds);

      const user = await sequelize.query(
        "INSERT INTO `registration` (`uname`, `uemail`, `upassword`, `uprofilepic`) VALUES (?, ?, ?, ?)",
        {
          type: QueryTypes.INSERT,
          replacements: [uname, secureEmail, securePassword, imageName],
        }
      );

      if (user) res.status(200).json({ success: "User Created", user }); //[2, 1]
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  res.send("hello");
};

module.exports = {
  registerUser,
  loginUser,
};
