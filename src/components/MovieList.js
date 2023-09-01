import { Component } from "../core/core";
import movieStore from "../store/movie";
import MovieItem from "../components/MovieItem";

export default class MovieList extends Component {
  constructor() {
    super();
    //state가 변경될때마다 rendering
    movieStore.subscribe("movies", () => {
      this.render();
    });
    movieStore.subscribe("loading", () => {
      this.render();
    });
    movieStore.subscribe("message", () => {
      this.render();
    });
  }
  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html */ `
    ${
      movieStore.state.message
        ? `<div class="message">${movieStore.state.message}</div>`
        : `<div class="movies"></div>`
    }
    <div class="the-loader hide"></div>
`;

    const moviesEl = this.el.querySelector(".movies");
    //movieStore.state.movies=[{…}, {…}, {…}]
    //movie={Title: 'App', Year: '2013', imdbID: 'tt2536436'}
    moviesEl?.append(
      ...movieStore.state.movies.map(
        (movie) => new MovieItem({ movie: movie }).el
      )
    );

    //loading hide 관리
    const loaderEl = this.el.querySelector(".the-loader");
    movieStore.state.loading
      ? loaderEl.classList.remove("hide")
      : loaderEl.classList.add("hide");
  }
}
