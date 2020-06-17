import { Router } from 'wpe-lightning-sdk';
import { Splash, Main, Details, Player, NotFound } from '@/pages';

/**
 * Defines root and all possible application routes.
 */
export default () => {
  Router.root('splash', Splash);
  Router.route('home/browse/movies', Main);
  Router.route('home/browse/series', Main);
  Router.route('details/:itemType/:itemId', Details);
  Router.route('details/:itemType/:itemId/play', Player);

  Router.route('*', NotFound);

  Router.start();
};
