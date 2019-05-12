declare global {

    const THREE: typeof import("three");

    interface Window {
        debug: boolean;
        // todo: why use window.HTMLElement instead of HTMLElement?
        HTMLElement: any;
    }

    interface Document {
        // todo: can this be changed to customElements.define()? https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement
        registerElement: (tag: string, options: any) => HTMLElement; 
    }

}

export {};