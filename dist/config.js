"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BentoBinPath = void 0;
const path_1 = __importDefault(require("path"));
const current_module_paths_1 = __importDefault(require("current-module-paths"));
const { __dirname } = (0, current_module_paths_1.default)(import.meta.url);
let BentoBinPath = null;
exports.BentoBinPath = BentoBinPath;
switch (process.platform) {
    case 'darwin':
        exports.BentoBinPath = BentoBinPath = path_1.default.join(__dirname, '..', 'Bento4js', 'bin', 'bento4', "bin");
        break;
    case 'win32':
        exports.BentoBinPath = BentoBinPath = path_1.default.join(__dirname, '..', 'Bento4js', 'bin', 'bento4', "bin");
        break;
    case 'linux':
        exports.BentoBinPath = BentoBinPath = path_1.default.join(__dirname, '..', 'Bento4js', 'bin', 'bento4', "bin");
        break;
}
