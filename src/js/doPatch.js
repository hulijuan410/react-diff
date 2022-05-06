import { ATTR, REMOVE, REPLACE, TEXT } from './pathTypes';
import { createElement, Element } from './virtulDom';
let finalPatches = {},
    rnIndex = 0;

function doPatch(rDom, patches) {
  finalPatches = patches;
  rNodeWalk(rDom);
}

function rNodeWalk(rNode) {
  const rnPatch = finalPatches[rnIndex ++],
    childNodes = rNode.childNodes;

    [...childNodes].map((c) => {
      rNodeWalk(c);
    })

    if (rnPatch) {
      patchAction(rNode, rnPatch);
    }
}

function patchAction(rNode, rnPatch) {
  rnPatch.map((p) => {
    switch (p.type) {
      case ATTR:
        for (let key in p.attrs) {
          const value = p.attrs[key];
          if (value) {
            rNode.setAttribute(key, value);
          } else {
            rNode.removeAttribute(key);
          }
        }
        break;
      case Text:
        rNode.textContent = p.text;
        break;
      case REPLACE:
        const newNode = p.newNode instanceof Element ? p.newNode.render() : document.createTextNode(p.newNode);
        rNode.parentNode.replaceChild(newNode, rNode);
        break;
      case REMOVE:
        rNode.parentNode.removeChild(rNode);
        break;
      default:
        break;
    }
  })
}

export default doPatch;