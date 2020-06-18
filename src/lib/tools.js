/**
 * Returns image url based on variations of path and size.
 *
 * @param {String} imgPath
 * @param {Number} width
 * @return {String}
 */
export const getImgUrl = (imgPath, width = 185) => `//image.tmdb.org/t/p/w${width}${imgPath}`;

/**
 * Provides application color map.
 */
export const colorMap = {
  grey: 0xff717171,
  black: 0xff000000,
  white: 0xffffffff,
  blueZodiac: 0xff404249,
  darkOrange: 0xff03b3e4,
  scooter: 0xff081c22,
  maroonFlush: 0xffd1215c,
  wattle: 0xffd2d531,
  greenCyan: 0xff21d07a,
  darkShadeGreen: 0xff204529,
  fadedWhite: 0x40ffffff,
  lightShadeGreen: 0xff8ecea2,
  darkShadeBrown: 0xff615f5d,
  invisibleBlack: 0x00000000,
  invisibleWhite: 0x00ffffff,
  hiddenWhite: 0x20ffffff,
  blurWhite: 0xaaffffff
};

export const assetSettings = {
  width: 180,
  height: 270,
  offset: 40
};
