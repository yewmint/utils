import sharp from 'sharp' 

// default settings
const DEFAULT_QUALITY = 40
const DEFAULT_SIZE = 100

/**
 * Provides functionality to create square thumbnail.
 * 
 * @class ThumbnailInstance
 */
class ThumbnailInstance {
  /**
   * Creates an instance of ThumbnailInstance.
   * 
   * @param {string} pathToImage 
   * @memberof ThumbnailInstance
   */
  constructor (pathToImage){
    /**
     * @protected
     * @property
     */
    this._pathToImage = pathToImage

    /**
     * @protected
     * @property
     */
    this._quality = DEFAULT_QUALITY

    /**
     * @protected
     * @property
     */
    this._size = DEFAULT_SIZE
  }

  /**
   * set size of thumbnail
   * 
   * @param {number} s size
   * @returns {ThumbnailInstance}
   * @memberof ThumbnailInstance
   */
  size (s){
    this._size = s
    return this
  }

  /**
   * set quality of thumbnail, range in [0, 100]
   * 
   * @param {size} q 
   * @returns {ThumbnailInstance}
   * @memberof ThumbnailInstance
   */
  quality (q){
    this._quality = q
    return this
  }

  /**
   * output thumbnail into file path.
   * 
   * @param {string} pathToThumbnail 
   * @returns {Promise<sharp.OutputInfo>}
   * @memberof ThumbnailInstance
   */
  to (pathToThumbnail){
    return new Promise((resolve, reject) => {
      sharp(this._pathToImage)
        .resize(this._size, this._size)     // set resize width and height
        .min()                              // scale to minimum edge
        .crop(sharp.strategy.attention)     // focus on interesting region
        .webp({ quality: this._quality })   // set type to webp
        .toFile(pathToThumbnail, function(err, info) {
          if (err) reject(err)
          else resolve(info)
        })
    })
  }
}

/**
 * return ThumbnailInstance from path to image.
 * 
 * @example
 * await thumbnail('/path/to/image')
 *   .size(100)
 *   .quality(20)
 *   .to('/path/to/thumbnail')
 * 
 * @export
 * @param {string} pathToImage 
 * @returns {ThumbnailInstance}
 */
export default function (pathToImage){
  return new ThumbnailInstance(pathToImage)
}