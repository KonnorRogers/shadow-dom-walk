// @ts-check

/**
 * @typedef {Element | DocumentFragment | ShadowRoot | Node} NodesContainer
 * @typedef {Document | DocumentFragment | ShadowRoot | Element} ElementsContainer
 */

/**
 * @typedef {object} Options
 * @property {number} [maxDepth=Infinity]
 * @property {boolean} [flat=true]
 */

/**
 * @typedef {object} WalkOptions
 * @property {number} [maxDepth=Infinity]
 * @property {number} [currentDepth=0]
 * @property {"children" | "childNodes"} propertyKey

/**
 * @param {NodesContainer} container
 * @param {Options} options
 * @return {Array<Node> | Array<Node | Array<Node>>}
 */
export function findAllNodes (container, { maxDepth, flat } = { maxDepth: Infinity, flat: true }) {
  /**
   * @type {Array<Node | Array<Node>>}
   */
  const elements = [...walk(container, { maxDepth, propertyKey: "childNodes" })]

  if (flat) {
    /**
     * @type {Array<Node>}
     */
    return elements.flat(Infinity)
  }

  return elements
}

/**
 * @param {ElementsContainer} container
 * @param {Options} options
 * @return {Array<ElementsContainer> | Array<ElementsContainer | Array<ElementsContainer>>}
 */
export function findAllElements (container, { maxDepth, flat } = { maxDepth: Infinity, flat: true }) {
  /**
   * @type {Array<ElementsContainer | Array<ElementsContainer>>}
   */
  // @ts-expect-error
  const elements = [...walk(container, { maxDepth, propertyKey: "children" })]

  if (flat) {
    /**
     * @type {Array<ElementsContainer>}
     */
    return elements.flat(Infinity)
  }

  return elements
}

// Private


/**
 * @template [T=Array<Node>]
 * @param {ElementsContainer | NodesContainer} container
 * @param {WalkOptions} options
 * @return {Generator<T>}
 */
// function* walk (container, options) {
//   let { maxDepth, currentDepth, propertyKey } = options
//
//   if (maxDepth == null) maxDepth = Infinity
//   if (currentDepth == null) currentDepth = 0
//
//   /**
//    * @type {T}
//    */
//   // @ts-expect-error
//   yield [container]
//
//   /**
//    * @type {T}
//    */
//   // @ts-expect-error
//   const children = Array.from(container[propertyKey])
//
//   if ("shadowRoot" in container && container.shadowRoot) {
//     if (currentDepth < maxDepth) {
//       currentDepth++
//
//       yield* walk(container.shadowRoot, { maxDepth, propertyKey, currentDepth })
//     }
//   }
//
//   // @ts-expect-error
//   for (const node of children) {
//     yield* walk(node, { maxDepth, propertyKey, currentDepth })
//   }
// }

/**
 * @template [T=Array<Node>]
 * @param {ElementsContainer | NodesContainer} container
 * @param {WalkOptions} options
 * @return {T}
 */
function walk (container, options) {
  let { maxDepth, currentDepth, propertyKey } = options

  if (maxDepth == null) maxDepth = Infinity
  if (currentDepth == null) currentDepth = 0

  /**
   * @type {Array<ElementsContainer | NodesContainer>}
   */
  let nodes = [container]

  /**
   * @type {T}
   */
  // @ts-expect-error
  const children = Array.from(container[propertyKey])

  if ("shadowRoot" in container && container.shadowRoot) {
    if (currentDepth < maxDepth) {
      currentDepth++

      nodes.push(walk(container.shadowRoot, { maxDepth, propertyKey, currentDepth }))
    }
  }

  // @ts-expect-error
  for (const node of children) {
    nodes.push(walk(node, { maxDepth, propertyKey, currentDepth }))
  }

  return /** @type {T} */ (nodes)
}
