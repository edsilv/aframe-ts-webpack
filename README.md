# aframe2

This is an experiment to see if it's possible to update the amazing [A-Frame](http://aframe.io) to use webpack, esmodules, types (via [TypeScript](http://typescriptlang.org)), and custom elements (as opposed to the deprecated `document.registerElement`).

This is broadly driven by a desire to solve 3 issues:

- A-Frame is ~500k (when you ignore bundled three.js). This is large (could be due to bundled polyfills?) and I want to see if I can reduce it and/or allow custom [modular builds](https://github.com/aframevr/aframe/issues/3856).
- It doesn't support [orthographic cameras](https://github.com/aframevr/aframe/issues/3018) (a desirable feature for orthographic measurement tools)
- It doesn't support [multiple scenes per-page](https://github.com/aframevr/aframe/issues/916#issuecomment-358606497).

A-Frame is a super-powerful abstraction over three.js, Entity Component Systems are the future! Right now though it is mainly oriented around WebXR use cases. I think it should be possible to easily make [custom builds](https://github.com/aframevr/aframe/issues/3856) to suit different use cases, such as a simple in-page 3D rendering without all of the WebXR bells and whistles. It should also be possible to have [multiple scenes per page](https://github.com/aframevr/aframe/issues/916#issuecomment-358606497). If `a-scene` truly is an encapsulated custom element we should be able to have as many as we like :-)

## todo

- [x] Set up TypeScript and webpack with UMD, esmodule, commonjs, and var dist builds. 
- [x] Generate type definitions on build.
- [ ] Set up Jest unit testing
- [ ] Bare-bones `a-scene`, `a-entity` nodes using `customElements.define()`. It should be optional whether you want the [polyfill](https://github.com/webcomponents/custom-elements) bundled with A-Frame or from a CDN like unpkg, or don't want it at all because you're feeling lucky about browser support :-)