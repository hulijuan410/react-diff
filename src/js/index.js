import { createElement, renderDom } from './virtulDom'
import domDiff from './domDiff';
import doPatch from './doPatch';
const vDom1 = createElement('ul', 
  { id: 'list', style: "width: 100px; height: 100px" }, 
  [
    createElement('li', {class: 'item'}, ['Item 1']),
    createElement('li', {class: 'item'}, ['Item 2']),
    createElement('li', {class: 'item'}, ['Item 3'])
  ]
);

const vDom2 = createElement('ul', 
  { id: 'list-wrapper', style: "width: 100px; height: 100px" }, 
  [
    createElement('li', {class: 'item1'}, []),
    createElement('li', {class: 'item'}, ['Item 22']),
    createElement('div', {class: 'item'}, ['Item 3'])
  ]
);
const realDom = vDom1.render();
renderDom(realDom, document.getElementById('app'));
console.log(realDom);
console.log(vDom1);
const paths = domDiff(vDom1, vDom2);
console.log(paths);
doPatch(realDom, paths);