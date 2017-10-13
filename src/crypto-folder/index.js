///////////////////////////
///////////////////////////
// Settings

const SOURCE_DIR = 'E:/crydir/t t/'
const CLOUD_DIR = 'E:/crydir/'
const PASSWORD = 'kbcbkbcb'

const LOC_7Z = '7z'

///////////////////////////
///////////////////////////
const { promisify } = require('util')
const { resolve } = require('path')
const fs = require('fs')
const unlink = promisify(fs.unlink)
const rename = promisify(fs.rename)
const exec = promisify(require('child_process').exec)

const ARCHIVE_NAME = 'archive.7z'

let sourcePath = SOURCE_DIR
let sourceWildcard = resolve(SOURCE_DIR, '*')
let archivePath = resolve(CLOUD_DIR, ARCHIVE_NAME)

let bkArchivePath = resolve(CLOUD_DIR, `${ARCHIVE_NAME}.arc.bak`)
let bkSourcePath = resolve(SOURCE_DIR, `../${ARCHIVE_NAME}.src.bak`)

const compressCmd = function (fromPath, toPath){
  let baseCmd = `${LOC_7Z} a -mx -mmt8 -mhe`
  let cmd = `${baseCmd} -p"${PASSWORD}" -- "${toPath}" "${fromPath}"`
  return cmd
}

const extractCmd = function (){
  let baseCmd = `${LOC_7Z} x -mmt8 -y`
  let cmd = `${baseCmd} -p"${PASSWORD}" -o"${sourcePath}" -- "${archivePath}"`
  return cmd
}

const invokeCmd = async function (cmd){
  let output = null

  try {
    output = await exec(cmd)
  }
  catch (err){
    console.error(err)
  }
  finally {
    console.log(output.stdout)
    console.error(output.stderr)
  }
}

const backupArchive = async function (){
  if (fs.existsSync(bkArchivePath)){
    await unlink(bkArchivePath)
  }

  if (fs.existsSync(archivePath)){
    await rename(archivePath, bkArchivePath)
  }
}

const backupSource = async function (){
  if (fs.existsSync(bkSourcePath)){
    await unlink(bkSourcePath)
  }

  let cmd = compressCmd(sourceWildcard, bkSourcePath)
  await invokeCmd(cmd)
}

const compress = async function (){
  await backupArchive()
  let cmd = compressCmd(sourceWildcard, archivePath)
  await invokeCmd(cmd)
}

const extract = async function (){
  await backupSource()
  let cmd = extractCmd()
  await invokeCmd(cmd)
}

// extract()
// compress()

unlink(sourceWildcard)
// TODO: delete sources before extract --sdel