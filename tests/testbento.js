import Bento4 from "../Bento.js";

Bento4.transcode(["/TJOutputSD.mp4"], { aesKey: `/enc.key`}, (code) => {
    console.log(code)
}, (err) => {
    console.log(err)
})