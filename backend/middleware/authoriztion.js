const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { authToken } = req.cookies;
  //   const authToken = req.cookies;
  console.log("Token : " + authToken);

  if (authToken) {
    jwt.verify(authToken, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        // return res.status(401).json({ Error: "Token Experied" });
        return res.status(403).json({ error: "Forbidden - Invalid token" });
      }
      //res.status(200).json(user);
      req.user = user;
      console.log("I got processed");
      next();
    });
  } else {
    res.clearCookie("authToken");
    return res.status(401).json({ error: "Unauthorized - Missing token" });
    // return res.status(404).json({ authToken: "Not Found" });
  }
};

module.exports = verifyToken;
