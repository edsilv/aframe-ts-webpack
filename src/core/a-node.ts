export class ANode extends HTMLElement {
  constructor(self) {
    self = super();
    console.log("ANode constructed");
    return self;
  }

  connectedCallback() {
    console.log("ANode connected");
  }
}

window.customElements.define("a-node", ANode);
