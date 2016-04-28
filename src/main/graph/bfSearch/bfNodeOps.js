/**
 * BfRes is defined as follows (in flow notation):
 *
 * type BfRes = {
 *   path: Array<string>,
 *   hops: { [key: number]: Array<string>
 * }
 */

// (BfRes, Node, Node) -> BfRes
export const identity = (res, tail, head) => res;

// (BfRes, Node, Node) -> BfRes
export const addToPath = (res, tail, head) =>  ({
  ...res,
  path: res.path.concat([head.id])
});

// (BfRes, Node, Node) -> BfRes
export const addToHops = (res, tail, head) => ({
  ...res,
  hops: {
    ...res.hops,
    [head.id]: (res.hops[head.id] || []).concat([parseInt(res.hops[tail.id].slice(-1)[0]) + 1])
  }
});