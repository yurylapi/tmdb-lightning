import { Router } from 'wpe-lightning-sdk';
import { getMovies, getTvShows } from './api';

/**
 *  bind a data request to a specific route, before a page load
 *  the router will test for any data-binding. If there is, it will
 *  wait for the promise to resolve and load the correct page.
 *
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 *
 */
export default () => {
  Router.boot(async () => {
    // this will always be called
  });

  /**
   * @todo: inside this data-provider for the movies route
   * you must await for the getMovies() and invoke the data on the page
   */
  Router.before(
    'movies',
    async ({ page }) => {
      page.data = await getMovies();
    },
    10 * 60 /* expires */
  );

  Router.before(
    'series',
    async ({ page }) => {
      page.data = await getTvShows();
    },
    10 * 60 /* expires */
  );
};
