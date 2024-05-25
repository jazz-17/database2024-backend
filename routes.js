import path from "path";
import express from "express";
import url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

class RoutesManager {
  constructor(app, dbm) {
    this.app = app; // Express app instance
    this.dbm = dbm; // DatabaseManager instance
  }

  setup() {
    this.app.set("view engine", "ejs");
    // Serve static files from the views directory
    this.app.use(express.static(path.join(__dirname, "views")));
    this.setupAPIRoutes();
    this.setupHTMLRoutes();
  }
  setupHTMLRoutes() {
    // Define routes for each HTML file in their respective folders
    this.app.get("/", (req, res) => {
      res.render(path.join(__dirname, "views", "inicio", "index")); // Path: views/inicio/index.ejs
    });

    this.app.get("/clientes", (req, res) => {
      res.render(
        path.join(__dirname, "views", "maestros", "clientes", "index")
      ); // Path: views/maestros/index.ejs
    });
    this.app.get("/empleados", (req, res) => {
      res.render(
        path.join(__dirname, "views", "maestros", "empleados", "index")
      ); // Path: views/maestros/index.ejs
    });
    this.app.get("/empresas-venta", (req, res) => {
      res.render(
        path.join(__dirname, "views", "maestros", "empresas-venta", "index")
      ); // Path: views/maestros/index.ejs
    });
    this.app.get("/proveedores", (req, res) => {
      res.render(
        path.join(__dirname, "views", "maestros", "proveedores", "index")
      );
    });

    // this.app.get("/partidas", (req, res) => {
    //   res.render(path.join(__dirname, "views", "partidas", "index")); // Path: views/partidas/index.ejs
    // });
    // this.app.get("/proyectos", (req, res) => {
    //   res.render(path.join(__dirname, "views", "proyectos", "index"));
    // });
    this.app.get("/presupuestos", (req, res) => {
      res.render(path.join(__dirname, "views", "presupuestos", "index"));
    });
    this.app.get("/ventas", (req, res) => {
      res.render(path.join(__dirname, "views", "ventas", "index"));
    });
    this.app.get("/egresos", (req, res) => {
      res.render(path.join(__dirname, "views", "egresos", "index"));
    });
    this.app.get("/flujo-de-caja", (req, res) => {
      res.render(path.join(__dirname, "views", "flujo-de-caja", "index"));
    });
    //how to ad 404 page?
    this.app.get("*", (req, res) => {
      res.send("404 Page not found");
    });
  }
  setupAPIRoutes() {
    this.app.get("/api/proyectos", async (req, res) => {
      const proyectos = await this.dbm.getProyectos();
      res.json(proyectos);
    });
  }
}

export default RoutesManager;
