import express from "express";
import Abrigo from "../models/Abrigo.js";

const router = express.Router();

// Read: listar os registros
router.get("/lst", async (req, res) => {
    try {
        const abrigos = await Abrigo.find();
        res.render("abrigo/lst", { abrigos, pesquisar: "", pagina: "abrigos" });
    } catch (erro) {
        res.render("erro", { mensagem: "Não foi possível listar os abrigos.", pagina: "abrigos" });
    }
});

// Filtro/Pesquisa pelo atributo: nome
router.post("/lst", async (req, res) => {
    try {
        const { pesquisar } = req.body;
        const texto = pesquisar.trim().slice(0, 50).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const abrigos = await Abrigo.find({ nome: new RegExp(texto, "i") });
        res.render("abrigo/lst", { abrigos, pesquisar, pagina: "abrigos" });
    } catch (erro) {
        res.render("erro", { mensagem: "Não foi possível pesquisar os abrigos.", pagina: "abrigos" });
    }
});

// Create: abrir o formulário de cadastro
router.get("/add", (req, res) => {
    res.render("abrigo/add", { abrigo: {}, erro: null, pagina: "abrigos" });
});

// Create: gravar o novo registro
router.post("/add/ok", async (req, res) => {
    const { nome, cidade, endereco, telefone, responsavel } = req.body;
    try {
        await Abrigo.create({ nome, cidade, endereco, telefone, responsavel });
        res.render("abrigo/addok", { nome, pagina: "abrigos" });
    } catch (erro) {
        res.render("abrigo/add", {
            abrigo: req.body,
            erro: "Não foi possível cadastrar. Preencha todos os campos obrigatórios.",
            pagina: "abrigos"
        });
    }
});

// Update: abrir o formulário de edição
router.get("/edt/:id", async (req, res) => {
    try {
        const abrigo = await Abrigo.findById(req.params.id);
        if (!abrigo) {
            return res.render("erro", { mensagem: "Abrigo não encontrado.", pagina: "abrigos" });
        }
        res.render("abrigo/edt", { abrigo, erro: null, pagina: "abrigos" });
    } catch (erro) {
        res.render("erro", { mensagem: "ID inválido.", pagina: "abrigos" });
    }
});

// Update: gravar as alterações do registro
router.post("/edt/:id", async (req, res) => {
    try {
        const abrigo = await Abrigo.findByIdAndUpdate(req.params.id,
            {
                nome: req.body.nome,
                cidade: req.body.cidade,
                endereco: req.body.endereco,
                telefone: req.body.telefone,
                responsavel: req.body.responsavel
            },
            { runValidators: true });
        if (!abrigo) {
            return res.render("erro", { mensagem: "Abrigo não encontrado.", pagina: "abrigos" });
        }
        res.render("abrigo/edtok", { pagina: "abrigos" });
    } catch (erro) {
        res.render("erro", { mensagem: "Não foi possível atualizar. Verifique os dados e o ID.", pagina: "abrigos" });
    }
});

// Delete: excluir o registro
router.post("/del/:id", async (req, res) => {
    try {
        await Abrigo.findByIdAndDelete(req.params.id);
        res.redirect("/abrigo/lst");
    } catch (erro) {
        res.render("erro", { mensagem: "Não foi possível excluir. ID inválido.", pagina: "abrigos" });
    }
});

export default router;