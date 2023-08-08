export class CustomElement extends HTMLElement {
  connectedCallback () {
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `Level 1 <slot></slot>`
  }
}

export class ShadowRoot2 extends HTMLElement {
  connectedCallback () {
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `<custom-element>
  Level 2

  <slot></slot>
</custom-element>`
  }
}

export class ShadowRoot3 extends HTMLElement {
  connectedCallback () {
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `<shadow-root-2>
  Level 3
</shadow-root-2>`
  }
}
