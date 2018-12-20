import fetch from "node-fetch"

const API_ENDPOINT = 'https://canboat.cape.io/index.json'

const sendJson = data => ({
  statusCode: 200,
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  }
})
export function handler(event, context) {
  const key = event.queryStringParameters.pgn;

  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(info => info.PGNs[key])
    .then(sendJson)
    .catch(error => ({ statusCode: 422, body: String(error) }));
}
