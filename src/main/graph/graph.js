/**
 * The shape of a Graph is defined as follows (using flow notation):
 *
 * type Graph = { [key: string]: Node }
 * type Node = { node: string, edges: { [key:string]: Edge }
 * type Edge = { [key: string]: id: string, weight: number }
 *
 */

import { values } from '../collection/object';

import { distance as _distance } from './distance';

export const metrics = {
  hops: 'hops',
  distance: 'distance'
};

// (Graph, String) -> Node
export const node = (g, id) => g[id];

// (Graph, String) -> Array<Edge>
export const edges = (g, id) => values(g[id].edges);

// (Graph, [Node]) -> Either[String,Int]
export const distance = (graph, route) => _distance(graph, route);

// Enum['hops'|'distance'] -> (Graph, Int, Node, Node) -> Int
export const routesShorterThan = metric => (graph, len, start, end) => -1;

// Enum['hops'|'distance'] -> (Graph, Int, Node, Node) -> Int
export const routesEqualTo = metric => (graph, len, start, end) => -1;

// (Graph, Node, Node) -> Int
export const shortestPath = (graph, start, end) => -1;