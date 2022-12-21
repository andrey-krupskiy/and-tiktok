const fs = require("fs");
const express = require('express')
const port = 3000;
const cors = require('cors')
const app = express();

const VIDEO_DIR = "video_data";

app.use(cors())

app.get('/feed', (req, res) => {
  res.json({ name: 'feed', data: [1, 2, 3, 4] })
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get('/video/:id', (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const videoPath = VIDEO_DIR + "/" + req.params.id + ".mp4";
  if (!fs.existsSync(videoPath)) {
    res.status(404).send("Video not found");
  }

  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.listen(port, () => {
  console.log(`AND SHE CAN app listening on port ${port}`)
})
