/**
 *
 * type NodeHeap = Heap<Pair<string,number>>
 *
 * type DkOps = {
 *   heapify: Array<A> -> Heap<A>,
 *   extractMin: Heap<A> -> Pair<A, Heap<A>>,
 *   insert: (Heap<A>, A) -> Heap<A>,
 *   remove: (Heap<A>, string|number) -> Heap<A>,
 *   valueAt: (Heap<A>, string|number) -> Heap<A>
 * }
 *
 * type DkAcc = {
 *   distance: number,
 *   unvisited: NodeHeap
 * }
 *
 * */

import { edges } from '../../graph/graph';

// (Graph, DkAcc) -> Int
export const shortestPath = (graph, ops, end) => (acc) => {
  const [[nodeId, edgeLen], unvisited_] = ops.extractMin(acc.unvisited);
  const newDist = acc.distance + edgeLen;
  return nodeId === end ?
    newDist :
    shortestPath(graph, ops, end)({
      distance: newDist,
      unvisited: edges(graph, nodeId).reduce((unvisited__, edge) =>
        findShorter(ops)(unvisited__, edge), unvisited_)
    })
};

// (NodeHeap, Edge) => NodeHeap
export const findShorter = ops => (heap, edge) =>
  edge.weight > ops.valueAt(heap, edge.id) ?
    heap :
    ops.insert(ops.remove(heap, edge.id), [edge.id, edge.weight]);


/**
 *
 * gloss:
 *
 * 24:
 *   - curry underlying graph, heap operations, and path end, which will remain constant
 *   - maintain a minHeap of unvisited nodes and the shortest edge "across the frontier" from visited nodes to an unvisted one
 *
 * at every iteration:
 *
 * 25: retrieve the length of the shortest edge across the frontier with with an `extractMin` operation on the `visited` minHeap
 * 26: add the length of the shortest path "across the frontier" to the shortest path accumulator field
 * 27: if we've arrived at the end of the path, return this new distance
 * 29: otherwise, look for new shorter edges "across the frontier" and recur with new values for the shortestPath and minHeap
 *
 * to find new shorter edges (and modify the minHeap):
 *
 * 31 -> 37:
 *   - inspect all outgoing edges from this newly added node across the new "frontier"
 *   - if the sum of the current shortest path plus the length of any edge leading from this node
 *     is shorter than the value stored in the minHeap for that node:
 *     - remove that node's old entry in the minHeap, and replace it with the new, shorter one
 *   - otherwise keep the same entry in the minHeap and continue
 * */