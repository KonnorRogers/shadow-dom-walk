// @ts-check

// function findAllNodes (container, nodes = [container]) {

/**
 * @param {Element | Node} container
 * @return {Node[]}
 */
export function findAllNodes (container, maxDepth = Infinity) {
  return walkAllNodes(container, maxDepth)
}


/**
 * @param {ShadowRoot | Element} container
 * @param {Number} maxDepth
 * @return {Array<ShadowRoot | Element>}
 */
export function findAllElements (container, maxDepth = Infinity) {
  return walkAllElements(container, maxDepth)
}


// Private

/**
  * @param {Element | Node} container
  * @param {Number} shadowRootDepth
  * @param {Number} maxDepth
  * @return {Node[]}
  */
function walkAllNodes (container, maxDepth, shadowRootDepth = 0) {
  /**
   * @type {Node[]}
   */
  let nodes = []

  nodes.push(container)

  const childNodes = Array.from(container.childNodes)

  if ("shadowRoot" in container && container.shadowRoot) {
    if (shadowRootDepth < maxDepth) {
      shadowRootDepth++
      nodes = nodes.concat(walkAllNodes(container.shadowRoot,  maxDepth, shadowRootDepth))
    }
  }

  childNodes.forEach((node) => {
    nodes = nodes.concat(walkAllNodes(node, maxDepth, shadowRootDepth))
  })


  return nodes
}

/**
  * @param {Element | ShadowRoot} container
  * @param {Number} shadowRootDepth
  * @param {Number} maxDepth
  * @return {Array<Element | ShadowRoot>}
  */
function walkAllElements (container, maxDepth, shadowRootDepth = 0) {
  /**
   * @type {Array<Element | ShadowRoot>}
   */
  let nodes = []

  nodes.push(container)

  const children = Array.from(container.children)

  if ("shadowRoot" in container && container.shadowRoot) {
    if (shadowRootDepth < maxDepth) {
      shadowRootDepth++
      nodes = nodes.concat(walkAllElements(container.shadowRoot,  maxDepth, shadowRootDepth))
    }
  }

  children.forEach((node) => {
    nodes = nodes.concat(walkAllElements(node, maxDepth, shadowRootDepth))
  })


  return nodes
}
