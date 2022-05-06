function Element (type, props, children) {
  this.type = type;
  this.props = props;
  this.children = children;
}

Element.prototype.render = function() {
  const { type, props, children } = this;
  const el = document.createElement(type);
  for (let key in props) {
    if (key === 'style') {
      el.style.cssText = props[key];
    } else {
      el.setAttribute(key, props[key]);
    }
  }
  children.forEach(child => {
    el.appendChild(child instanceof Element ? child.render() : document.createTextNode(child));
  });
  return el;
}

function createElement(type, props, children) {
  return new Element(type, props, children);
}

function renderDom(el, rootEl) {
  rootEl.appendChild(el);
}

export {
  createElement,
  renderDom,
  Element
}