// @ts-check

/**
 * @param {Element | Node} container
 * @return {Node[]}
 */
function findAllNodes (container, nodes = [container]) {
  const childNodes = Array.from(container.childNodes)

  childNodes.forEach((node) => nodes.push(node))

  if ("shadowRoot" in container && container.shadowRoot) {
    nodes.push(container.shadowRoot)
    findAllNodes(container.shadowRoot, nodes)
  }

  childNodes.forEach((node) => {
    findAllNodes(node, nodes)
  })

  return nodes
}

/**
 * @param {ShadowRoot | Element} container
 * @param {Array<ShadowRoot | Element>} nodes
 * @return {Array<ShadowRoot | Element>}
 */
function findAllElements (container, nodes = []) {
  nodes.push(container)

  const childElements = Array.from(container.children)

  childElements.forEach((node) => nodes.push(node))

  if ("shadowRoot" in container && container.shadowRoot) {
    findAllElements(container.shadowRoot, nodes)
  }

  childElements.forEach((node) => {
    findAllElements(node, nodes)
  })

  return nodes
}

export {
  findAllNodes,
  findAllElements,
}
