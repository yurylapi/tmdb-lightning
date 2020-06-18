import { Router } from 'wpe-lightning-sdk';
import { LOGO_WIDGET, MENU_WIDGET, ROUTE_MOVIES, ROUTE_SERIES, ROUTE_SPLASH } from '@/constants';

/**
 * Sets widget components for specific routes.
 */
export default () => {
  Router.widget(ROUTE_SPLASH);
  Router.widget(ROUTE_MOVIES, [MENU_WIDGET, LOGO_WIDGET]);
  Router.widget(ROUTE_SERIES, [MENU_WIDGET, LOGO_WIDGET]);
};
