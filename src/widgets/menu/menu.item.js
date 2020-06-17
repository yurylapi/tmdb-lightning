import { Lightning } from 'wpe-lightning-sdk';

export default class MenuItem extends Lightning.Component {
  static _template() {
    return {
      flexItem: { marginRight: 40 },
      text: { text: '', fontSize: 48, fontFace: 'SourceSansPro-Regular' }
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
