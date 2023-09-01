import { Store } from "../core/core";

const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  //영화목록 (#Home)
  movies: [],
  //영화 상세정보 (#MOVIE)
  movie: {},
  loading: false,
  message: "Search for the movie title",
});

export default store;
export const searchMovies = async (page) => {
  store.state.loading = true;
  //함수호출시 매개변수 Page를 state의 Page에 업데이트
  store.state.page = page;

  //새로운 검색을 위한 초기화
  if (page === 1) {
    store.state.movies = [];
    store.state.message = "";
  }
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=7035c60c&s=${store.state.searchText}&page=${page}`
    );
    const { Search, totalResults, Response, Error } = await res.json();
    if (Response === "True") {
      // console.log(Search); //[{…}, {…}, {…}]
      //...Search는 검색한 내용, 누적해서 업데이트하기위해 앞에 또써줌
      store.state.movies = [...store.state.movies, ...Search];

      //pageMax
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
      //상태 초기화
      store.state.pageMax = 1;
    }
  } catch (error) {
    console.log("searchMovies error:", error);
  } finally {
    store.state.loading = false;
  }
};

//상세정보 얻어오기 (#MOVIE)
export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
    );
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails error:", error);
  }
};
