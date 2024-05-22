import path from "path";
import express from "express";
import { fileURLToPath } from "url";

// Get the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function setupRoutes(app) {
  app.use(express.static(path.join(__dirname, "public")));

  // Add more routes here as needed
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  app.get("/api/data", (req, res) => {
    let manager = new DatabaseManager(dbConfig);
    let result = manager.fetchJsonAndSendToFronted();
    result.then((result) => res.json({ message: result }));
  });
}

export default setupRoutes;
