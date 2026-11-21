/*
  Sistema LarPet Admin
  Integrantes do projeto:
  Gabriela Bueno dos Passos Teixeira
  Karina Bueno dos Passos Teixeira
  Polo: Novo Hamburgo
*/

import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "./config/conexao.js";
import abrigoRoutes from "./routes/abrigos.js";
import animalRoutes from "./routes/animais.js";
import adocaoRoutes from "./routes/adocoes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

// Dashboard
app.get("/", (req, res) => {
  res.render("index", { pagina: "dashboard" });
});

// Rotas das entidades
app.use("/abrigo", abrigoRoutes);
app.use("/animal", animalRoutes);
app.use("/adocao", adocaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));