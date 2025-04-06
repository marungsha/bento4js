"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bento_1 = __importDefault(require("../Bento"));
Bento_1.default.isModule = false;
Bento_1.default.transcode(["/Users/marungshabrahma/Desktop/screenrecord.mov"], { aesKey: `/Users/marungshabrahma/Desktop/Bento4/bin/newbo.key`, singleFile: true, noIframe: true, outputPath: "./output/result" }, (code) => {
    console.log(code);
}, (err) => {
    console.log(err);
});
