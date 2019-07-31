"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(require("./src/action"));
__export(require("./src/reducer"));
__export(require("./src/example"));
var myIndex = /** @class */ (function () {
    function myIndex() {
    }
    myIndex.prototype.log = function () {
        console.log('hello world');
    };
    return myIndex;
}());
exports.myIndex = myIndex;
