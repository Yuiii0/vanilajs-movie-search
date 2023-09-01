import { createRouter } from "../core/core";
import Home from "./Home";
import Moive from "./Movie";
import About from "./About";
import NotFound from "./NotFound";

export default createRouter([
  {
    path: "#/",
    component: Home,
  },
  {
    path: "#/movie",
    component: Moive,
  },
  {
    path: "#/about",
    component: About,
  },
  {
    path: ".*",
    component: NotFound,
  },
]);
