import React from "react";
import { Polyline } from "react-native-maps";
import { CicloviaProxima } from "../types";

interface Props {
  item: CicloviaProxima;
  onPress: (item: CicloviaProxima) => void;
  selecionada?: boolean; // destaca visualmente a ciclovia tocada
}

// Converte coordenadas GeoJSON [lng, lat] para o formato do MapView
function toLatLng(coords: number[][]): { latitude: number; longitude: number }[] {
  return coords.map(([lng, lat]) => ({ latitude: lat, longitude: lng }));
}

export function CicloviaPolyline({ item, onPress, selecionada = false }: Props) {
  const { geometry, properties } = item.feature;

  // Normaliza LineString e MultiLineString para sempre trabalhar com array de linhas
  const linhas: number[][][] =
    geometry.type === "LineString"
      ? [geometry.coordinates as number[][]]
      : (geometry.coordinates as number[][][]);

  return (
    <>
      {linhas.map((linha, idx) => (
        <Polyline
          key={`${properties.id}-${idx}`}
          coordinates={toLatLng(linha)}
          // Verde escuro normal, azul quando selecionada
          strokeColor={selecionada ? "#1565c0" : "#2e7d32"}
          strokeWidth={selecionada ? 6 : 4}
          tappable
          onPress={() => onPress(item)}
          lineDashPattern={selecionada ? undefined : undefined} // pode customizar depois
        />
      ))}
    </>
  );
}