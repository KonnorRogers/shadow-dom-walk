# Purpose

Sometimes you just wanna walk the DOM and find all the shadow roots and everything in the shadow roots

## Getting Started

```js
npm install shadow-dom-walk
```

## API

### `findAllNodes`

```js
import { findAllNodes } from 'shadow-dom-walk'

// Max number of shadow roots to go down. Default is Infinity.
const maxShadowRootDepth = 3

// Container can be any Node
const container = document

findAllNodes(document, maxShadowRootDepth)
```

### `findAllElements`

```js
import { findAllElements } from 'shadow-dom-walk'

// Max number of shadow roots to go down. Default is Infinity.
const maxShadowRootDepth = 3

// Container can be any Element, DocumentFragment, or ShadowRoot
const container = document

findAllElements(document, maxShadowRootDepth)
```

## Element / Node Order

Elements and Nodes are returned in the order they're discovered via a "depth-first" search.

Example:

```html
<div>
    <my-custom-element>
      #shadowRoot
      <slot></slot>
    </my-custom-element>

    <my-other-custom-element>
      #shadowRoot
      <slot></slot>
    </my-other-custom-element>
</div>
```

Would produce an array like this:

```js
[
  "div",

  // my-custom-element
  "my-custom-element",
  "ShadowRoot",
  "slot"

  // my-other-custom-element
  "my-other-custom-element",
  "ShadowRoot",
  "slot"
]
```
