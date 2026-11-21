import mongoose from "mongoose";

const url = process.env.MONGODB_URI;
const conexao = await mongoose.connect(url);

export default conexao;