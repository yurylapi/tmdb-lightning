export const createWidgetsState = base =>
  class Widgets extends base {
    $enter(args, widget) {
      this._widget = widget;
      this._refocus();
    }

    _getFocused() {
      return this._widget;
    }
  };
