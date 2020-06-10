import { Movie, TvShow } from './models';

const apiKey = '66683917a94e703e14ca150023f4ea7c';
let stage;

export const init = stageInstance => {
  stage = stageInstance;
};

export const getMovies = async () => {
  const movies = await get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  const { results = [] } = movies;

  if (results.length) {
    return results.map(data => {
      return new Movie(data);
    });
  }

  return [];
};

export const getTvShows = async () => {
  const movies = await get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`);
  const { results = [] } = movies;

  if (results.length) {
    return results.map(data => {
      return new TvShow(data);
    });
  }

  return [];
};

const get = async url => {
  const stream = await fetch(url, {
    Accept: 'application/json'
  });
  return await stream.json();
};
