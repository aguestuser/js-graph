/**
 * The shape of a Graph is defined as follows:
 *
 * (using flow notation)
 *
 * type Graph = { [key: string]: Node }
 * type Node = { node: string, edges: { [key:string]: Edge }
 * type Edge = { [key: string]: nodeId: string, weight: number }
 *
 */