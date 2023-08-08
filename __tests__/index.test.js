import { assert } from "@esm-bundle/chai"
import { findAllNodes, findAllElements } from '../exports/index.js'
import { fixture } from "@open-wc/testing-helpers"
import { CustomElement, ShadowRoot2, ShadowRoot3 } from "./fixtures/components.js"

customElements.define("custom-element", CustomElement)
customElements.define("shadow-root-2", ShadowRoot2)
customElements.define("shadow-root-3", ShadowRoot3)

test("Should grab all nodes", async () => {
  const el = await fixture("<custom-element></custom-element>")

  assert(findAllNodes(el).length < findAllNodes(document).length)
  assert.equal(findAllNodes(el).length, 4)
})

test("Should grab all nodes 2 levels deep", async () => {
  const el = await fixture("<shadow-root-2></shadow-root-2>")

  assert(findAllNodes(el).length < findAllNodes(document).length)
  assert.equal(findAllNodes(el).length, 9)
})

test("Should grab all nodes 3 levels deep", async () => {
  const el = await fixture("<shadow-root-3></shadow-root-3>")

  assert(findAllNodes(el).length < findAllNodes(document).length)
  assert.equal(findAllNodes(el).length, 12)
})

test("Should grab the number of elements based on max shadow depth", async () => {
  const el = await fixture("<shadow-root-3></shadow-root-3>")

  assert.equal(findAllNodes(el, 1).length, 4)
  assert.equal(findAllNodes(el, 2).length, 9)
  assert.equal(findAllNodes(el, 3).length, 12)
})

// Find all elements

test("Should grab all elements", async () => {
  const el = await fixture("<custom-element></custom-element>")

  assert(findAllElements(el).length < findAllElements(document).length)
  assert.equal(findAllElements(el).length, 3)
})

test("Should grab all elements 2 levels deep", async () => {
  const el = await fixture("<shadow-root-2></shadow-root-2>")

  assert(findAllElements(el).length < findAllElements(document).length)
  assert.equal(findAllElements(el).length, 6)
})

test("Should grab all elements 3 levels deep", async () => {
  const el = await fixture("<shadow-root-3></shadow-root-3>")

  assert(findAllElements(el).length < findAllElements(document).length)
  assert.equal(findAllElements(el).length, 8)
})

test("Should grab the number of elements based on max shadow depth", async () => {
  const el = await fixture("<shadow-root-3></shadow-root-3>")

  assert.equal(findAllElements(el, 1).length, 3)
  assert.equal(findAllElements(el, 2).length, 6)
  assert.equal(findAllElements(el, 3).length, 8)
})

