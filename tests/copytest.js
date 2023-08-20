import fs from 'fs'
//const fse = require('fs-extra');
import fse from 'fs-extra'
import { readdirSync } from 'fs'

//fs.cpSync("unzipped/*", "bin")
//fse.moveSync("unzipped", "bin2", { overwrite: true })

let list = readdirSync("unzipped", { withFileTypes: false })
console.log(list)