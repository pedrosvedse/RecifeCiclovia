import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { MapScreen } from "../screens/MapScreen";
import { ListScreen } from "../screens/ListScreen";
import { HistoryScreen } from "../screens/HistoryScreen";

const Tab = createBottomTabNavigator();

// Ícones em texto simples — troque por expo/vector-icons se quiser
function Icon({ label }: { label: string }) {
  return <Text style={{ fontSize: 20 }}>{label}</Text>;
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#2e7d32",
          tabBarInactiveTintColor: "#999",
          headerStyle: { backgroundColor: "#2e7d32" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
        }}
      >
        <Tab.Screen
          name="Mapa"
          component={MapScreen}
          options={{ tabBarIcon: () => <Icon label="🗺️" />, title: "Ciclovias — Mapa" }}
        />
        <Tab.Screen
          name="Lista"
          component={ListScreen}
          options={{ tabBarIcon: () => <Icon label="📋" />, title: "Ciclovias — Lista" }}
        />
        <Tab.Screen
          name="Histórico"
          component={HistoryScreen}
          options={{ tabBarIcon: () => <Icon label="🕒" />, title: "Histórico" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}