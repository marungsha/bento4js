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
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const crypto_1 = require("crypto");
class Bento4 {
    static transcode() {
        return __awaiter(this, arguments, void 0, function* (files = [], options = { aesKey: null, noIframe: false, singleFile: false, outputPath: "output" }, onComplete = () => { }, onError = () => { }) {
            /*
             Create output folder
            */
            if (options.outputPath)
                options.outputPath = options.outputPath + "/" + (0, crypto_1.randomUUID)();
            else
                options.outputPath = "output/" + (0, crypto_1.randomUUID)();
            if (!fs_1.default.existsSync("./output"))
                fs_1.default.mkdirSync("./output");
            //fs.mkdirSync(options.outputPath)
            if (options.aesKey) {
                return this.getEncryptionKey(options.aesKey, (encryptionKey) => {
                    this.runEncode(files, Object.assign(Object.assign({}, options), { aesKey: encryptionKey }), onComplete, onError);
                });
            }
            this.runEncode(files, Object.assign(Object.assign({}, options), { aesKey: null }), onComplete, onError);
        });
    }
    static getEncryptionKey(key, cb = () => { }) {
        const hexdump = (0, child_process_1.spawn)('hexdump', ['-e', '"%x"', key]);
        let encryptionKey = '';
        hexdump.stdout.on('data', data => {
            encryptionKey += data.toString().trim();
        });
        hexdump.on('close', code => {
            if (code === 0) {
                cb(encryptionKey);
            }
        });
    }
    static runEncode(files, options, onComplete, onError) {
        // prepare arguments
        let args = files;
        if (options.aesKey)
            args = ['--encryption-key', options.aesKey, '--output-encryption-key', '--output-dir', options.outputPath].concat(args);
        if (options.singleFile)
            args.push('--output-single-file');
        console.log(args);
        // clean output folder
        //fs.rmSync(options.outputPath, {recursive: true, force: true})
        // spawn process
        //console.log(options)
        //let hlsExecutable = options.mp4hls===1?'mp4hls':'mp42hls'
        let executable = (!this.isModule ? `.` : `./node_modules/js-bento4`) + `/bin/bento4/bin/mp4hls`;
        console.log(`\nExecuting ${executable}\n`);
        var child = (0, child_process_1.spawn)(executable, args);
        child.on("error", (error) => {
            onError(error);
            console.log(error);
        });
        child.on('exit', (code) => {
            if (code == 0) {
                // success
                if (options.noIframe) {
                    this.removeIframe(options);
                }
                onComplete(code, options.outputPath);
            }
            else {
                onError("Error code : " + code);
            }
        });
    }
    static removeIframe(options) {
        console.log("Removing Iframes...");
        let test = fs_1.default.readFileSync(options.outputPath + "/master.m3u8", { encoding: 'utf-8' });
        //console.log(test.split('# I-Frame Playlists')[0])
        fs_1.default.writeFileSync(options.outputPath + "/master.m3u8", test.split('# I-Frame Playlists')[0], { encoding: 'utf-8' });
    }
}
// for running as module / library in other project
// Turn it false for running inside library project itself
Bento4.isModule = true;
exports.default = Bento4;
