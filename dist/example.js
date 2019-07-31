"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var action_1 = require("./action");
var reducer_1 = require("./reducer");
var SumAction = /** @class */ (function () {
    function SumAction() {
    }
    SumAction.prototype.sum = function (payload) {
        return function (dispath, methodName) {
            dispath({
                name: methodName,
                payload: payload
            });
        };
    };
    ;
    SumAction.prototype.sumApi = function (payload) {
        return function (dispath, methodName) {
            Promise.resolve(payload.number1 + payload.number2).then(function (data) {
                dispath({
                    name: methodName,
                    payload: data
                });
            });
        };
    };
    ;
    __decorate([
        action_1.action(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SumAction.prototype, "sum", null);
    __decorate([
        action_1.action(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SumAction.prototype, "sumApi", null);
    return SumAction;
}());
exports.SumAction = SumAction;
var SumReducer = /** @class */ (function () {
    function SumReducer() {
    }
    SumReducer.prototype.sum = function (payload) {
        return function (store) {
            return __assign({}, store, { result: payload.number1 + payload.number2 });
        };
    };
    ;
    SumReducer.prototype.sumApi = function (payload) {
        return function (store) {
            return __assign({}, store, { result: payload.number1 + payload.number2 });
        };
    };
    ;
    __decorate([
        reducer_1.reducer(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SumReducer.prototype, "sum", null);
    __decorate([
        reducer_1.reducer(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SumReducer.prototype, "sumApi", null);
    return SumReducer;
}());
exports.SumReducer = SumReducer;
var sumAction = new SumAction();
var sumReducer = reducer_1.createReducer(new SumReducer());
//# sourceMappingURL=example.js.map