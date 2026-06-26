import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, Alert, ActivityIndicator,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { useLocation } from "../hooks/useLocation";
import { getCiclovias, postHistorico } from "../services/backendApi";
import { distanciaParaFeature } from "../utils/geoUtils";
import { CicloviaFeature, CicloviaProxima } from "../types";

const RAIO_METROS = 5000;

export function MapScreen() {
  const { lat, lng, carregando, erro } = useLocation();
  const [todasCiclovias, setTodasCiclovias] = useState<CicloviaFeature[]>([]);
  const [proximas, setProximas] = useState<CicloviaProxima[]>([]);
  const [selecionadaId, setSelecionadaId] = useState<string | null>(null);
  const [loadingApi, setLoadingApi] = useState(true);

  // Busca ciclovias do backend uma vez ao montar
  useEffect(() => {
    getCiclovias()
      .then((dados: any[]) => {
        const features: CicloviaFeature[] = dados.map((c) => ({
          type: "Feature",
          properties: { id: c.id, nome: c.nome, tipo: c.tipo, extensao: c.extensao },
          geometry: { type: "LineString", coordinates: c.coordinates },
        }));
        setTodasCiclovias(features);
      })
      .catch(() => Alert.alert("Erro", "Não foi possível carregar as ciclovias."))
      .finally(() => setLoadingApi(false));
  }, []);

  // Filtra por proximidade sempre que posição ou dados mudarem
  useEffect(() => {
    if (lat === null || lng === null || todasCiclovias.length === 0) return;

    const resultado: CicloviaProxima[] = todasCiclovias
      .map((feature) => ({
        feature,
        distancia_m: distanciaParaFeature(
          lat, lng,
          feature.geometry.coordinates,
          feature.geometry.type
        ),
      }))
      .filter((c) => c.distancia_m <= RAIO_METROS)
      .sort((a, b) => a.distancia_m - b.distancia_m);

    setProximas(resultado);
  }, [lat, lng, todasCiclovias]);

  async function handlePolylinePress(item: CicloviaProxima) {
    if (lat === null || lng === null) return;
    setSelecionadaId(item.feature.properties.id);
    try {
      await postHistorico({
        lat, lng,
        ciclovia_id: item.feature.properties.id,
        nome: item.feature.properties.nome,
        distancia_m: item.distancia_m,
      });
      Alert.alert("Salvo!", `${item.feature.properties.nome} adicionada ao histórico.`);
    } catch {
      Alert.alert("Erro", "Não foi possível salvar no histórico.");
    }
  }

  function toLatLng(coords: number[][]): { latitude: number; longitude: number }[] {
    return coords.map(([lng, lat]) => ({ latitude: lat, longitude: lng }));
  }

  if (carregando || loadingApi) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.sub}>
          {carregando ? "Obtendo localização..." : "Carregando ciclovias..."}
        </Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.center}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat ?? -8.0631,
          longitude: lng ?? -34.8711,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        {proximas.map((item) => {
          const { geometry, properties } = item.feature;
          const linhas: number[][][] =
            geometry.type === "LineString"
              ? [geometry.coordinates as number[][]]
              : (geometry.coordinates as number[][][]);

          return linhas.map((linha, idx) => (
            <Polyline
              key={`${properties.id}-${idx}`}
              coordinates={toLatLng(linha)}
              strokeColor={selecionadaId === properties.id ? "#1565c0" : "#2e7d32"}
              strokeWidth={selecionadaId === properties.id ? 6 : 4}
              tappable
              onPress={() => handlePolylinePress(item)}
            />
          ));
        })}

        {lat && lng && (
          <Marker
            coordinate={{ latitude: lat, longitude: lng }}
            title="Você está aqui"
            pinColor="#1565c0"
          />
        )}
      </MapView>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {proximas.length} ciclovia(s) no mapa
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  sub: { color: "#555", fontSize: 14 },
  erro: { color: "red", fontSize: 14, textAlign: "center", paddingHorizontal: 24 },
  badge: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#2e7d32",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
  },
  badgeText: { color: "#fff", fontWeight: "600", fontSize: 13 },
});