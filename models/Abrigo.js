import conexao from "../config/conexao.js";

const AbrigoSchema = new conexao.Schema({
    nome: { type: String, required: true, trim: true },
    cidade: { type: String, required: true, trim: true },
    endereco: { type: String, required: true, trim: true },
    telefone: { type: String, required: true, trim: true },
    responsavel: { type: String, required: true, trim: true }
});

const Abrigo = conexao.model("Abrigo", AbrigoSchema);
export default Abrigo;