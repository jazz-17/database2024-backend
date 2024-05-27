import express from "express";
// import path from "path";
// import url from "url";
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

class RoutesManager {
  constructor(app, dbm) {
    this.app = app; // Express app instance
    this.dbm = dbm; // DatabaseManager instance
  }

  setup() {
    this.app.set("view engine", "ejs");
    // this.app.use(express.static(path.join(__dirname, "views")));
    this.app.use(express.static("views"));
    this.setupAPIRoutes();
    this.setupHTMLRoutes();
  }
  setupHTMLRoutes() {
    // Define routes for each HTML file in their respective folders
    this.app.get("/", async (req, res) => {
      let proyectos = await this.dbm.getProyectos();
      console.log(proyectos);
      res.render("inicio/index.ejs", { proyectos: proyectos });
    });

    this.app.get("/clientes", (req, res) => {
      res.render("maestros/clientes/index.ejs");
    });
    this.app.get("/empleados", (req, res) => {
      res.render("maestros/empleados/index.ejs");
    });
    this.app.get("/empresas-venta", (req, res) => {
      res.render("maestros/empresas-venta/index.ejs");
    });
    this.app.get("/proveedores", (req, res) => {
      res.render("maestros/proveedores/index.ejs");
    });

    // this.app.get("/partidas", (req, res) => {
    //   res.render(path.join(__dirname, "views", "partidas", "index")); // Path: views/partidas/index.ejs
    // });
    // this.app.get("/proyectos", (req, res) => {
    //   res.render(path.join(__dirname, "views", "proyectos", "index"));
    // });
    this.app.get("/presupuestos", (req, res) => {
      res.render("presupuestos/index.ejs");
    });
    this.app.get("/ventas", (req, res) => {
      res.render("ventas/index.ejs");
    });
    this.app.get("/egresos", (req, res) => {
      res.render("egresos/index.ejs");
    });
    this.app.get("/flujo-de-caja", (req, res) => {
      res.render("flujo-de-caja/index.ejs");
    });
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
