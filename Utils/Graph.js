// graph.js
import { haversineDistance } from "./Utils";

export function createGraph(stops) {
  const graph = {};
  stops.forEach((stop, i) => {
    graph[i] = {};
    stops.forEach((otherStop, j) => {
      if (i !== j) {
        const distance = haversineDistance(
          stop.lat,
          stop.lon,
          otherStop.lat,
          otherStop.lon
        );
        graph[i][j] = distance;
      }
    });
  });
  return graph;
}
