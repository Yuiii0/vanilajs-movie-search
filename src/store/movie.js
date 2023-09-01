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
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({
        title: store.state.searchText,
        page,
      }),
    });
    const { Response, Search, totalResults, Error } = await res.json();
    if (Response === "True") {
      store.state.movies = [...store.state.movies, ...Search];
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
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
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails error:", error);
  }
};
