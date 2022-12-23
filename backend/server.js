const { getVideoByIdHandler, getVideosHandler, postVideoHandler, VIDEO_DIR } = require('./src');
console.log('VIDEO_DIR', VIDEO_DIR);

const fs = require("fs");
const express = require('express')
const port = 3000;
const cors = require('cors')
const app = express();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, VIDEO_DIR)
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.get('/feed', (req, res) => {
  res.json({ name: 'feed', data: [1, 2, 3, 4] })
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// TODO: this should probably be /videos/:id
app.get('/video/:id', getVideoByIdHandler);

app.get('/videos', getVideosHandler);

app.post("/upload_video", upload.single("file"), postVideoHandler);

app.listen(port, () => {
  console.log(`AND SHE CAN app listening on port ${port}`)
})
