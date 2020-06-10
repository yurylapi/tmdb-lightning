import { Lightning } from 'wpe-lightning-sdk';
import Item from '../item';

export default class List extends Lightning.Component {
  static _template() {
    return {
      Items: {
        y: 120,
        forceZIndexContext: true,
        boundsMargin: [500, 100, 500, 100],
        transitions: {
          x: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }
        }
      },
      Focus: {
        /**
         * @ todo: Your goal is to add a focus indicator. Please take a look at the video
         * and inspect the rectanle frame that's before the focused movie item.
         * extra: Animate it a bit when the focus changes to the next item
         */
      },
      Metadata: {
        /**
         * @todo: Your goal is to add a component that have multiple text labels,
         * 1 for the Title of the selected asset and 1 for the genre.
         */
      }
    };
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

  setIndex(index) {
    const prevIndex = this._index;
    this._index = index;
    const visibleItemsOnScreen = this._getVisibleItemsOnScreen();
    if (index > prevIndex) {
      if (this._indexCount < visibleItemsOnScreen) {
        this._indexCount++;
      }
      if (this._indexCount === visibleItemsOnScreen) {
        this.tag('Items').setSmooth('x', (index - this._indexCount) * -1 * (Item.width + Item.offset));
      }
    } else if (index < prevIndex) {
      if (this._indexCount > 0) {
        this._indexCount--;
      }
      if (this._indexCount === 0) {
        this.tag('Items').setSmooth('x', index * -1 * (Item.width + Item.offset));
      }
    }
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

  _getFocused() {
    return this.activeItem;
  }

  _getVisibleItemsOnScreen() {
    return Math.floor(1600 / (Item.width + Item.offset));
  }
}
