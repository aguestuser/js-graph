/**
 * The shape of a Graph is defined as follows:
 *
 * Object[String, Object[String, Int]]
 *
 * ie: an object (map) with:
 * - top-level keys representing node labels
 * - top-level values representing a collection of neighbors adjacent to the node labeled by the corresponding key
 * - once-nested keys representing neighboring node labels
 * - once-nested values representing edge weights
 *
 * TODO: use flow to formalize this type?
 *
 */