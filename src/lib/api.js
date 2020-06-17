import { Asset, Detail } from '@/lib/models';
const apiKey = '66683917a94e703e14ca150023f4ea7c';
let stage;

/**
 * @param {Object} stageInstance
 */
export const init = stageInstance => {
  stage = stageInstance;
};

/**
 * @param {String} type
 * @return {Promise<Array|Asset[]>}
 */
export const getPopular = async type => {
  if (!type) {
    throw new Error('no type defined');
  }

  const assets = await get(`https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}`);
  const { results = [] } = assets;

  if (results.length) {
    return results.map(data => {
      const asset = new Asset(data);
      asset.type = type;

      return asset;
    });
  }
  return [];
};

/**
 * @param {String} type
 * @param {String} id
 * @return {Promise<Details>}
 */
export const getDetails = (type, id) => {
  return get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`).then(response => {
    return new Detail(response);
  });
};

/**
 * @param {String} url
 * @return {Promise<Object>}
 */
const get = url => {
  return fetch(url, {
    Accept: 'application/json'
  }).then(response => {
    return response.json();
  });
};
