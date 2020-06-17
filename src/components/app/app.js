import { Lightning, Utils, Router } from 'wpe-lightning-sdk';
import { provider, routes, widgets, init as initApi } from '@/lib';
import { Logo, Menu } from '@/widgets';
import { Background } from '@/components';

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: 'SourceSansPro-Regular', url: Utils.asset('fonts/SourceSansPro-Regular.ttf'), descriptors: {} },
      { family: 'SourceSansPro-Black', url: Utils.asset('fonts/SourceSansPro-Black.ttf'), descriptors: {} },
      { family: 'SourceSansPro-Bold', url: Utils.asset('fonts/SourceSansPro-Bold.ttf'), descriptors: {} }
    ];
  }

  _setup() {
    initApi(this.stage);

    Router.startRouter({
      appInstance: this,
      provider,
      routes,
      widgets
    });
  }

  static _template() {
    return {
      Background: {
        type: Background
      },
      Pages: {
        forceZIndexContext: true
      },
      Widgets: {
        Logo: {
          type: Logo,
          x: 100,
          y: 100
        },
        Menu: {
          type: Menu,
          x: 100,
          y: 100
        }
      },
      Loading: {
        rect: true,
        w: 1920,
        h: 1080,
        visible: false,
        color: 0xff000000
      }
    };
  }

  static _states() {
    return [
      class Loading extends this {
        $enter() {
          this.tag('Loading').visible = true;
        }

        $exit() {
          this.tag('Loading').visible = false;
        }
      },
      class Widgets extends this {
        $enter(args, widget) {
          this._widget = widget;
          this._refocus();
        }

        _getFocused() {
          return this._widget;
        }
      }
    ];
  }

  get pages() {
    return this.tag('Pages');
  }

  get widgets() {
    return this.tag('Widgets');
  }

  _getFocused() {
    return Router.getActivePage();
  }
}
