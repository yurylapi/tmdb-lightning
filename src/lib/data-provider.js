import { Router } from 'wpe-lightning-sdk';
import { getDetails, getPopular } from '@/lib/api';

/**
 *  Binds a data request to a specific route, before a page load
 *  the router will test for any data-binding. If there is, it will
 *  wait for the promise to resolve and load the correct page.
 */
export default () => {
  /**
   * Provides data for every route.
   */
  Router.boot(async () => {});

  /**
   * Awaits the request data of popular movies before navigate to route.
   */
  Router.before(
    'home/browse/movies',
    async ({ page }) => {
      page.data = await getPopular('movie');
    },
    10 * 60 /* expires */
  );

  /**
   * Awaits the request data of popular tv shows before navigate to route.
   */
  Router.before(
    'home/browse/series',
    async ({ page }) => {
      page.data = await getPopular('tv');
    },
    10 * 60 /* expires */
  );

  /**
   * Awaits the request data of specific item before navigate to route.
   */
  Router.before('details/:itemType/:itemId', async ({ page, itemType, itemId }) => {
    page.details = await getDetails(itemType, itemId);
  });

  /**
   * Awaits the request data of playing video before navigate to route.
   */
  Router.before('details/:itemType/:itemId/play', async ({ page, itemType, itemId }) => {
    page.item = await getDetails(itemType, itemId);
  });
};
