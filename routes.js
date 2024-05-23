import path from "path";
import express from "express";
import url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

function setupRoutes(app) {
  // Serve static files from the public directory
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  app.get("/api/data", (req, res) => {
    res.json({ message: "Hello, world!" });
  });
}

export default setupRoutes;
