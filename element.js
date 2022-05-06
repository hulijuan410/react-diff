function Element(type, props, children) {
  this.type = type;
  this.props = props;
  this.children = children;
}
Element.prototype.render = function() {
  let el = document.createElement(this.type);
  for (let prop in this.props) {
    el.setAttribute(prop, this.props[prop]);
  }
  this.children.forEach(child => {
    el.appendChild(child instanceof Element ? child.render() : document.createTextNode(child));
  });
  return el;
}
module.exports = function (type, props, children) {
  return new Element(type, props, children);
}