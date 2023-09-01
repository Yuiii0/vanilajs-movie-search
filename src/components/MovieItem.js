import { Component } from "../core/core";

export default class MovieItem extends Component {
  //props: movie
  //movieStore.state.movies=[{…}, {…}, {…}]
  //movie={Title: 'App', Year: '2013', imdbID: 'tt2536436'}
  constructor(props) {
    super({
      tagName: "a",
      props: props,
    });
  }
  render() {
    const { movie } = this.props;

    this.el.setAttribute("href", `#/movie?id=${movie.imdbID}`);
    this.el.classList.add("movie");
    this.el.style.backgroundImage = `url(${movie.Poster})`;
    this.el.innerHTML = /* html */ `
    <div class="info">
      <div class="year">${movie.Year}</div>
      <div class="title">${movie.Title}</div>
    </div>
    `;
  }
}
