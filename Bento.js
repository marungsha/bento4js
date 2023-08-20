import { spawn } from 'child_process'

class Bento4{
    static transcode(files = [], options = { aesKey: null }, onComplete = () => {}){
        var child = spawn(`./bin/bento4/bin/mp4hls`, files)
        child.on("error", (error) => {
            console.log(error)
        })
        child.on('exit', (code) => {
            console.log(`Exited ${code}`)
            onComplete()
        })
    }
}

export default Bento4