/**
 * The shape of a Graph is defined as follows (using flow notation):
 *
 * type Graph = { [key: string]: Node }
 * type Node = { node: string, edges: { [key:string]: Edge }
 * type Edge = { [key: string]: id: string, weight: number }
 *
 */

import { values } from '../collection/util/object';

// (Graph, String) -> Node
export const node = (g, id) => g[id];

// (Graph, String) -> Array<Edge>
export const edges = (g, id) => values(g[id].edges);
