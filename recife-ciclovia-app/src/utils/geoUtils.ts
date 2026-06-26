// Converte graus para radianos
function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// Distância entre dois pontos (fórmula de Haversine) — retorna metros
export function haversine(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371000; // raio da Terra em metros
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Distância mínima de um ponto a um segmento de reta (lat/lng)
// Percorre cada par de pontos consecutivos do LineString e pega o menor valor
export function distanciaPontoParaLinha(
  lat: number,
  lng: number,
  coordenadas: number[][]  // array de [lng, lat]
): number {
  let minDist = Infinity;

  for (let i = 0; i < coordenadas.length - 1; i++) {
    const [lng1, lat1] = coordenadas[i];
    const [lng2, lat2] = coordenadas[i + 1];

    // Distância para cada extremo do segmento
    const d1 = haversine(lat, lng, lat1, lng1);
    const d2 = haversine(lat, lng, lat2, lng2);

    // Usa o menor dos dois extremos como aproximação do segmento
    minDist = Math.min(minDist, d1, d2);
  }

  return minDist;
}

// Calcula distância mínima para uma feature (suporta LineString e MultiLineString)
export function distanciaParaFeature(
  lat: number,
  lng: number,
  coordinates: number[][] | number[][][],
  tipo: "LineString" | "MultiLineString"
): number {
  if (tipo === "LineString") {
    return distanciaPontoParaLinha(lat, lng, coordinates as number[][]);
  }

  // MultiLineString: calcula para cada linha e retorna o menor
  return Math.min(
    ...(coordinates as number[][][]).map((linha) =>
      distanciaPontoParaLinha(lat, lng, linha)
    )
  );
}