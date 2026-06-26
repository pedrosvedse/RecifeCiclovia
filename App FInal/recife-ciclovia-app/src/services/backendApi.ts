import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'SUAAPI',
  timeout: 5000,
});

// O MOCK EXATO QUE O SEU GEOUTILS E MAPA ESPERAM (ARRAY DE NUMEROS)
const dadosMockados = [
  {
    id: "mock_001",
    nome: "Ciclofaixa Av. Boa Viagem",
    tipo: "Ciclofaixa",
    extensao: 7200,
    coordenadas: [
      [-34.8953, -8.1075],
      [-34.8942, -8.1098],
      [-34.8931, -8.1121],
      [-34.8920, -8.1144]
    ],
    coordinates: [
      [-34.8953, -8.1075],
      [-34.8942, -8.1098],
      [-34.8931, -8.1121],
      [-34.8920, -8.1144]
    ]
  },
  {
    id: "mock_002",
    nome: "Ciclovia Av. Agamenon Magalhães",
    tipo: "Ciclovia",
    extensao: 3400,
    coordenadas: [
      [-34.9050, -8.0630],
      [-34.9045, -8.0638],
      [-34.9038, -8.0648],
      [-34.9030, -8.0661]
    ],
    coordinates: [
      [-34.9050, -8.0630],
      [-34.9045, -8.0638],
      [-34.9038, -8.0648],
      [-34.9030, -8.0661]
    ]
  }
];

export const getCiclovias = async () => {
  return dadosMockados;
};

export const salvarNoHistorico = async (dados: any) => {
  return { message: "Salvo com sucesso (Mock Local)", registro: dados };
};