import { Router } from 'wpe-lightning-sdk';

/**
 * Sets widget components for specific routes.
 */
export default () => {
  Router.widget('splash');
  Router.widget('home/browse/movies', ['Menu', 'Logo']);
  Router.widget('home/browse/series', ['Menu', 'Logo']);
};
