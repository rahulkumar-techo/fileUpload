````js
import multer from "multer";
import express from "express";

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("myfile"), (req, res) => {
  res.send("File uploaded successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


```

