# Run Instructions

This program uses ES2015, which requires either the newest version of node or `babel-cli` to run. To err on the safe side, start by installing `babel-cli` globably with:

```shell
$ npm install -g babel-cli  
```

Then, assuming you have downloaded the repo to `/path/to/repo`, run with:

```shell
$ cd /path/to/repo/src/main
$ babel-node run
```

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

The main loop makes use of a Route Service, which (in a riff on the Facade Pattern) groups and delegates to helper modules for the three types of operations specified in the problem statement: (1) distance calculation, (2) discovering and filtering routes based on number of stops and distance, and (3) discovering the shortest path between two points. In a loose riff on the Adapter Pattern, the more complex graph traversal modules each have interfaces that wrap the underlying algorithm and expose a simpler interface to calling modules.

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

To assist with the above, I implemented a (knowingly non-performant!) version of min-heap, and a functional version of a queue, along with several utility belt functions to make up for the absence of my beloved `lodash`. All of these can be found in `src/main/collection/`.

## Testing

Every module has unit tests. While some modules have cross-dependencies on one another, for expediency's sake, I didn't bother mocking any modules accept for those of the `route` service. Unit tests for the `route` service test only that it delegates to the appropriate sub-modules, while its correctness -- and the correctness of the `run` routine that calls it -- are tested in functional tests.

I tried to generate coverage reports but had quite the headache trying to get either istanbul or nyc to generate correct reports for untranspiled ES6 code, so I gave up. Too bad. The coverage is darn near 100%! ;)

## Justification of a functional style

This implementation is purely functional, which is just to say it contains no mutation, no side effects (aside from printing the results), and preserves referential transparency throughout. One consequence of this choice is the repeated deep cloning of both objects and arrays instead of mutating them. This incurs penalties in both time and space complexity. In production code, I would mitigate these trade-offs by using immutable data structures like those provided by Immutable.js, which leverage structure-sharing to reduce losses in space complexity and in many cases outperform their mutable counterparts with respect to time complexity.
 
Because the implementation is purely functional, it also makes heavy use of contracts and "types" to ensure composabilty of functions and ease of reasoning for the developer. As written, the types exist only in comments, and the contracts exist only in my mind. As such, both are enforced only by my meticulousness in observing them. In production code, I'd like to use a library like Facebook's Flow to perform runtime typechecking and provide a more solid structure than what I have currently written. Though I chose early on to not use this library in the interest of avoiding rabbit holes, I'm fairly certain I would have completed the assignment more quickly with the aid of typechecking side-rails to ward off more than a few late night debugging sessions.

Since the problem statement specifies that skill at object-oriented programming is an assessment criteria, I feel I owe an explanation as to why this solution leans so heavily on functional programming techniques. The most honest answer is that (as the length of time it took me to complete the problem should indicate): I am relatively new to graphs. But I have a fair amount of experience with functional programming. In order to have sure footing while exploring an exciting but challenging new terrain, I chose to use the tools most familiar to me. Having put that notch on my belt, I'd be more than happy to explore how a more object-oriented approach could help solve the same problems -- perhaps even by refactoring this code base! 

With all that said, while I opted for FP over OO at almost every juncture, I made pains to observe the design principles of testability, extensibility, modularity, and readability that are some of the great hallmarks of object-oriented programming, particularly as I have observed it practiced at ThoughtWorks. While my code has no encapsulation, I have tried to create clear interfaces that allow different implementations to be swapped out at a later time. While I have no class heirarchies, I have tried to achieve abstraction and code reuse through currying, function composition, and other techniques. While this may not demonstrate that I have mastery of the specific tools of OO, I hope it demonstrates that I am sympathetic to its aims, and capable of coding in a style that achieves them. 

(I am, of course, *very* open to feedback on this matter. :))

# Summation

Solving this wasn't easy. In fact it's one of the harder things I've taken on in my young programming career. I probably solved a little bit more of it from scratch than I needed to and pushed a little too hard on getting things perfect. That said, I learned an awful lot, and am very grateful for being given the opportunity to explore a problem that touches on so many different aspects of algorithms and data structures that I want to master moving forward in my career. Hopefully it gives us something interesting to discuss, reason about, and transform to something better together.

I'm looking forward to it!