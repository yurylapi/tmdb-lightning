import { Img, Lightning } from 'wpe-lightning-sdk';
import { CircleProgressShader } from '@/shader';
import { assetSettings, colorMap, getImgUrl } from '@/lib';
import {
  IMAGE_TAG,
  NUMBER_TAG,
  RATING_CIRCLE_TAG,
  RATING_TAG,
  SOURCE_SANS_PRO_BOLD,
  SOURCE_SANS_PRO_REGULAR
} from '@/constants';

export default class Item extends Lightning.Component {
  static _template() {
    const settings = { duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' };
    return {
      w: Item.width,
      h: Item.height,
      y: 50,
      Poster: {
        w: w => w,
        h: h => h,
        pivotY: 0.7,
        rtt: true,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 10 },
        transitions: {
          w: { duration: 0.6, settings },
          h: { duration: 0.6, settings }
        },
        Image: {
          w: w => w,
          h: h => h,
          scale: 1.2,
          transitions: {
            w: { duration: 0.6, settings },
            h: { duration: 0.6, settings }
          }
        },
        BorderLeft: {
          w: 2,
          h: h => h,
          rect: true,
          color: colorMap.fadedWhite
        },
        Rating: {
          mountX: 0.5,
          mountY: 1,
          x: w => w / 2,
          y: 360,
          transitions: {
            y: { duration: 0.6, settings }
          },
          texture: Lightning.Tools.getRoundRect(70, 70, 35, 0, colorMap.white, true, colorMap.scooter),
          RatingNumber: {
            mount: 0.5,
            x: w => w / 2 + 4,
            y: h => h / 2 + 2,
            flex: {},
            Number: {
              text: { text: '0', fontSize: 26, fontFace: SOURCE_SANS_PRO_BOLD }
            },
            Percentage: {
              flexItem: { marginTop: 6 },
              text: { text: '%', fontSize: 12, fontFace: SOURCE_SANS_PRO_REGULAR }
            }
          },
          RatingCircle: {
            rect: true,
            color: colorMap.white,
            rtt: true,
            mount: 0.5,
            x: 36,
            y: 36,
            w: 60,
            h: 60,
            rotation: Math.PI * 0.5,
            shader: {
              type: CircleProgressShader,
              radius: 30,
              width: 3,
              angle: 0.0001,
              smooth: 0.005,
              color: colorMap.maroonFlush,
              backgroundColor: colorMap.darkShadeGreen
            }
          }
        }
      }
    };
  }

  _init() {
    this._angle = 0.001;
    this._ratingNumber = 0;

    this._focusAnimation = this.tag(RATING_TAG).animation({
      duration: 1.2,
      stopDuration: 0.2,
      stopMethod: 'immediate',
      actions: [
        {
          t: RATING_CIRCLE_TAG,
          p: 'shader.angle',
          rv: 0.0001,
          v: () => {
            const ratingCircleTag = this.tag(RATING_CIRCLE_TAG);
            if (this._angle < this._item.voteAverage / 10) {
              this._angle += 0.01;
            }
            if (this._angle < 0.4) {
              ratingCircleTag.shader.color = colorMap.maroonFlush;
            } else if (this._angle > 0.4 && this._angle < 0.6) {
              ratingCircleTag.shader.color = colorMap.wattle;
            } else if (this._angle > 0.6) {
              ratingCircleTag.shader.color = colorMap.greenCyan;
            }
            return this._angle;
          }
        },
        {
          t: NUMBER_TAG,
          p: 'text.text',
          rv: 0,
          v: () => {
            if (this._ratingNumber < this._item.voteAverage * 10) {
              this._ratingNumber += 1;
            }
            return `${Math.floor(this._ratingNumber)}`;
          }
        }
      ]
    });
  }

  set item(v) {
    this._item = v;

    const image = getImgUrl(this._item.poster, 500);

    this.patch({
      Poster: {
        Image: {
          texture: Img(image).contain(180 * 1.2, 270 * 1.2)
        }
      }
    });
  }

  get item() {
    return this._item;
  }

  set index(v) {
    this._index = v;

    if (this._index < 8) {
      this.tag(IMAGE_TAG).color = colorMap.white;
    }
  }

  _focus() {
    this._angle = 0.001;
    this._ratingNumber = 0;

    this.patch({
      Poster: {
        smooth: { scale: 1.2 },
        Image: {
          smooth: { scale: 1 }
        },
        Rating: {
          smooth: { y: 250 }
        }
      }
    });

    this._focusAnimation.start();
    this.signal('updateMetadata', { item: this._item });
  }

  _unfocus() {
    this.patch({
      Poster: {
        smooth: { scale: 1 },
        Image: {
          smooth: { scale: 1.2 }
        },
        Rating: {
          smooth: { y: 360 }
        }
      }
    });

    this._focusAnimation.stop();
  }

  static get width() {
    return assetSettings.width;
  }

  static get height() {
    return assetSettings.height;
  }

  static get offset() {
    return assetSettings.offset;
  }
}
