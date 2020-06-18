import { Lightning } from 'wpe-lightning-sdk';
import { colorMap } from '@/lib';
import { LABEL_TAG, SOURCE_SANS_PRO_REGULAR } from '@/constants';

export default class Button extends Lightning.Component {
  static _template() {
    const settings = { duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.30, 1.00)' };
    return {
      flex: {},
      Background: {
        flex: {},
        rtt: true,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 14 },
        rect: true,
        color: colorMap.blueZodiac,
        transitions: {
          color: settings,
          scale: settings
        },
        Label: {
          flexItem: { marginLeft: 80, marginRight: 80, marginTop: 15, marginBottom: 10 },
          text: { fontFace: SOURCE_SANS_PRO_REGULAR, fontSize: 32 },
          transitions: {
            color: { duration: 0.6, settings },
            scale: { duration: 0.6, settings }
          }
        }
      }
    };
  }

  set label(v) {
    this._label = v;

    this.tag(LABEL_TAG).patch({
      text: { text: this._label }
    });
  }

  _focus() {
    this.patch({
      Background: {
        smooth: { color: colorMap.darkOrange },
        Label: {
          smooth: { color: colorMap.white }
        }
      }
    });
  }

  _unfocus() {
    this.patch({
      Background: {
        smooth: { color: colorMap.blueZodiac },
        Label: {
          smooth: { color: colorMap.white }
        }
      }
    });
  }
}
