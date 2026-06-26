import { useState, useEffect } from "react";
import * as Location from "expo-location";

interface LocationState {
  lat: number | null;
  lng: number | null;
  erro: string | null;
  carregando: boolean;
}

export function useLocation(): LocationState {
  const [state, setState] = useState<LocationState>({
    lat: null,
    lng: null,
    erro: null,
    carregando: true,
  });

  useEffect(() => {
    let subscriber: Location.LocationSubscription | null = null;

    async function iniciar() {
      // Solicita permissão de localização ao usuário
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setState({ lat: null, lng: null, erro: "Permissão de localização negada.", carregando: false });
        return;
      }

      // Inicia atualização contínua da posição
      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,   // atualiza a cada 5 segundos
          distanceInterval: 10, // ou a cada 10 metros de deslocamento
        },
        (loc) => {
          setState({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
            erro: null,
            carregando: false,
          });
        }
      );
    }

    iniciar();

    // Limpa o subscriber ao desmontar o componente
    return () => { subscriber?.remove(); };
  }, []);

  return state;
}