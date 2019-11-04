"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var ActionBase = /** @class */ (function () {
    function ActionBase() {
        this._shortActionName = '';
        this._reduxDispatcher = function () {
        };
    }
    ActionBase.prototype.init = function (actionName, reduxDispatcher) {
        this._shortActionName = actionName;
        this._reduxDispatcher = reduxDispatcher;
    };
    ActionBase.prototype.request = function () {
        var _this = this;
        return function (dispatcher) {
            dispatcher({
                name: utils_1.actionNames.getRequestActionName(_this.getStoreName(), _this._shortActionName),
                payload: null
            });
        };
    };
    ActionBase.prototype.success = function (args) {
        var _this = this;
        return function (dispatcher) {
            dispatcher({
                name: utils_1.actionNames.getSuccessActionName(_this.getStoreName(), _this._shortActionName),
                payload: args
            });
        };
    };
    ActionBase.prototype.failed = function (error) {
        var _this = this;
        return function (dispatcher) {
            dispatcher({
                name: utils_1.actionNames.getFailedActionName(_this.getStoreName(), _this._shortActionName),
                payload: error
            });
        };
    };
    ActionBase.prototype.resetStore = function () {
        var _this = this;
        return function (dispatcher) {
            dispatcher({
                name: utils_1.actionNames.getResetStoreActionName(_this.getStoreName(), ''),
                payload: null
            });
        };
    };
    Object.defineProperty(ActionBase.prototype, "actionName", {
        get: function () {
            return utils_1.actionNames.getActionName(this.getStoreName(), this._shortActionName);
        },
        enumerable: true,
        configurable: true
    });
    ActionBase.prototype.dispatch = function (data) {
        if (typeof data === 'function') {
            data(this._reduxDispatcher);
        }
        else {
            this._reduxDispatcher(data);
        }
    };
    return ActionBase;
}());
exports.ActionBase = ActionBase;
//# sourceMappingURL=action-base.js.map