import Bento4 from "../Bento";

Bento4.isModule = false
Bento4.transcode(["/Users/marungshabrahma/Desktop/screenrecord.mov"], { aesKey: `/Users/marungshabrahma/Desktop/Bento4/bin/newbo.key`, singleFile: true, noIframe: true, outputPath: "./output/result" }, (code) => {
    console.log(code)
}, (err: any) => {
    console.log(err)
})