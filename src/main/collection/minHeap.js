/**
*
* type Heap<A> = {
*   queue: Array<A>,
*   positions: { [id: String]: number }
* }
*
* **/

import { identity } from '../../main/util/function';

/**
 *
 * NOTE:
 *
 * This implementation is intended as a PLACEHOLDER for
 * use as scaffolding while implementing Dijkstra's algorithm.
 *
 * It provides standard heap operations and preserves heap properties.
 * BUT: it has significantly poorer running time than a proper
 * heap implementation using 'bubble-up' and 'bubble-down' operations
 * for `extractMin`, `insert` and `delete` (Ie: O(n log n)) and
 * batch insert for `minHeapify` (O(n) v. O(n log n).
 *
 * This implementation is suitable for small graphs like those provided in
 * the problem statement, but for large graphs, it will severely impact
 * the running time of shortest path operations -- ie: O(n^2) v. O(n log n).
 * For now, correctly finding shortest path is higher priority than
 * optimizing for performance, so I'm willing to make the compromise.
 *
 * Time permitting, I want to circle back to implement MinHeap properly.
 * Time not permitting, hopefully this gloss helps explain the choice.
 *
 * */


// (Array<A>, A -> B, (A,A) -> Boolean) -> Heap<A>
export const heapify = (arr, getKey=identity, compare) => {
  const queue = [...arr].sort(compare);
  return {
    queue: queue,
    positions: queue.reduce((acc,item, index) =>({
      ...acc,
      [getKey(item)]: index
    }), {})
  };
};

// Heap<A> -> Pair<A, Heap<A>>
export const extractMin = (heap, getKey=identity, compare) =>[
  heap.queue[0],
  heapify(heap.queue.slice(1), getKey, compare)
];

// (A, Heap<A>) -> [A]
export const insert = (item, heap, getKey=identity, compare) =>
  heapify([item].concat(heap.queue), getKey, compare);

// [A] -> [A]
export const remove = (item, heap, getKey=identity, compare) => {
  const pos = heap.positions[getKey(item)];
  const q_ = heap.queue.slice(0,pos).concat(heap.queue.slice(pos + 1));
  return heapify(q_, getKey, compare);
};

