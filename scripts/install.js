#!/usr/bin/env node
import fetch from 'node-fetch'
import decompress from 'decompress'
import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { rimrafSync } from 'rimraf'
import currentModulePaths from 'current-module-paths'
const { __dirname } = currentModulePaths(import.meta.url)

const version = '1-6-0-640'

const downloadPaths = {
    "mac": "https://www.bok.net/Bento4/binaries/Bento4-SDK-1-6-0-640.universal-apple-macosx.zip",
    "linux": "https://www.bok.net/Bento4/binaries/Bento4-SDK-1-6-0-640.x86_64-unknown-linux.zip",
    "win10": "https://www.bok.net/Bento4/binaries/Bento4-SDK-1-6-0-640.x86_64-microsoft-win32.zip"
}


function downloadFile (from, to, done) {
  console.log('fetching: ' + from)
  fetch(from, { redirect: 'follow' }).then(response => {
    if (response.ok) {
      console.log(`Downloading Bento4 (${Number(response.headers.get('content-length')).toLocaleString()} bytes) `)
      response.arrayBuffer().then(buf => fs.writeFile(to, Buffer.from(buf), done))
    } else {
      throw new Error(`Failed to download Bento4: ${response.status} ${response.statusText}`)
    }
  })
}

function extractFile (archive, copyFrom, copyTo, done) {
  console.log('extracting: ' + copyFrom)
  if (archive.indexOf('.zip') > 0) {
    if (!fs.existsSync('unzipped')) fs.mkdirSync('unzipped')
    decompress(archive, 'unzipped')
      .then(async () => {
        let folderPath = fs.readdirSync("unzipped", { withFileTypes: false })[0]
        fse.moveSync(path.join(`unzipped`, folderPath), copyTo, { overwrite: true })
        rimrafSync('unzipped')
        done()
      })
  } else if (archive.indexOf('.dmg') > 0) {
    // Its always .zip file
  }
}

function install (installation) {
  downloadFile(installation.url, installation.archive, function () {
    if (!fs.existsSync('bin')) fs.mkdirSync('bin')
    extractFile(installation.archive, installation.copyFrom, installation.copyTo, function () {
      console.log('Bento4 installation complete')
      fs.unlinkSync(installation.archive)
    })
  })
}

function go (installation) {
  if (fs.existsSync(path.resolve(__dirname, '..', installation.copyTo))) {
   console.log("Already Exists..")
  } else {
    install(installation)
  }
}

// installation script start here

if (process.platform === 'darwin') {
  go({
    url: downloadPaths.mac,
    archive: 'mac.zip',
    copyFrom: path.join('unzipped'),
    copyTo: path.join('bin', "bento4")
  })
} else if (process.platform === 'win32') {
//  process.arch === 'x64' ? win64 : 
  go({
     url: downloadPaths.win10,
    archive: 'win.zip',
    copyFrom: path.join('unzipped'),
    copyTo: path.join('bin', "bento4")
  })
} else if (process.platform === 'linux') {
  go({
    url: downloadPaths.linux,
    archive: 'linux.zip',
    copyFrom: path.join('unzipped'),
    copyTo: path.join('bin', "bento4")
  })
}