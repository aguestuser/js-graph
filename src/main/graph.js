/**
 * The shape of a Graph is defined as follows (using flow notation):
 *
 * type Graph = { [key: string]: Node }
 * type Node = { node: string, edges: { [key:string]: Edge }
 * type Edge = { [key: string]: nodeId: string, weight: number }
 *
 */

// (Graph, [Node]) -> Int
export const distance = (graph, route) => -1;

// (Graph, Node, Node, Any -> Boolean) -> Either[String,Int]
export const numRoutes = (graph, start, end, pred) => -1;

// (Graph, Node, Node) -> Int
export const shortestPath = (graph, start, end) => -1;