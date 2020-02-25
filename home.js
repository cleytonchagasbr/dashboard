const express = require("express");
const server = express();
server.use(express.json());

const allVideos = ["Aula 1, Aula 2, Aula 3, Aula 4, Aula 5, Aula 6, Aula 7, Aula 8, Aula 9, Aula 10"];

function checkIndexArray(req, res, next) {
  const project = allVideos[req.params.index];
  if (!project) {
    return res.status(400).json({ error: "Index not exists or errors" });
  }
  req.project = project;
  return next();
}

server.use("/", (req, res, next) => {
  console.time("Request");
  next();
  console.timeEnd("Request");
});

server.get("/videos/:index", checkIndexArray, (req, res) => {
  const { index } = req.params;
  return res.json(req.project);
});

server.get("/videos", (req, res) => {
  return res.json(allVideos);
});

server.post("/videos", (req, res) => {
  const { name } = req.body;
  allVideos.push(name);

  return res.status(200).end();
});

server.put("/videos", (req, res) => {});
server.delete("/videos", (req, res) => {});

server.listen(3000);
