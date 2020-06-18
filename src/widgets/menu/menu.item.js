import { Lightning } from 'wpe-lightning-sdk';
import { SOURCE_SANS_PRO_REGULAR } from '@/constants';

export default class MenuItem extends Lightning.Component {
  static _template() {
    return {
      flexItem: { marginRight: 40 },
      text: { text: '', fontSize: 48, fontFace: SOURCE_SANS_PRO_REGULAR }
    };
  }

  set label(v) {
    this._label = v;
    this.patch({
      text: { text: this._label }
    });
  }

  set url(v) {
    this._url = v;
  }

  get url() {
    return this._url;
  }
}
