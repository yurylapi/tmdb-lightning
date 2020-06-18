import { Lightning, Router } from 'wpe-lightning-sdk';
import MenuItem from './menu.item';
import { colorMap } from '@/lib';
import { FOCUS_TAG, ITEMS_TAG, ROUTE_MOVIES, ROUTE_SERIES } from '@/constants';

export default class Menu extends Lightning.Component {
  static _template() {
    const settings = { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' };

    return {
      Items: {
        y: 68,
        flex: {},
        Movies: {
          type: MenuItem,
          label: 'Movies',
          url: ROUTE_MOVIES
        },
        Series: {
          type: MenuItem,
          label: 'Series',
          url: ROUTE_SERIES
        },
        Exit: {
          type: MenuItem,
          label: 'Exit',
          url: 'exit'
        }
      },
      Focus: {
        rect: true,
        colorLeft: colorMap.lightShadeGreen,
        colorRight: colorMap.darkOrange,
        h: 6,
        y: 128,
        transitions: {
          alpha: settings,
          w: settings
        }
      }
    };
  }

  _init() {
    this._index = 0;
  }

  _focus() {
    const focusTag = this.tag(FOCUS_TAG);
    focusTag.w = 0;
    focusTag.setSmooth('alpha', 1);

    this.setIndex();
  }

  _unfocus() {
    this.tag(FOCUS_TAG).setSmooth('alpha', 0);
  }

  setIndex(index = this._index) {
    this._index = index;
    this.tag(FOCUS_TAG).patch({
      smooth: { x: this.activeItem.finalX, w: this.activeItem.finalW }
    });
  }

  _handleEnter() {
    const item = this.activeItem;

    if (item.url === 'exit') {
      this.application.closeApp();
    } else if (item.url) {
      Router.navigate(item.url);
    }
  }

  _handleLeft() {
    if (this._index > 0) {
      this.setIndex(this._index - 1);
    }
  }

  _handleRight() {
    if (this._index < this.tag(ITEMS_TAG).children.length - 1) {
      this.setIndex(this._index + 1);
    }
  }

  _handleDown() {
    Router.restoreFocus();
  }

  get activeItem() {
    return this.tag(ITEMS_TAG).children[this._index];
  }

  _getFocused() {
    return this.activeItem;
  }
}
