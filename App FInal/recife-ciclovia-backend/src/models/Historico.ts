// Forma do objeto que chega no POST
export interface HistoricoInput {
  lat: number;
  lng: number;
  ciclovia_id: string;
  nome: string;
  distancia_m: number;
}

// Forma do objeto retornado no GET (inclui id e timestamp do banco)
export interface HistoricoRecord extends HistoricoInput {
  id: number;
  timestamp: string;
}