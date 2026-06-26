# RecifeCiclovia — Backend

API REST desenvolvida como projeto acadêmico. Persiste o histórico de interações entre a localização do usuário e a malha cicloviária do Recife.

## Tecnologias

- Node.js
- Express
- Persistência em memória (array)

## Como rodar

```bash
npm install
node server.js
```

## Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Health check |
| GET | `/api/ciclovias` | Lista todas as ciclovias |
| POST | `/api/historico` | Salva interação do usuário |
| GET | `/api/historico` | Retorna histórico completo |

## Exemplo de body para POST `/api/historico`

```json
{
  "lat": -8.0631,
  "lng": -34.8711,
  "ciclovia_id": "mock_001",
  "nome": "Ciclofaixa Av. Boa Viagem",
  "distancia_m": 320.5
}
```
