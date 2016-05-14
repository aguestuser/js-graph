# JS Graph Sandbox

This repo contains implementations of common graph algorithms in JavaScript, using a purely functional style. A Route service provides a common interface for finding routes between nodes satisfying constraints on distance and number of stops, assuming a directed graph with weighted edges representing distances between nodes as input. 

As an exercise, the repo uses no libraries. To optimize it for production, I would add [Immutable.js](https://facebook.github.io/immutable-js/) to mitigate performance penalties for avoiding mutation and [Flow](http://flowtype.org/) to enforce the type contracts which currently exist only as comments.

# Implementation Notes

## Graph Representation

I chose to represent a graph as a map from ids to node records. A node record contains the node's id (which, in this example is the string label for the node) and a map from edge id to edge records, which in turn contains a node id for the edge and its weight. In flow notation:

```javascript
 type Graph = { [key: string]: Node }
 type Node = { node: string, edges: { [key:string]: Edge }
 type Edge = { [key: string]: id: string, weight: number }
```
As opposed to maintaining two separate collections of nodes and edges, this representation is compact, declarative, and provides only the structure needed for graph traversal. As opposed to a plain adjacency list, this representation allows for constant-time lookup of any node or edge during any point of graph traversal, while still providing all information necessary to reason about a node or edge if one of their records is encountered in isolation. Both node and edge records are extensible to allow representation of more complex contents than a string id for nodes and a numeric weight for edges.

An example of what the graph from the problem statement looks like in this format can be found in `src/main/test/support/sampleData.js`

## Execution flow

The main interface into the graph algorithm modules is a Route Service, which (in a riff on the Facade Pattern) groups and delegates to helper modules for three types of operations: (1) distance calculations, (2) discovering and filtering routes based on number of stops and distance, and (3) discovering the shortest path between two points. In a loose riff on the Adapter Pattern, the more complex graph traversal modules each have interfaces that wrap the underlying algorithm and expose a simpler interface to calling modules.

The three categories of problems are solved as such:

1. Distance Calculation

Implemented in `.../graph/distance/distance.js`:

* Reduce over node keys, summing distances retrieved from the underlying graph object.

2. Route Discovery

Implemented in `.../graph/fold/foldInterface.js` and `.../graph/fold/fold.js`:

* Perform a tree-fold over the graph, accumulating routes matching predicates into an accumulator that passes through the fold 
* Consume a structured set of specs that map requirements on hop number and distance to curried predicate functions
* Inject an `ops` object into the fold containing 4 kinds of functions:
  1. __Predicates:__ determine when to stop the fold and when to add a given traversal path to the accumulated list of routes
  2. __Visit Ops:__ determine how to modify the accumulator at any given iteration of the fold
  3. __Traverse Ops:__ increment the path and or distance traversed at any iteration of the fold and provide information for `Visit` ops to compute correctly
  4. __Combine Ops:__ assemble the results of the fold as the recursion returns back up the tree from children to parents
* Use function currying and composition to allow for:
  * an interface that can be extended to compute many different results using the same base fold operation
  * a fluent DSL-like syntax for specifying the desired results of the fold

3. Shortest Path Discovery

Implemented in `.../graph/dijkstra/dijkstraInterface.js`, `.../graph/bfs/bfsInterface.js``.../graph/dijkstra/dijkstra.js`,  and `.../graph/bfs/bfsInterface.js`:

* Pre-processing step: 
  * Use breadth-first search to traverse the graph and accumulate a map from node id to distance from the origin
  * Convert this array into a minHeap of pairs, currying the operations necessary to compare two pairs and extract a key from a pair
* Use this heap to represent the nodes in the graph that have not been visited by Dijkstra's Algorithm -- with the node with the shortest distance from the "frontier" of already-visited nodes always occupying the first position
* pass the minHeap to dijkstra's algorithm, and compute the shortest path through a succession of calls to `extractMin` and `update` which move nodes from an `unvisited` heap to a `visited` map, modifying their "Dijkstra's Greedy Score" as appropriate  

## Collections

To assist with the above, I implemented purely functional versions of min-heap and FIFO queue (which are not optimized for performance!), along with several utility belt functions to substitute for common functions from `lodash`. All of these can be found in `src/main/collection/`.

## Testing

Every module has unit tests. While some modules have cross-dependencies on one another, for expediency's sake, I didn't bother mocking any modules accept for those of the `route` service. Unit tests for the `route` service test only that it delegates to the appropriate sub-mfodules, while its correctness is tested in functional tests.