const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const ciclovias = [
  {
    id: "mock_001",
    nome: "Ciclofaixa Av. Boa Viagem",
    tipo: "Ciclofaixa",
    extensao: 7200,
    coordinates: [[-34.8953, -8.1075], [-34.8942, -8.1098]]
  },
  {
    id: "mock_002",
    nome: "Ciclovia Av. Agamenon Magalhães",
    tipo: "Ciclovia",
    extensao: 3400,
    coordinates: [[-34.9050, -8.0630], [-34.9045, -8.0638]]
  }
];

const historico = [];

app.get("/", (req, res) => res.json({ status: "ok" }));
app.get("/api/ciclovias", (req, res) => res.json(ciclovias));
app.post("/api/historico", (req, res) => {
  const { lat, lng, ciclovia_id, nome, distancia_m } = req.body;
  const registro = { id: historico.length + 1, lat, lng, ciclovia_id, nome, distancia_m, timestamp: new Date().toLocaleString("pt-BR") };
  historico.push(registro);
  res.status(201).json({ message: "Salvo com sucesso.", registro });
});
app.get("/api/historico", (req, res) => res.json([...historico].reverse()));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
