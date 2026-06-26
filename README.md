# RecifeCiclovia — App Mobile

Aplicativo desenvolvido como projeto acadêmico da disciplina de Desenvolvimento Mobile. Consome dados da malha cicloviária do Recife e cruza com a geolocalização do usuário em tempo real.

## Tecnologias

- React Native + Expo SDK 56
- TypeScript
- React Navigation (Bottom Tabs)
- expo-location
- react-native-maps
- Axios

## Funcionalidades

- Mapa interativo com polilinhas das ciclovias próximas ao usuário
- Lista ordenada por distância com opção de salvar no histórico
- Tela de histórico com todas as interações registradas no backend
- Geolocalização em tempo real com atualização automática

## Como rodar

```bash
npm install
npx expo start --clear
```

Escaneie o QR Code com o app **Expo Go** no celular.

> ⚠️ Troque o IP em `src/services/backendApi.ts` pelo IP da sua máquina na rede local.

## Estrutura

```
src/
├── components/    # CicloviaCard, CicloviaPolyline
├── screens/       # MapScreen, ListScreen, HistoryScreen
├── services/      # backendApi, cicloviasApi
├── hooks/         # useLocation
├── navigation/    # AppNavigator
├── mocks/         # cicloviasMock
├── types/         # index.ts
└── utils/         # geoUtils
```
