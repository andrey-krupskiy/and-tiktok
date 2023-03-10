const { VIDEO_DIR } = require('./const');
const fs = require("fs");

const getVideoByIdHandler = (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const videoPath = VIDEO_DIR + req.params.id + ".mp4";
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
}

const getVideosHandler = (req, res) => {
  if (!fs.existsSync(VIDEO_DIR)) {
    console.log(`${VIDEO_DIR} directory does not exist`);
    res.status(500).send();
  }

  const videos = fs.readdirSync(VIDEO_DIR).map((video) => video.substring(0, video.lastIndexOf('.')) || filename);

  res.json({ videos: videos });

};

const postVideoHandler = (req, res) => {
  res.json({ message: "Successfilly uploaded files" });
};

module.exports = { getVideosHandler, getVideoByIdHandler, postVideoHandler };
