const { QueryTypes } = require("sequelize");
const sequelize = require("../utiles/databaseConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../helpers/auth");
//Registration endpoint
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
      return res.status(400).json({ error: "Name is required" });
    }
    //check password
    if (!upassword || upassword.length < 6) {
      return res.status(400).json({
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

//Login endpoint
const loginUser = async (req, res) => {
  try {
    const { uemail, upassword } = req.body;

    //*Check email exist or not
    const data = await sequelize.query("select * from registration", {
      type: QueryTypes.SELECT,
    });
    let check, validUser;
    for (let obj of data) {
      //comparePassword method is in auth.js in helpers folder.
      check = await comparePassword(uemail, obj.uemail);
      if (check) {
        validUser = obj;
        break;
      }
    }
    if (!check) {
      return res
        .status(404)
        .json({ error: "Email Not Found...No Email Found" });
    }

    //*Authorize login details and generate the token
    const matchPassword = await comparePassword(upassword, validUser.upassword);
    if (!matchPassword) {
      return res
        .status(404)
        .json({ error: "Please enter correct credentials - Password wrong" });
    }

    jwt.sign(
      validUser,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, authToken) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Issue creating the json web token" });
        }

        // res.status(200).json({ user: validUser, authToken });
        //   const cookieOptions = {
        //     expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        //     // secure: true,
        //     httpOnly: true,
        //   };
        //   res
        //     .cookie("authToken", authToken, cookieOptions)
        //     .status(200)
        //     .json({ user: validUser, authToken });
        // }

        const cookieOptions = {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          sameSite: "none",
        };
        return res
          .status(200)
          .cookie("authToken", authToken, cookieOptions)
          .json({ user: validUser, authToken });

        // return res.status(200).json({ user: validUser, authToken });
      }
    );
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error...!",
    });
  }
};

// const getProfile = (req, res) => {
//   const { authToken } = req.cookies;
//   if (authToken) {
//     jwt.verify(authToken, process.env.JWT_SECRET, {}, (err, user) => {
//       if (err) {
//         return res.send("Errro : ", err.message);
//       }
//       res.status(200).json(user);
//     });
//   }
// };

module.exports = {
  registerUser,
  loginUser,
};
