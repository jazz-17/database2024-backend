import express from "express";
import Proyecto from "./controller/proyecto.js";
import Cliente from "./controller/cliente.js";
import Empleado from "./controller/empleado.js";
import EmpresaVenta from "./controller/empresa-venta.js";
import Proveedor from "./controller/proveedor.js";

class RoutesManager {
  constructor(app, dbm) {
    this.app = app; // Express app instance
    this.dbm = dbm; // DatabaseManager instance
  }

  setup() {
    this.app.set("view engine", "ejs");
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static("views"));
    this.setupAPIRoutes();
    this.setupHTMLRoutes();
  }
  setupHTMLRoutes() {
    // Define routes for each HTML file in their respective folders
    this.app.get("/", (req, res) => {
      res.render("inicio/index.ejs");
    });

    /* RUTAS DE CLIENTES */
    this.app.get("/clientes", async (req, res) => {
      let clientes = await Cliente.index();
      res.render("maestros/clientes/index.ejs", { clientes: clientes });
    });
    this.app.post("/nuevo-cliente", async (req, res) => {
      let { desPersona, nroRuc, desCorta, desAlterna } = req.body;
      try {
        await Cliente.create(desPersona, nroRuc, desCorta, desAlterna);
        res.status(200).send("Cliente creado correctamente");
      } catch (err) {
        console.error(err);
        res.status(500).send("Error al crear cliente");
      }
    });
    this.app.post("/eliminar-cliente", async (req, res) => {
      let { codigo } = req.body;
      try {
        await Cliente.delete(codigo);
        res.status(200).send("Cliente eliminado correctamente");
      } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar cliente");
      }
    });
    /* RUTAS DE EMPLEADOS */
    this.app.get("/empleados", async (req, res) => {
      let empleados = await Empleado.index();
      res.render("maestros/empleados/index.ejs", { empleados: empleados });
    });
    this.app.get("/empresas-venta", async (req, res) => {
      let empresas = await EmpresaVenta.index();
      res.render("maestros/empresas-venta/index.ejs", { empresas: empresas });
    });
    this.app.get("/proveedores", async (req, res) => {
      let proveedores = await Proveedor.index();
      res.render("maestros/proveedores/index.ejs", {
        proveedores: proveedores,
      });
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
