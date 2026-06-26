import React, { useEffect, useState, useCallback } from "react";
import {
  View, Text, FlatList, StyleSheet,
  ActivityIndicator, RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getHistorico } from "../services/backendApi";
import { HistoricoRecord } from "../types";

export function HistoryScreen() {
  const [historico, setHistorico] = useState<HistoricoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function carregar() {
    try {
      const dados = await getHistorico();
      setHistorico(dados);
    } catch {
      // silencia — lista fica vazia
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Recarrega sempre que a aba ganhar foco
  useFocusEffect(useCallback(() => { carregar(); }, []));

  function formatarData(ts: string): string {
    return new Date(ts).toLocaleString("pt-BR");
  }

  function formatarDistancia(m: number): string {
    return m < 1000 ? `${Math.round(m)}m` : `${(m / 1000).toFixed(1)}km`;
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <FlatList
      data={historico}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={historico.length === 0 ? styles.center : styles.list}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => { setRefreshing(true); carregar(); }}
          colors={["#2e7d32"]}
        />
      }
      ListHeaderComponent={
        historico.length > 0
          ? <Text style={styles.header}>{historico.length} interação(ões) registrada(s)</Text>
          : null
      }
      ListEmptyComponent={
        <Text style={styles.vazio}>Nenhuma interação registrada ainda.{"\n"}Toque em uma ciclovia no mapa ou na lista.</Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.nome} numberOfLines={1}>{item.nome}</Text>
            <Text style={styles.distancia}>{formatarDistancia(item.distancia_m)}</Text>
          </View>
          <Text style={styles.coords}>
            {item.lat.toFixed(5)}, {item.lng.toFixed(5)}
          </Text>
          <Text style={styles.timestamp}>{formatarData(item.timestamp)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  header: { fontSize: 13, color: "#888", paddingHorizontal: 16, paddingBottom: 8 },
  vazio: { fontSize: 14, color: "#999", textAlign: "center", lineHeight: 22 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nome: { fontSize: 15, fontWeight: "600", color: "#1a1a1a", flex: 1, marginRight: 8 },
  distancia: { fontSize: 14, fontWeight: "700", color: "#2e7d32" },
  coords: { fontSize: 11, color: "#aaa", marginBottom: 2 },
  timestamp: { fontSize: 11, color: "#bbb" },
});