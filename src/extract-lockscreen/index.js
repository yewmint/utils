const fs = require('fs')
const { promisify } = require('util')
const { resolve } = require('path')
const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)
const { createReadStream, createWriteStream } = fs

const WALLP_PATH = resolve(
  process.env["LOCALAPPDATA"],
  `Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\`,
  `LocalState\\Assets`
)

const DEST_PATH = resolve(
  process.env["USERPROFILE"],
  'Desktop',
  'lockscreens'
)

async function extract (){
  if (!fs.existsSync(DEST_PATH)){
    mkdir(DEST_PATH)
  }

  let files = await readdir(WALLP_PATH)
  for (let file of files){
    let sourcePath = resolve(WALLP_PATH, file)
    let targetPath = resolve(DEST_PATH, `${file}.png`)
    let rstream = createReadStream(sourcePath)
    let wstream = createWriteStream(targetPath)
    rstream.pipe(wstream)
  }
}

extract()