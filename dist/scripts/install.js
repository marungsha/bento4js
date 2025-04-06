#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const decompress_1 = __importDefault(require("decompress"));
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const rimraf_1 = require("rimraf");
const current_module_paths_1 = __importDefault(require("current-module-paths"));
const { __dirname } = (0, current_module_paths_1.default)(import.meta.url);
const version = '1-6-0-640';
const downloadPaths = {
    "mac": "https://www.bok.net/Bento4/binaries/Bento4-SDK-1-6-0-640.universal-apple-macosx.zip",
    "linux": "https://www.bok.net/Bento4/binaries/Bento4-SDK-1-6-0-640.x86_64-unknown-linux.zip",
    "win10": "https://www.bok.net/Bento4/binaries/Bento4-SDK-1-6-0-640.x86_64-microsoft-win32.zip"
};
function downloadFile(from, to, done) {
    console.log('fetching: ' + from);
    (0, node_fetch_1.default)(from, { redirect: 'follow' }).then(response => {
        if (response.ok) {
            console.log(`Downloading Bento4 (${Number(response.headers.get('content-length')).toLocaleString()} bytes) `);
            response.arrayBuffer().then(buf => fs_1.default.writeFile(to, Buffer.from(buf), done));
        }
        else {
            throw new Error(`Failed to download Bento4: ${response.status} ${response.statusText}`);
        }
    });
}
function extractFile(archive, copyFrom, copyTo, done) {
    console.log('extracting: ' + copyFrom);
    if (archive.indexOf('.zip') > 0) {
        if (!fs_1.default.existsSync('unzipped'))
            fs_1.default.mkdirSync('unzipped');
        (0, decompress_1.default)(archive, 'unzipped')
            .then(() => __awaiter(this, void 0, void 0, function* () {
            let folderPath = fs_1.default.readdirSync("unzipped", { withFileTypes: false })[0];
            fs_extra_1.default.moveSync(path_1.default.join(`unzipped`, folderPath), copyTo, { overwrite: true });
            (0, rimraf_1.rimrafSync)('unzipped');
            done();
        }));
    }
    else if (archive.indexOf('.dmg') > 0) {
        // Its always .zip file
    }
}
function install(installation) {
    downloadFile(installation.url, installation.archive, function () {
        if (!fs_1.default.existsSync('bin'))
            fs_1.default.mkdirSync('bin');
        extractFile(installation.archive, installation.copyFrom, installation.copyTo, function () {
            console.log('Bento4 installation complete');
            fs_1.default.unlinkSync(installation.archive);
        });
    });
}
function go(installation) {
    if (fs_1.default.existsSync(path_1.default.resolve(__dirname, '..', installation.copyTo))) {
        console.log("Already Exists..");
    }
    else {
        install(installation);
    }
}
// installation script start here
if (process.platform === 'darwin') {
    go({
        url: downloadPaths.mac,
        archive: 'mac.zip',
        copyFrom: path_1.default.join('unzipped'),
        copyTo: path_1.default.join('bin', "bento4")
    });
}
else if (process.platform === 'win32') {
    //  process.arch === 'x64' ? win64 : 
    go({
        url: downloadPaths.win10,
        archive: 'win.zip',
        copyFrom: path_1.default.join('unzipped'),
        copyTo: path_1.default.join('bin', "bento4")
    });
}
else if (process.platform === 'linux') {
    go({
        url: downloadPaths.linux,
        archive: 'linux.zip',
        copyFrom: path_1.default.join('unzipped'),
        copyTo: path_1.default.join('bin', "bento4")
    });
}
