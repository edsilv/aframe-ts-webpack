import { Clock } from "three/build/three.module";
import { AEntity } from "../a-entity";

export class AScene extends AEntity {
  constructor(self) {
    self = super(self);
    self.clock = new Clock();
    console.log("AScene constructed");
    return self;
  }

  connectedCallback() {
    console.log("AScene connected");
  }
}

window.customElements.define("a-scene", AScene);
