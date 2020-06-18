import { Lightning, Utils, Router } from 'wpe-lightning-sdk';
import { colorMap } from '@/lib';
import { LOGO_WIDGET, ROUTE_MOVIES, SPINNER_TAG } from '@/constants';

export default class Splash extends Lightning.Component {
  static _template() {
    const settings = { duration: 1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' };
    return {
      Background: {
        w: 1920,
        h: 1080,
        colorBottom: colorMap.black,
        scale: 1.2,
        src: Utils.asset('images/background.png'),
        transitions: {
          scale: settings,
          x: { duration: 3, delay: 1.2, timingFunction: 'ease-in' }
        }
      },
      Logo: {
        src: Utils.asset('images/logo-large.png'),
        mount: 0.5,
        x: 960,
        y: 640,
        alpha: 0.0001,
        transitions: {
          alpha: settings,
          y: settings
        }
      },
      Spinner: {
        src: Utils.asset('images/spinner.png'),
        mountX: 0.5,
        x: 960,
        y: 920,
        alpha: 0.001,
        color: colorMap.blurWhite,
        transitions: {
          alpha: settings
        }
      }
    };
  }

  _init() {
    this.tag(LOGO_WIDGET).on('txLoaded', () => {
      this.patch({
        Logo: { smooth: { alpha: 1, y: 540 } },
        Background: { smooth: { scale: 1 } }
      });
    });

    const spinnerTag = this.tag(SPINNER_TAG);
    spinnerTag.on('txLoaded', () => {
      spinnerTag.setSmooth('alpha', 1);
    });

    this._spinnerAnimation = this.animation({
      duration: 1,
      repeat: -1,
      actions: [{ t: SPINNER_TAG, p: 'rotation', sm: 0, v: { sm: 0, 0: 0, 1: Math.PI * 2 } }]
    });
  }

  _handleEnter() {
    Router.navigate(ROUTE_MOVIES);
  }

  _active() {
    this._spinnerAnimation.start();
  }

  _inactive() {
    this._spinnerAnimation.stop();
  }
}
