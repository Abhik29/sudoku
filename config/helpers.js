var path = require('path');
var _root = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  var pathOP = path.join.apply(path, [_root].concat(args));
  return pathOP;
}

exports.root = root;
