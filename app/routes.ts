import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("/about", "routes/about.tsx"),
  ...prefix("/countries", [
    index("routes/countries/countries.tsx"),
    route("/:country", "routes//country/country.tsx"),
  ]),
] satisfies RouteConfig;
