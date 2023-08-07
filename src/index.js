// @ts-check

/**
 * @param {Element | Node} container
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

function findAllElements () {
}

export { findAllNodes, findAllElements }
