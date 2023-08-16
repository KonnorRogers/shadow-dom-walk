// @ts-check

/**
 * @typedef {Element | DocumentFragment | ShadowRoot | Node} NodesContainer
 * @typedef {DocumentFragment | ShadowRoot | Element} ElementsContainer
 */

/**
 * @param {NodesContainer} container
 * @return {Node[]}
 */
export function findAllNodes (container, maxDepth = Infinity) {
  return walk(container, maxDepth, "childNodes")
}

/**
 * @param {ElementsContainer} container
 * @param {Number} maxDepth
 * @return {Array<ElementsContainer>}
 */
export function findAllElements (container, maxDepth = Infinity) {
  return walk(container, maxDepth, "children")
}

// Private


/**
 * @template [T=Array<Node>]
 * @param {ElementsContainer | NodesContainer} container
 * @param {number} maxDepth
 * @param {"children" | "childNodes"} propertyKey
 * @param {number} shadowRootDepth
 * @return {T}
 */
function walk (container, maxDepth, propertyKey, shadowRootDepth = 0) {
  /**
   * @type {Array<Node>}
   */
  let nodes = []

  nodes.push(container)

  // @ts-expect-error
  const children = Array.from(container[propertyKey])

  if ("shadowRoot" in container && container.shadowRoot) {
    if (shadowRootDepth < maxDepth) {
      shadowRootDepth++

      nodes = nodes.concat(walk(container.shadowRoot, maxDepth, propertyKey, shadowRootDepth))
    }
  }

  children.forEach((node) => {
    nodes = nodes.concat(walk(node, maxDepth, propertyKey, shadowRootDepth))
  })


  return /** @type {T} */ (nodes)
}
