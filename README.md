# aframe-ts-webpack

An experiment to see if it's possible to update A-Frame to use webpack, esmodules, types (via TypeScript), and custom elements

## examples

(Hello World currently just shows the clock console logging)

    npm run examples

## todo

- [x] Set up TypeScript and webpack with UMD, esmodule, commonjs, and var dist builds
- [x] Generate type definitions on build
- [ ] Bare-bones `a-scene`, `a-entity` nodes using `customElements.define()`. It should be optional whether you want the [polyfill](https://github.com/webcomponents/custom-elements) bundled with A-Frame or from a CDN like unpkg, or don't want it at all because you're feeling lucky about browser support :-)
- [ ] Set up Jest unit testing?