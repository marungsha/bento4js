import fs from 'fs-extra'
import { spawn } from 'child_process'
import { randomUUID } from 'crypto'

export interface BentoOptions {aesKey: string | null, singleFile: boolean, outputPath: string, noIframe: boolean}
export interface BentoCompleteCallback {
    (code: number, path:string): void
}

class Bento4{
    // for running as module / library in other project
    // Turn it false for running inside library project itself
    static isModule = true
    static async transcode(files: string[] = [], options: BentoOptions = { aesKey: null, noIframe: false, singleFile: false, outputPath: "output" }, onComplete: BentoCompleteCallback, onError = (error: Error) => {}){
        /*
         Create output folder
        */
        if(options.outputPath) options.outputPath = process.cwd()+"/"+options.outputPath+"/"+randomUUID()
        else options.outputPath = process.cwd()+"/temp/output/"+randomUUID()
        
        if(!fs.existsSync("./output")) fs.mkdirSync("./output")
        //fs.mkdirSync(options.outputPath)

        if(options.aesKey){
            return this.getEncryptionKey(options.aesKey, (encryptionKey) => {
                this.runEncode(files, { ...options, aesKey: encryptionKey }, onComplete, onError)
            })
        }
        this.runEncode(files, { ...options, aesKey: null }, onComplete, onError)
    }

    static getEncryptionKey(key: string, cb = (_: string | null) => {}){
        
        const hexdump = spawn('hexdump', ['-e', '"%x"', key]);

        let encryptionKey = '';
        hexdump.stdout.on('data', data => {
            encryptionKey += data.toString().trim();
        });

        hexdump.on('close', code => {
            if (code === 0) {
                cb(encryptionKey)
            }
        });
        
    }

    static runEncode(files: any[], options: BentoOptions, onComplete: BentoCompleteCallback = (__,_) => {}, onError: (error: any) => void = (_: Error) => {} ) {
        // prepare arguments
        let args = files
        if(options.aesKey) args = ['--encryption-key', options.aesKey, '--output-encryption-key', '--output-dir', options.outputPath].concat(args)
        if(options.singleFile) args.push('--output-single-file')

        console.log(args)
        // clean output folder
        //fs.rmSync(options.outputPath, {recursive: true, force: true})
        
        // spawn process
        //console.log(options)
        //let hlsExecutable = options.mp4hls===1?'mp4hls':'mp42hls'
        let executable = (!this.isModule?`.`:`./node_modules/js-bento4`) + `/bin/bento4/bin/mp4hls`
        
        console.log(`\nExecuting ${executable}\n`)
        
        var child = spawn(executable, args)
        child.on("error", (error) => {
            onError(error)
            console.log(error)
        })

        child.on('exit', (code) => {
            if(code == 0){
                // success
                if(options.noIframe){
                    this.removeIframe(options)
                }
                onComplete(code, options.outputPath)
            } else {
                onError("Error code : "+code)
            }
        })
    }

    static removeIframe(options: BentoOptions){
        console.log("Removing Iframes...")
        let test = fs.readFileSync(options.outputPath+"/master.m3u8", { encoding: 'utf-8'})
        //console.log(test.split('# I-Frame Playlists')[0])
        fs.writeFileSync(options.outputPath+"/master.m3u8", test.split('# I-Frame Playlists')[0], { encoding: 'utf-8' })
    }
}

export default Bento4