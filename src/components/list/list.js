import { Lightning, Router } from 'wpe-lightning-sdk';
import { Item } from '@/components';
import { ITEMS_TAG, LABEL_TAG, METADATA_TAG, SOURCE_SANS_PRO_BOLD, SOURCE_SANS_PRO_REGULAR } from '@/constants';
import { colorMap } from '@/lib';

export default class List extends Lightning.Component {
  static _template() {
    return {
      Items: {
        y: 102,
        forceZIndexContext: true,
        boundsMargin: [500, 100, 500, 100],
        transitions: {
          x: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }
        }
      },
      Focus: {
        alpha: 0,
        x: -32,
        y: 102,
        colorLeft: colorMap.lightShadeGreen,
        colorRight: colorMap.darkOrange,
        texture: Lightning.Tools.getRoundRect(236, 344, 16, 6, colorMap.white, true, colorMap.invisibleWhite)
      },
      Metadata: {
        x: -32,
        y: 60,
        mountY: 1,
        flex: { direction: 'column' },
        Title: {
          text: { fontSize: 64, fontFace: SOURCE_SANS_PRO_BOLD, wordWrapWidth: 960, maxLines: 1 }
        },
        ReleaseDate: {
          flexItem: { marginTop: -24 },
          colorLeft: colorMap.lightShadeGreen,
          colorRight: colorMap.darkOrange,
          text: { fontSize: 32, fontFace: SOURCE_SANS_PRO_REGULAR, wordWrapWidth: 960, maxLines: 1 }
        }
      }
    };
  }

  _init() {
    this._index = 0;
  }

  _handleLeft() {
    this.setIndex(Math.max(0, --this._index));
  }

  _handleRight() {
    this.setIndex(Math.min(++this._index, this.items.length - 1));
  }

  _handleEnter() {
    const {
      item: { type, id }
    } = this.activeItem;
    Router.navigate(`details/${type}/${id}`);
  }

  updateMetadata({ item }) {
    // first hide
    const metadataTag = this.tag(METADATA_TAG);
    metadataTag.alpha = 0;
    metadataTag.y = 80;

    this.patch({
      Metadata: {
        Title: {
          text: { text: item.title }
        },
        ReleaseDate: {
          text: { text: item.releaseDate }
        },
        smooth: {
          alpha: [1, { duration: 0.4, delay: 0.1 }],
          y: [50, { duration: 0.4, delay: 0.1 }]
        }
      }
    });

    this.application.emit('updateItem', { item });
  }

  setIndex(idx) {
    // store new index
    this._index = idx;

    // update position
    this.tag(ITEMS_TAG).setSmooth('x', idx * -220);
  }

  set label(title) {
    this.tag(LABEL_TAG).text.text = title;
  }

  set movies(v) {
    // we add an array of object with type: Item
    this.tag(ITEMS_TAG).children = v.map((movie, index) => {
      return {
        type: Item,
        item: movie,
        x: index * (Item.width + Item.offset),
        signals: {
          updateMetadata: true
        }
      };
    });
  }

  _focus() {
    this.patch({
      Focus: { smooth: { alpha: 1 } },
      Metadata: { smooth: { alpha: 1 } }
    });
  }

  _unfocus() {
    this.patch({
      Focus: { smooth: { alpha: 0 } },
      Metadata: { smooth: { alpha: 0 } }
    });
  }

  get items() {
    return this.tag(ITEMS_TAG).children;
  }

  get activeItem() {
    return this.items[this._index];
  }

  _getFocused() {
    return this.activeItem;
  }
}
