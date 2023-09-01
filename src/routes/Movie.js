import { Component } from "../core/core";
import movieStore, { getMovieDetails } from "../store/movie";

export default class Movie extends Component {
  async render() {
    this.el.classList.add("container", "the-movie");
    this.el.innerHTML = /* html */ `
      <div class="poster skeleton"></div>
      <div class="specs">
       <div class="title skeleton"></div>
       <div class="labels skeleton"></div>
       <div class="plot skeleton"></div>
      </div>
    `;

    //history state에 저장하는 query id 사용해서 movie 상세 정보가져오기 (현재 페이지 기준 id)
    await getMovieDetails(history.state.id);
    const { movie } = movieStore.state;
    const bigPoster = movie.Poster.replace("SX300", "SX700");

    this.el.innerHTML = /* html */ `
    <div class="poster" style="background-image:url(${bigPoster})"></div>
    <div class="specs">
      <div class="title">${movie.Title}</div>
      <div class="labels">
        <span>${movie.Released}</span>
        &nbsp;/&nbsp;
        <span>${movie.Runtime}</span>
        &nbsp;/&nbsp;
        <span>${movie.Country}</span>
      </div>
      <div class="plot">${movie.Plot}</div>
      <div>
        <h3>Ratings</h3>
        ${movie.Ratings.map((rating) => {
          return `<p>${rating.Source} - ${rating.Value}</p>`;
        }).join("")}
      </div>
        <h3>Actors</h3>
        <p>${movie.Actors}</p>
        <h3>Directors</h3>
        <p>${movie.Director}</p>
        <h3>Production</h3>
        <p>${movie.Production}</p>
        <h3>Genre</h3>
        <p>${movie.Genre}</p>
      </div>
    </div>
    `;
  }
}
