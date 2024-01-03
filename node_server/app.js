const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();

// Set up CORS middleware to allow cross-origin requests
app.use(cors());
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// Create multer instance with storage configuration
const upload = multer({ storage });

// Save photo endpoint
app.post("/save", upload.single("photo"), (req, res) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  if (req.file) {
    // Generate URL for saved photo
    const photoUrl = `http://localhost:3050/uploads/${req.file.filename}`;
    res.send({ photoUrl: req.file.filename });
  } else {
    res.status(400).send({ error: "No photo uploaded" });
  }
});

// Get photo endpoint
app.get("/get", (req, res) => {
  const { photoUrl } = req.query;
  console.log(photoUrl);
  const filePath = `./uploads/${photoUrl}`;
  console.log(filePath);
  if (fs.existsSync(filePath)) {
    console.log(path.resolve(filePath));
    res.sendFile(path.resolve(filePath));
  } else {
    res.status(404).send({ error: "Photo not found" });
  }
});

// Start server
app.listen(3050, () => {
  console.log("Server started on port 3050");
});
