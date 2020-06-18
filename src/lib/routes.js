import { Router } from 'wpe-lightning-sdk';
import { Splash, Main, Details, Player, NotFound } from '@/pages';
import { ROUTE_DETAILS, ROUTE_MOVIES, ROUTE_PLAY, ROUTE_SERIES, ROUTE_SPLASH } from '@/constants';

/**
 * Defines root and all possible application routes.
 */
export default () => {
  Router.root(ROUTE_SPLASH, Splash);
  Router.route(ROUTE_MOVIES, Main);
  Router.route(ROUTE_SERIES, Main);
  Router.route(ROUTE_DETAILS, Details);
  Router.route(ROUTE_PLAY, Player);

  Router.route('*', NotFound);

  Router.start();
};
