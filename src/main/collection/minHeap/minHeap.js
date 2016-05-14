/**
*
* type Heap<A> = {
*   queue: Array<A>,
*   positions: { [id: string|number]: number }
* }
*
* **/

import { siftDown, bubbleUp } from './helpers';
import { last } from '../util/array';

// (A -> B, (A,A) -> Int) -> Array<A> -> Heap<A>
export const heapify = (getKey, compare) => xs =>
  xs.reduce((acc,x) =>
    insert(getKey,compare)(acc,x), {queue: [], positions: {} });

// (A -> B, (A,A) -> Int) -> Heap<A> -> Pair<A, Heap<A>>
export const extractMin = (getKey, compare) => heap => {
  const [min,lst] = [ heap.queue[0], last(heap.queue) ];
  const seed = extractMinSeed(getKey)(heap,min,lst);
  return [min, siftDown(getKey,compare)(seed, 0)];
};

// (A -> String) -> (Heap<A>, A, A) -> Heap<A>
const extractMinSeed = getKey => (heap, min, lst) => ({
  queue: [lst].concat(heap.queue.slice(1,-1)),
  positions: Object.keys(heap.positions)
    .filter(k => k !== getKey(min))
    .reduce((acc,k) =>({
      ...acc,
      [k]: k === getKey(lst) ? 0 : heap.positions[k]
    }), {})
});

// (A -> B, (A,A) -> Int) -> (Heap<A>, A) -> Heap<A>
export const insert = (getKey, compare) => (heap, item) => {
  const seed = insertSeed(heap, item, getKey(item));
  return bubbleUp(getKey, compare)(seed, heap.queue.length);
};

const insertSeed = (heap, item, key) => ({
  queue: heap.queue.concat([item]),
  positions: {...heap.positions, [key]: heap.queue.length }
});

// (A -> B, (A,A) -> Int) -> (Heap<A>, [String|Int]) -> Heap<A>
export const remove = (getKey, compare) => (heap, id) => {
  const [pos, lst] = [heap.positions[id], last(heap.queue)];
  const seed = removeSeed(heap, id, pos, lst, getKey(lst));
  return siftDown(getKey,compare)(seed, pos);
};

// (Heap<A>, String, Int, A, lstKey) -> Heap<A>
const removeSeed = (heap, rmKey, rmPos, lst, lstKey) => ({
  queue: heap.queue.slice(0, rmPos)
    .concat([lst])
    .concat(heap.queue.slice(rmPos + 1, -1)),
  positions: {
    ...Object.keys(heap.positions)
      .filter(k => k !== rmKey && k !== lstKey)
      .reduce((acc, k) => ({ ...acc, [k]: heap.positions[k] }), {}),
    [lstKey]: rmPos
  }
});

// (A -> B, (A,A) -> Int) -> (Heap<A>, [String|Int], A) -> Heap<A>
export const update = (getKey, compare) => (heap, id, value) => {
  const [ins, rem] = [insert, remove].map(op => op(getKey, compare));
  return ins(rem(heap, id), value);
};

// (A -> B) -> (Heap<A>, [String|Int]) -> A
export const valueAt = getValue => (heap, id) =>
  getValue(heap.queue[heap.positions[id]]);
