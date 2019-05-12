declare global {

    const THREE: typeof import("three");

    interface Window {
        debug: boolean;
        // todo: why use window.HTMLElement instead of HTMLElement?
        HTMLElement: any;
    }

    interface Document {
        registerElement: (tag: string, options: any) => HTMLElement; 
    }

}

export {};