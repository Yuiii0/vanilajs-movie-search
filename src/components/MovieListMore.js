import { Component } from "../core/core";
import movieStore, { searchMovies } from "../store/movie";

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });

    //pageMax 상태변화 구독
    movieStore.subscribe("pageMax", () => {
      const { page, pageMax } = movieStore.state;
      pageMax > page
        ? this.el.classList.remove("hide")
        : this.el.classList.add("hide");
    });
  }
  render() {
    this.el.classList.add("btn", "view-more", "hide");
    this.el.textContent = "View more...";

    //버튼 클릭시 다음 페이지 search (비동기처리)
    this.el.addEventListener("click", async () => {
      this.el.classList.add("hide");
      await searchMovies(movieStore.state.page + 1);
    });
  }
}
