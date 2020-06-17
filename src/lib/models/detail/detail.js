export default class Details {
  /**
   * @param {{
   *  adult: Boolean,
   *  backdrop_path: String,
   *  belongs_to_collection: Object
   *  budget: Number
   *  genres: Array
   *  homepage: String
   *  id: Number
   *  imdb_id: String
   *  original_language: String
   *  original_title: String
   *  overview: String
   *  popularity: Number
   *  poster_path: String
   *  production_companies: Array
   *  production_countries: Array
   *  release_date: String
   *  first_air_date: String
   *  revenue: Number
   *  runtime: Number
   *  spoken_languages: Array
   *  status: String
   *  tagline: String
   *  title: String
   *  name: String
   *  video: Boolean|String
   *  vote_average: Number
   *  vote_count: Number
   * }} obj
   */
  constructor(obj) {
    this._adult = obj.adult;
    this._backdrop_path = obj.backdrop_path;
    this._belong_to_collection = obj.belongs_to_collection;
    this._budget = obj.budget;
    this._genres = obj.genres;
    this._homepage = obj.homepage;
    this._id = obj.id;
    this._imdb_id = obj.imdb_id;
    this._original_language = obj.original_language;
    this._original_title = obj.original_title;
    this._overview = obj.overview;
    this._popularity = obj.popularity;
    this._poster_path = obj.poster_path;
    this._production_companies = obj.production_companies;
    this._production_countries = obj.production_countries;
    this._release_date = new Date(obj.release_date || obj.first_air_date);
    this._revenue = obj.revenue;
    this._runtime = obj.runtime;
    this._spoken_languages = obj.spoken_languages;
    this._status = obj.status;
    this._tagline = obj.tagline;
    this._title = obj.title || obj.name;
    this._video = obj.video;
    this._vote_average = obj.vote_average;
    this._vote_count = obj.vote_count;
  }

  /**
   * @return {Boolean}
   */
  get adult() {
    return this._adult;
  }

  /**
   * @return {String}
   */
  get background() {
    return this._backdrop_path;
  }

  /**
   * @return {Object}
   */
  get belongToCollection() {
    return this._belong_to_collection;
  }

  /**
   * @return {Number}
   */
  get budget() {
    return this._budget;
  }

  /**
   * @return {Array}
   */
  get genres() {
    return this._genres;
  }

  /**
   * @return {String}
   */
  get homepage() {
    return this._homepage;
  }

  /**
   * @return {Number}
   */
  get id() {
    return this._id;
  }

  /**
   * @return {String}
   */
  get imdbId() {
    return this._imdb_id;
  }

  /**
   * @return {String}
   */
  get originalLanguage() {
    return this._original_language;
  }

  /**
   * @return {String}
   */
  get originalTitle() {
    return this._original_title;
  }

  /**
   * @return {String}
   */
  get overview() {
    return this._overview;
  }

  /**
   * @return {Number}
   */
  get popularity() {
    return this._popularity;
  }

  /**
   * @return {String}
   */
  get poster() {
    return this._poster_path;
  }

  /**
   * @return {Array}
   */
  get productionCompanies() {
    return this._production_companies;
  }

  /**
   * @return {Array}
   */
  get productionCountries() {
    return this._production_countries;
  }

  /**
   * @return {Date}
   */
  get releaseDate() {
    return this._release_date;
  }

  /**
   * @return {Number}
   */
  get revenue() {
    return this._revenue;
  }

  /**
   * @return {Number}
   */
  get runtime() {
    return this._runtime;
  }

  /**
   * @return {Array}
   */
  get spokenLanguages() {
    return this._spoken_languages;
  }

  /**
   * @return {String}
   */
  get status() {
    return this._status;
  }

  /**
   * @return {String}
   */
  get tagline() {
    return this._tagline;
  }

  /**
   * @return {String}
   */
  get title() {
    return this._title;
  }

  /**
   * @return {Boolean|String}
   */
  get video() {
    return this._video;
  }

  /**
   * @return {String}
   */
  get stream() {
    return 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4';
  }

  /**
   * @return {Number}
   */
  get voteAverage() {
    return this._vote_average;
  }

  /**
   * @return {Number}
   */
  get voteCount() {
    return this._vote_count;
  }
}
