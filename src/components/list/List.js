import { Lightning } from 'wpe-lightning-sdk';
import Item from '../item';

export default class List extends Lightning.Component {
  static _template() {
    const cubicBezier = 'cubic-bezier(0.20, 1.00, 0.80, 1.00)';
    return {
      Items: {
        y: 120,
        forceZIndexContext: true,
        boundsMargin: [500, 100, 500, 100],
        transitions: {
          x: { duration: 0.3, cubicBezier }
        }
      },
      Focus: {
        transitions: {
          scale: {
            duration: 0.5,
            cubicBezier
          },
          alpha: {
            duration: 0.5,
            cubicBezier
          }
        },
        x: -10,
        y: 160,
        colorLeft: 0xffa0a832,
        colorRight: 0xff38bfd1,
        texture: Lightning.Tools.getRoundRect(Item.width + 10, Item.height + 10, 15, 5, 0xcc30538a, false, 0xff00ffff)
      },
      Metadata: {
        Title: {
          y: 10,
          text: {
            textColor: 0xccffffff,
            text: '',
            fontFace: 'SourceSansPro-Black',
            fontSize: 40
          }
        },
        Genre: {
          y: 60,
          text: {
            text: '',
            fontFace: 'SourceSansPro-Regular',
            fontSize: 26
          }
        }
      }
    };
  }

  $focusItem(item) {
    this.patch({
      Metadata: {
        Title: {
          text: {
            text: item.title
          }
        },
        Genre: {
          text: {
            text: item.genres.join(' | ')
          }
        }
      },
      Focus: {
        y: 150,
        scale: 1.2,
        alpha: 0.5,
        smooth: {
          alpha: 1
        }
      }
    });
  }

  _init() {
    this._indexCount = 0;
    this._index = 0;
  }

  _handleLeft() {
    if (this._index > 0) {
      this.setIndex(this._index - 1);
    }
  }

  _handleRight() {
    if (this._index < this.items.length - 1) {
      this.setIndex(this._index + 1);
    }
  }

  setIndex(idx) {
    this._index = idx;

    // update position
    this.tag('Items').setSmooth('x', idx * -220);
  }

  set label(title) {
    this.tag('Label').text.text = title;
  }

  set movies(v) {
    this.tag('Items').children = v.map((movie, index) => {
      return {
        type: Item,
        item: movie,
        x: index * (Item.width + Item.offset)
      };
    });
  }

  get items() {
    return this.tag('Items').children;
  }

  get activeItem() {
    return this.items[this._index];
  }

  _unfocus() {
    this.tag('Focus').patch({
      smooth: {
        alpha: 0,
        scale: 1
      }
    });
  }

  _getFocused() {
    return this.activeItem;
  }
}
