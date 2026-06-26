import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CicloviaProxima } from "../types";

interface Props {
  item: CicloviaProxima;
  onPress: (item: CicloviaProxima) => void;
}

export function CicloviaCard({ item, onPress }: Props) {
  const { nome, tipo, extensao } = item.feature.properties;
  const distancia = item.distancia_m < 1000
    ? `${Math.round(item.distancia_m)}m`
    : `${(item.distancia_m / 1000).toFixed(1)}km`;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <View style={styles.header}>
        <Text style={styles.nome} numberOfLines={1}>{nome}</Text>
        <Text style={styles.distancia}>{distancia}</Text>
      </View>
      <Text style={styles.sub}>{tipo} • {extensao}m de extensão</Text>
      <Text style={styles.acao}>Toque para salvar no histórico →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nome: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 8,
  },
  distancia: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2e7d32",
  },
  sub: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  acao: {
    fontSize: 11,
    color: "#aaa",
  },
});