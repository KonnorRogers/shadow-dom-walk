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
export function findAllNodes (container, options = {}) {
  let { maxDepth, flat } = options

  if (maxDepth == null) maxDepth = Infinity
  if (flat == null) flat = true

  /**
   * @type {Array<Node | Array<Node>>}
   */
  const elements = [container].concat(walk(container, { maxDepth, propertyKey: "childNodes" }))

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
export function findAllElements (container, options = {}) {
  let { maxDepth, flat } = options

  if (maxDepth == null) maxDepth = Infinity
  if (flat == null) flat = true
  /**
   * @type {Array<ElementsContainer | Array<ElementsContainer>>}
   */
  const elements = [container].concat(walk(container, { maxDepth, propertyKey: "children" }))

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
 * @return {T}
 */
function walk (container, options) {
  let { maxDepth, currentDepth, propertyKey } = options

  if (maxDepth == null) maxDepth = Infinity
  if (currentDepth == null) currentDepth = 0

  /**
   * @type {Array<ElementsContainer | NodesContainer | Array<ElementsContainer | NodesContainer>>}
   */
  let nodes = []

  /**
   * @type {Array<Node>}
   */
  // @ts-expect-error
  const children = Array.from(container[propertyKey])

  if ("shadowRoot" in container && container.shadowRoot) {
    if (currentDepth < maxDepth) {
      currentDepth++

      nodes.push([container.shadowRoot, walk(container.shadowRoot, { maxDepth, propertyKey, currentDepth })])
    }
  }

  for (const node of children) {
    nodes.push([node, walk(node, { maxDepth, propertyKey, currentDepth })])
  }

  return /** @type {T} */ (nodes)
}
