// Representa um trecho de ciclovia retornado pela API do Dados Recife (GeoJSON)
export interface CicloviaFeature {
  type: "Feature";
  properties: {
    id: string;
    nome: string;        // nome da ciclovia/trecho
    tipo: string;        // ex: "Ciclofaixa", "Ciclovia"
    extensao: number;    // extensão em metros
  };
  geometry: {
    type: "LineString" | "MultiLineString";
    coordinates: number[][] | number[][][]; // [lng, lat] por ponto
  };
}

// O que enviamos ao nosso backend no POST /historico
export interface HistoricoInput {
  lat: number;
  lng: number;
  ciclovia_id: string;
  nome: string;
  distancia_m: number;
}

// O que recebemos do GET /historico
export interface HistoricoRecord extends HistoricoInput {
  id: number;
  timestamp: string;
}

// Resultado do cálculo de proximidade (usado nas telas de mapa e lista)
export interface CicloviaProxima {
  feature: CicloviaFeature;
  distancia_m: number;
}