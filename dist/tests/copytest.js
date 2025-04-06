"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
//const fse = require('fs-extra');
const fs_extra_1 = __importDefault(require("fs-extra"));
const fs_2 = require("fs");
//fs.cpSync("unzipped/*", "bin")
//fse.moveSync("unzipped", "bin2", { overwrite: true })
let list = (0, fs_2.readdirSync)("unzipped", { withFileTypes: false });
console.log(list);
