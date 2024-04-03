const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/assets");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     const renamedImage = Date.now() + "-" + file.originalname;
//     cb(null, renamedImage);
//     req.imageName = renamedImage;
//     console.log("Done");
//   },
// });
// const upload = multer({ storage: storage });

//2time
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    console.log("I Worked once");
    const renamedImage = Date.now() + "-" + file.originalname;
    cb(null, renamedImage);
    req.imageName = renamedImage;
  },
});

const fileFilter = (req, file, cb) => {
  // Allow only images (you can modify this according to your requirements)
  if (file.mimetype.startsWith("image/")) {
    console.log("I Worked once");
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const limits = {
  fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = upload;
