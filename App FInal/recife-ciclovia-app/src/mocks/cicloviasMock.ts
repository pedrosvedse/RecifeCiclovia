import { CicloviaFeature } from "../types";

export const cicloviasMock: CicloviaFeature[] = [
  {
    type: "Feature",
    properties: {
      id: "mock_001",
      nome: "Ciclofaixa Av. Boa Viagem",
      tipo: "Ciclofaixa",
      extensao: 7200,
    },
    geometry: {
      type: "LineString",
      coordinates: [
        [-34.8953, -8.1075],
        [-34.8942, -8.1098],
        [-34.8931, -8.1121],
        [-34.8920, -8.1144],
        [-34.8910, -8.1167],
        [-34.8900, -8.1190],
        [-34.8890, -8.1213],
        [-34.8880, -8.1236],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "mock_002",
      nome: "Ciclovia Av. Agamenon Magalhães",
      tipo: "Ciclovia",
      extensao: 3400,
    },
    geometry: {
      type: "LineString",
      coordinates: [
        [-34.9050, -8.0630],
        [-34.9045, -8.0638],
        [-34.9038, -8.0648],
        [-34.9030, -8.0661],
        [-34.9022, -8.0673],
        [-34.9015, -8.0685],
        [-34.9008, -8.0697],
        [-34.9001, -8.0710],
        [-34.8994, -8.0722],
        [-34.8987, -8.0735],
        [-34.8980, -8.0748],
        [-34.8973, -8.0760],
        [-34.8966, -8.0772],
        [-34.8959, -8.0784],
        [-34.8952, -8.0796],
        [-34.8945, -8.0808],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "mock_003",
      nome: "Ciclofaixa Derby / Salgadinho",
      tipo: "Ciclofaixa",
      extensao: 2100,
    },
    geometry: {
      type: "LineString",
      coordinates: [
        [-34.9020, -8.0558],
        [-34.9014, -8.0562],
        [-34.9007, -8.0567],
        [-34.9000, -8.0572],
        [-34.8993, -8.0578],
        [-34.8986, -8.0584],
        [-34.8979, -8.0590],
        [-34.8972, -8.0597],
        [-34.8965, -8.0604],
        [-34.8958, -8.0611],
        [-34.8951, -8.0618],
        [-34.8944, -8.0625],
      ],
    },
  },
];