const express = require("express");
const server = express();
server.use(express.json());

const allProjects = ["Java web - Default", "NodeJs - Default"];

function checkIndexArray(req, res, next) {
  const project = allProjects[req.params.index];
  if (!project) {
    return res.status(400).json({ error: "Index error" });
  }

  req.project = project;
  return next();
}

server.use("/", (req, res, next) => {
  console.time("Request");
  next();
  console.timeEnd(`Metodo ${req.method} / URL ${req.url}`);
});

server.get("/projects/:index", checkIndexArray, (req, res) => {
  const { index } = req.params;
  return res.json(req.project);
});

server.get("/projects", (req, res) => {
  return res.json(allProjects);
});
server.post("/projects", (req, res) => {});
server.put("/projects", (req, res) => {});
server.delete("/projects", (req, res) => {});

server.listen(3000);
