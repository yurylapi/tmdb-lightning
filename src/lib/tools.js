/**
 * Returns image url based on variations of path and size.
 *
 * @param {String} imgPath
 * @param {Number} width
 * @return {String}
 */
export const getImgUrl = (imgPath, width = 185) => `//image.tmdb.org/t/p/w${width}${imgPath}`;
