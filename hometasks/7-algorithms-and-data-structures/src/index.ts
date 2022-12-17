import { Vertex, Edge, WeightedGraph } from './classes.js';

const vertices = [
    new Vertex('A'),
    new Vertex('B'),
    new Vertex('C'),
    new Vertex('D'),
    new Vertex('E'),
    new Vertex('F'),
    new Vertex('G')
  ];
   const edges = [
    new Edge(vertices[0], vertices[1], 4),
    new Edge(vertices[0], vertices[2], 3),
    new Edge(vertices[0], vertices[4], 7),
    new Edge(vertices[1], vertices[2], 6),
    new Edge(vertices[1], vertices[3], 5),
    new Edge(vertices[2], vertices[3], 11),
    new Edge(vertices[2], vertices[4], 8),
    new Edge(vertices[3], vertices[4], 2),
    new Edge(vertices[3], vertices[5], 2),
    new Edge(vertices[3], vertices[6], 10),
    new Edge(vertices[4], vertices[6], 5),
    new Edge(vertices[5], vertices[6], 3)
  ];
  const graph: WeightedGraph = new WeightedGraph();

  vertices.forEach(verticle => graph.addVertex(verticle));
  edges.forEach(edge => graph.addEdge(edge.firstVertex, edge.secondVertex, edge.weight));

  console.log(graph.findShortestPath(vertices[0], vertices[5]));

  console.log(graph.findAllShortestPaths(vertices[0]));
