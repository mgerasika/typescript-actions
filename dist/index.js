"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./action"));
__export(require("./reducer"));
__export(require("./example"));
var myIndex = /** @class */ (function () {
    function myIndex() {
    }
    myIndex.prototype.log = function () {
        console.log('hello world');
    };
    return myIndex;
}());
exports.myIndex = myIndex;
//# sourceMappingURL=index.js.map