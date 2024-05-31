// dijkstra.js
export function dijkstra(graph, startNode) {
  const distances = {};
  const visited = {};
  const queue = new Set();

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
    queue.add(node);
  });

  distances[startNode] = 0;

  while (queue.size) {
    const currentNode = Array.from(queue).reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );

    queue.delete(currentNode);
    visited[currentNode] = true;

    Object.keys(graph[currentNode]).forEach((neighbor) => {
      if (!visited[neighbor]) {
        const newDist = distances[currentNode] + graph[currentNode][neighbor];
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
        }
      }
    });
  }

  return distances;
}
