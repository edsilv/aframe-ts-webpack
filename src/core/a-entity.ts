import { ANode } from "./a-node";

export class AEntity extends ANode {
  constructor(self) {
    self = super(self);
    console.log("AEntity constructed");
  }

  connectedCallback() {
    console.log("AEntity connected");
  }
}

window.customElements.define("a-entity", AEntity);
