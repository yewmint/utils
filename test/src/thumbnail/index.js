import expect from 'expect.js'
import thumbnail from '../../../src/thumbnail'
import { resolve } from 'path'

let imgPath = resolve('./test', 'testa.jpg')
let thumbPath = resolve('./test', 'testa.thumb.webp')

describe('thumbnail.js', function (){
  it ('should create ThumbnailInstance.', function (){
    let tn = thumbnail(imgPath)
    expect(tn).to.be.a('object')
    expect(tn._pathToImage).to.be.eql(imgPath)
  })

  it ('should modify properties in chaining calls.', function (){
    let tn = thumbnail(imgPath).quality(20).size(200)
    expect(tn._quality).to.be.eql(20)
    expect(tn._size).to.be.eql(200)
  })

  it ('should generate thumbnail.', async function (){
    await thumbnail(imgPath).quality(40).size(100).to(thumbPath)
  })
})
