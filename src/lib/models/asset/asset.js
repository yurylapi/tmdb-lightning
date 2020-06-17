export default class Asset {
  /**
   * @param {{
   *  adult: Boolean,
   *  backdrop_path: String,
   *  id: Number
   *  original_language: String
   *  overview: String
   *  popularity: Number
   *  poster_path: String
   *  release_date: String
   *  first_air_date: String
   *  title: String
   *  name: String
   *  video: Boolean|String
   *  vote_average: Number
   *  vote_count: Number
   * }} obj
   * @param {Array} genres
   */
  constructor(obj, genres) {
    this._adult = obj.adult;
    this._backdrop_path = obj.backdrop_path;
    this._id = obj.id;
    this._original_language = obj.original_language;
    this._overview = obj.overview;
    this._popularity = obj.popularity;
    this._poster_path = obj.poster_path;
    this._release_date = obj.release_date || obj.first_air_date;
    this._title = obj.title || obj.name;
    this._video = obj.video;
    this._vote_average = obj.vote_average;
    this._vote_count = obj.vote_count;
  }

  get adult() {
    return this._adult;
  }

  get background() {
    return this._backdrop_path;
  }

  get genres() {
    return this._genres;
  }

  get id() {
    return this._id;
  }

  get originalLanguage() {
    return this._original_language;
  }

  get overview() {
    return this._overview;
  }

  get popularity() {
    return this._popularity;
  }

  get poster() {
    return this._poster_path;
  }

  get releaseDate() {
    return this._release_date;
  }

  get title() {
    return this._title;
  }

  get type() {
    return this._type;
  }

  set type(v) {
    this._type = v;
  }

  get video() {
    return this._video;
  }

  get stream() {
    return 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4';
  }

  get voteAverage() {
    return this._vote_average;
  }

  get voteCount() {
    return this._vote_count;
  }
}
