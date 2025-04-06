"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bento_js_1 = __importDefault(require("../Bento.js"));
Bento_js_1.default.transcode(["/TJOutputSD.mp4"], { aesKey: `/enc.key` }, (code) => {
    console.log(code);
}, (err) => {
    console.log(err);
});
