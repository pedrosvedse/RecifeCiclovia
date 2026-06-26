import axios from "axios";
import { CicloviaFeature } from "../types";

// URL do dataset GeoJSON da malha cicloviária do Recife
const BASE_URL =
  "https://dados.recife.pe.gov.br/dataset/malha-cicloviaria-do-recife";

// Busca o GeoJSON completo da malha cicloviária
// O Dados Recife expõe o recurso direto via CKAN datastore
export async function fetchCiclovias(): Promise<CicloviaFeature[]> {
  const response = await axios.get(
    "https://dados.recife.pe.gov.br/api/3/action/datastore_search",
    {
      params: {
        resource_id: "2eca4870-8589-4cf1-8e4f-8fdb408e6c9c", // ID do recurso GeoJSON
        limit: 1000,
      },
    }
  );

  // A API retorna { result: { records: [...] } }
  // Cada record tem geometry como string JSON — fazemos o parse aqui
  const records = response.data?.result?.records ?? [];

  return records.map((r: any) => ({
    type: "Feature",
    properties: {
      id: String(r._id),
      nome: r.nome ?? r.logradouro ?? "Ciclovia sem nome",
      tipo: r.tipo ?? "Ciclovia",
      extensao: Number(r.extensao ?? 0),
    },
    geometry: typeof r.geometry === "string"
      ? JSON.parse(r.geometry)
      : r.geometry,
  })) as CicloviaFeature[];
}