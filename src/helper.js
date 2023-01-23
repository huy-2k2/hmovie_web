import { KEY_MOVIE_API } from "./config";

const BASE_URL = "https://api.themoviedb.org/3/";

function getApiUrlByType(query, page) {
  return `${BASE_URL}/movie/${query}/?api_key=${KEY_MOVIE_API}&page=${page}&language=vi-VN`;
}

function getImageUrl(url) {
  return `https://image.tmdb.org/t/p/original${url}`;
}

function getApiUrlGenres() {
  return `${BASE_URL}genre/movie/list?api_key=${KEY_MOVIE_API}&language=vi-VN`;
}

function getApiUrlByGenre(genreId, page = 1) {
  return `${BASE_URL}discover/movie?api_key=${KEY_MOVIE_API}&with_genres=${genreId}&page=${page}&language=vi-VN`;
}

function getApiUrlSearch(query, page = 1) {
  return `${BASE_URL}search/movie?api_key=${KEY_MOVIE_API}&query=${query}&page=${page}&language=vi-VN`;
}

function getApiUrlDetail(filmId) {
  return `${BASE_URL}movie/${filmId}?api_key=${KEY_MOVIE_API}&language=vi-VN`;
}

function getApiUrlVideo(filmId) {
  return `${BASE_URL}movie/${filmId}/videos?api_key=${KEY_MOVIE_API}`;
}

function getApiUrlActor(filmId) {
  return `${BASE_URL}/movie/${filmId}/credits?api_key=${KEY_MOVIE_API}`;
}

export {
  getApiUrlByType,
  getImageUrl,
  getApiUrlGenres,
  getApiUrlByGenre,
  getApiUrlSearch,
  getApiUrlDetail,
  getApiUrlVideo,
  getApiUrlActor,
};
