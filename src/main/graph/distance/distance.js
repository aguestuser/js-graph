'use strict';

const ROUTE_ERROR_MSG = 'NO SUCH ROUTE';

// (Graph, [Node]) -> Either[String, Int]
export const distance = (graph, route) => {
  const acc0 = { tailId: route[0], distance: 0 }; // first node in route is tail of first edge to measure, distance measured so far is 0
  try {
    return route.slice(1)
      .reduce((acc, headId) =>({
        tailId: headId, // make current head node tail node in next iteration
        distance: acc.distance + edgeDistance(graph[acc.tailId], headId) // increment by distance from tail to head (or throw)
      }), acc0).distance; // return only distance portion of accumulator
  } catch (e) {
    return ROUTE_ERROR_MSG; // or handle error
  }
};

// (Node, String) -> Either[undefinded, Int]
const edgeDistance = (tail, headId) => tail.edges[headId].weight; // will throw if head unconnected to tail
