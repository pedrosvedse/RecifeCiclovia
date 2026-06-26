import express from "express";
import cors from "cors";
import historicoRoutes from "./routes/historico";

const app = express();

// Permite chamadas do app mobile (qualquer origem em dev)
app.use(cors());

// Faz o Express entender JSON no body das requisições
app.use(express.json());

// Rota de health check — útil para testar se o servidor está vivo
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Recife Ciclovia API rodando." });
});

// Registra as rotas de histórico sob o prefixo /historico
app.use("/historico", historicoRoutes);

export default app;