import { Lightning, Router } from 'wpe-lightning-sdk';
import { List } from '../components';

export default class Main extends Lightning.Component {
  static _template() {
    return {
      List: {
        x: 100,
        y: 560,
        zIndex: 3,
        type: List
      }
    };
  }

  _init() {
    this._index = 0;
  }

  set data(v) {
    this.tag('List').movies = v;
  }

  set movies(movies) {
    this.tag('Lists').label = 'Popular';
    this.tag('Lists').movies = movies.results;
  }

  _focus() {
    this.patch({
      Lists: {
        smooth: { y: [560, { duration: 0.2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }] }
      }
    });
  }

  _unfocus() {
    this.patch({
      Lists: {
        smooth: { y: [600, { duration: 0.4 }] }
      }
    });
  }

  _getFocused() {
    return this.tag('List');
  }

  _handleUp() {
    Router.focusWidget('Menu');
  }
}
