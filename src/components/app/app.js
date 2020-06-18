import { Lightning, Utils, Router } from 'wpe-lightning-sdk';
import { provider, routes, widgets, init as initApi, colorMap } from '@/lib';
import { Logo, Menu } from '@/widgets';
import { Background } from '@/components';
import {
  PAGES_TAG,
  SOURCE_SANS_PRO_BLACK,
  SOURCE_SANS_PRO_BOLD,
  SOURCE_SANS_PRO_REGULAR,
  WIDGETS_TAG
} from '@/constants';
import { createLoadingState, createWidgetsState } from '@/components/app/states';

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: SOURCE_SANS_PRO_REGULAR, url: Utils.asset('fonts/SourceSansPro-Regular.ttf'), descriptors: {} },
      { family: SOURCE_SANS_PRO_BLACK, url: Utils.asset('fonts/SourceSansPro-Black.ttf'), descriptors: {} },
      { family: SOURCE_SANS_PRO_BOLD, url: Utils.asset('fonts/SourceSansPro-Bold.ttf'), descriptors: {} }
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
        color: colorMap.black
      }
    };
  }

  static _states() {
    return [createLoadingState(this), createWidgetsState(this)];
  }

  get pages() {
    return this.tag(PAGES_TAG);
  }

  get widgets() {
    return this.tag(WIDGETS_TAG);
  }

  _getFocused() {
    return Router.getActivePage();
  }
}
