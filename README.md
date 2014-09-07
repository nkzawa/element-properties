element-properties
==============
[![Build Status](https://travis-ci.org/nkzawa/element-properties.svg)](https://travis-ci.org/nkzawa/element-properties)

Define custom properties and attributes to existing HTML elements.

```js
var node = document.createElement('div');

elementProperties(node, {
  // publish properties as attributes
  publish: {
    label: 'Default Label',
    // reflect back property value to attribute
    active: { value: false, reflect: true }
  },
  zDepth: 1
}, function(name, oldValue, newValue) {
  // called upon a property value changed
});

console.log(node.label); // => 'Default Label'
console.log(node.active); // => false
console.log(node.zDepth:); // => 1

node.setAttribute('label', 'New Label');
console.log(node.label); // => 'New Label'

node.active = true;
console.log(node.hasAttribute('active')); // => true
```

## Installation

```bash
bower install --save element-properties
```

## Browser Support
Chrome, Firefox, Safari, IE 8+

## License

MIT
