import path from 'path'
import currentModulePaths from 'current-module-paths'
const { __dirname } = currentModulePaths(import.meta.url)

let BentoBinPath = null

switch (process.platform) {
  case 'darwin':
    BentoBinPath = path.join(__dirname, '..', 'Bento4js', 'bin', 'bento4', "bin")
    break
  case 'win32':
    BentoBinPath = path.join(__dirname, '..', 'Bento4js', 'bin', 'bento4', "bin")
    break
  case 'linux':
    BentoBinPath = path.join(__dirname, '..', 'Bento4js', 'bin', 'bento4', "bin")
    break
}

export { BentoBinPath }