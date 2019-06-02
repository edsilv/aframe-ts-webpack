# aframe-ts-webpack

Demo: https://aframe-ts-webpack.netlify.com

Docs: https://edsilv.github.io/aframe-ts-webpack

An experiment to see if it's possible to update A-Frame to use webpack, esmodules, types (via TypeScript), and custom elements v1.

Creates commonsjs, esmodule, UMD, and var dist builds. UMD would be the conventional method of use, i.e. `window.AFRAME`. 

Transpiles TypeScript to es5. Includes `@webcomponents/custom-elements/custom-elements` (16k) and `@webcomponents/webcomponentsjs/custom-elements-es5-adapter` (1.3k) polyfills (tested in IE11). `custom-elements-es5-adapter` is necessary for _modern browsers_ using custom elements transpiled to es5. Eventually when browsers are all "modern" we can change the tsconfig to `"target": "es6"` without needing to change anything else. 

es6 class syntax with _optional_ static typing can be used for development. Any plain js file is a valid ts file.

Uses `dts-bundle-generator` to generate a _single_ namespaced type definition.

Generates documentation using `typedoc` from code comments.

Tested in:

 - IE11
 - Chrome (macOS High Sierra/windows 10)
 - Safari (macOS High Sierra)
 - Firefox (macOS High Sierra/windows 10)
 - Edge

## examples

    npm run examples

## todo

- [x] Set up TypeScript and webpack with UMD, esmodule, commonjs, and var dist builds
- [x] Generate type definition on build
- [x] Format with prettier on build
- [x] Generate documentation on build
- [x] Bare-bones `a-scene`, `a-entity`, `a-node` using `customElements.define()` console logging `connectedCallback`
- [x] `AFRAME.utils.isIE11` example
- [ ] Set up Jest unit testing