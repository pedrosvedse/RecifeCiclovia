const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ----- DADOS AJUSTADOS PARA O SEU APP -----
const ciclovias = [
  {
    id: "mock_001",
    nome: "Ciclofaixa Av. Boa Viagem",
    tipo: "Ciclofaixa",
    extensao: 7200,
    // Enviando das duas formas para garantir que o mapa ache a propriedade certa
    coordinates: [
      { latitude: -8.1075, longitude: -34.8953 },
      { latitude: -8.1098, longitude: -34.8942 },
      { latitude: -8.1121, longitude: -34.8931 },
      { latitude: -8.1144, longitude: -34.8920 }
    ],
    coordenadas: [
      { latitude: -8.1075, longitude: -34.8953 },
      { latitude: -8.1098, longitude: -34.8942 },
      { latitude: -8.1121, longitude: -34.8931 },
      { latitude: -8.1144, longitude: -34.8920 }
    ]
  },
  {
    id: "mock_002",
    nome: "Ciclovia Av. Agamenon Magalhães",
    tipo: "Ciclovia",
    extensao: 3400,
    coordinates: [
      { latitude: -8.0630, longitude: -34.9050 },
      { latitude: -8.0638, longitude: -34.9045 },
      { latitude: -8.0648, longitude: -34.9038 },
      { latitude: -8.0661, longitude: -34.9030 }
    ],
    coordenadas: [
      { latitude: -8.0630, longitude: -34.9050 },
      { latitude: -8.0638, longitude: -34.9045 },
      { latitude: -8.0648, longitude: -34.9038 },
      { latitude: -8.0661, longitude: -34.9030 }
    ]
  }
];

const historico = [];

// ----- ROTAS -----

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Servidor ativo." });
});

// GET /api/ciclovias
app.get("/api/ciclovias", (req, res) => {
  res.json(ciclovias);
});

// POST /api/historico
app.post("/api/historico", (req, res) => {
  const { lat, lng, ciclovia_id, nome, distancia_m } = req.body;

  const registro = {
    id: historico.length + 1,
    lat: lat || 0,
    lng: lng || 0,
    ciclovia_id: ciclovia_id || "id_pala",
    nome: nome || "Ciclovia Interagida",
    distancia_m: distancia_m || 0,
    timestamp: new Date().toLocaleString("pt-BR")
  };

  historico.push(registro);
  res.status(201).json({ message: "Salvo com sucesso.", registro });
});

// GET /api/historico
app.get("/api/historico", (req, res) => {
  res.json([...historico].reverse());
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});