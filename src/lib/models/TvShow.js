import Movie from '@/lib/models/Movie';

export default class TvShow extends Movie {
  constructor(obj, genres) {
    super(obj, genres);
    this._title = obj.name;
  }
}
