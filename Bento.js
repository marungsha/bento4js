import { spawn } from 'child_process'
import fs from 'fs'

class Bento4{
    
    static async transcode(files = [], options = { aesKey: null }, onComplete = () => {}, onError = () => {}){
        if(options.aesKey){
            return this.getEncryptionKey(options.aesKey, (encryptionKey) => {
                this.runEncode(files, encryptionKey, onComplete, onError)
            })
        }
        this.runEncode(files, null, onComplete, onError)
    }

    static getEncryptionKey(key, cb = () => {}){
        
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

    static runEncode(files, encryptionKey, onComplete, onError) {
        // prepare arguments
        let args = files
        if(encryptionKey) args = ['--encryption-key', encryptionKey, '--output-encryption-key'].concat(args)

        // clean output folder
        fs.rmSync("output", {recursive: true, force: true})
        
        // spawn process
        var child = spawn(`./bin/bento4/bin/mp4hls`, args)
        child.on("error", (error) => {
            onError(error)
        })
        child.on('exit', (code) => {
            if(code == 0){
                // success
                onComplete(code)
            } else {
                onError("Error code : "+code)
            }
        })
    }
}

export default Bento4