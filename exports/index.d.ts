/**
 * @param {Element | Node} container
 * @return {Node[]}
 */
export function findAllNodes(container: Element | Node, nodes?: (Element | Node)[]): Node[];
/**
 * @param {ShadowRoot | Element} container
 * @param {Array<ShadowRoot | Element>} nodes
 * @return {Array<ShadowRoot | Element>}
 */
export function findAllElements(container: ShadowRoot | Element, nodes?: Array<ShadowRoot | Element>): Array<ShadowRoot | Element>;
