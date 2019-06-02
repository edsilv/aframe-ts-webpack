export class ANode extends HTMLElement {
	constructor(self) {
		self = super();
		console.log("ANode constructed");
		return self;
		//return Reflect.construct(HTMLElement, [], this.constructor);
	}  
	
	connectedCallback () {
		console.log("ANode connected");
	}
}

window.customElements.define("a-node", ANode);