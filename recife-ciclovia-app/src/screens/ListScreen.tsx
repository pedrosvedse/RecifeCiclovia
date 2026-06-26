import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, StyleSheet,
  Alert, ActivityIndicator, RefreshControl,
} from "react-native";
import { useLocation } from "../hooks/useLocation";
import { getCiclovias, postHistorico } from "../services/backendApi";
import { distanciaParaFeature } from "../utils/geoUtils";
import { CicloviaCard } from "../components/CicloviaCard";
import { CicloviaFeature, CicloviaProxima } from "../types";

const RAIO_METROS = 5000;

export function ListScreen() {
  const { lat, lng, carregando } = useLocation();
  const [proximas, setProximas] = useState<CicloviaProxima[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function carregar() {
    try {
      const dados = await getCiclovias();
      const features: CicloviaFeature[] = dados.map((c: any) => ({
        type: "Feature",
        properties: { id: c.id, nome: c.nome, tipo: c.tipo, extensao: c.extensao },
        geometry: { type: "LineString", coordinates: c.coordinates },
      }));

      if (lat === null || lng === null) return;

      const resultado: CicloviaProxima[] = features
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
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as ciclovias.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    if (!carregando && lat !== null) carregar();
  }, [carregando, lat]);

  async function handleSalvar(item: CicloviaProxima) {
    if (lat === null || lng === null) return;
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

  if (loading || carregando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.sub}>Buscando ciclovias próximas...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={proximas}
      keyExtractor={(item) => item.feature.properties.id}
      contentContainerStyle={proximas.length === 0 ? styles.center : styles.list}
      renderItem={({ item }) => (
        <CicloviaCard item={item} onPress={handleSalvar} />
      )}
      ListHeaderComponent={
        proximas.length > 0
          ? <Text style={styles.header}>{proximas.length} ciclovia(s) próxima(s)</Text>
          : null
      }
      ListEmptyComponent={
        <Text style={styles.vazio}>
          Nenhuma ciclovia encontrada num raio de {RAIO_METROS}m.
        </Text>
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => { setRefreshing(true); carregar(); }}
          colors={["#2e7d32"]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  header: { fontSize: 13, color: "#888", paddingHorizontal: 16, paddingBottom: 8 },
  vazio: { fontSize: 14, color: "#999", textAlign: "center" },
  sub: { color: "#555", fontSize: 13, marginTop: 8 },
});