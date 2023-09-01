import { Component } from "../core/core";
import movieStore, { searchMovies } from "../store/movie";

export default class Search extends Component {
  render() {
    this.el.classList.add("search");
    this.el.innerHTML = /* html */ `
    <input value="${movieStore.state.searchText}" placeholder="Enter the movie title to search :)"/>
    <button class="btn btn-primary">Search</button>
    `;

    //input에 입력된 값을 movieStore의 state 저장
    const inputEl = this.el.querySelector("input");
    inputEl.addEventListener("input", () => {
      movieStore.state.searchText = inputEl.value;
    });

    //검색을 하기위해 searchMovies()호출
    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && movieStore.state.searchText.trim()) {
        //영화검색 (fetch)
        searchMovies(1);
      }
    });

    const btnEl = this.el.querySelector(".btn");
    btnEl.addEventListener("click", () => {
      if (movieStore.state.searchText.trim()) {
        searchMovies(1);
      }
    });
  }
}
