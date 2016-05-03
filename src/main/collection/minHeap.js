/**
*
* type Heap<A> = {
*   queue: Array<A>,
*   positions: { [id: string|number]: number }
* }
*
* **/

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


// (A -> B, (A,A) -> Int) -> Array<A> -> Heap<A>
export const heapify = (getKey, compare) => arr => {
  const queue = [...arr].sort(compare);
  return {
    queue: queue,
    positions: queue.reduce((acc,item, index) =>({
      ...acc,
      [getKey(item)]: index
    }), {})
  };
};

// (A -> B, (A,A) -> Int) -> Heap<A> -> Pair<A, Heap<A>>
export const extractMin = (getKey, compare) => heap =>[
  heap.queue[0],
  heapify(getKey, compare)(heap.queue.slice(1))
];

// (A -> B, (A,A) -> Int) -> (Heap<A>, A) -> Heap<A>
export const insert = (getKey, compare) => (heap, item) =>
  heapify(getKey, compare)([item].concat(heap.queue));

// (A -> B, (A,A) -> Int) -> (Heap<A>, [String|Int]) -> Heap<A>
export const remove = (getKey, compare) => (heap, id) => {
  const pos = heap.positions[id];
  return heapify(getKey, compare)(heap.queue.slice(0,pos).concat(heap.queue.slice(pos + 1)))
};

// (A -> B, (A,A) -> Int) -> (Heap<A>, [String|Int], A) -> Heap<A>
export const update = (getKey, compare) => (heap, id, value) => {
  const [ins, rem] = [insert, remove].map(op => op(getKey, compare));
  return ins(rem(heap, id), value);
};

// (A -> B) -> (Heap<A>, [String|Int]) -> A
export const valueAt = getValue => (heap, id) =>
  getValue(heap.queue[heap.positions[id]]);


