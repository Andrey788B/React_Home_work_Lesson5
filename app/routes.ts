import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route("/", "src/App.tsx", [
    route("/signin", "src/pages/Signin.tsx"),
    route("/signup", "src/pages/Signup.tsx"),

    // приватные
    route("/characters", "src/pages/Characters.tsx"),
    route("/characters/:id", "src/pages/Character.tsx"),
    route("/locations", "src/pages/Locations.tsx"),
    route("/locations/:id", "src/pages/Location.tsx"),
    route("/episodes", "src/pages/Episodes.tsx"),
    route("/episodes/:id", "src/pages/Episode.tsx"),
  ]),

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!404 — всегда в конце!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  route('*', 'src/pages/NotFound.tsx'),
] satisfies RouteConfig;