import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', '../App.tsx', [
    route('', '../pages/Signin.tsx'),
    route('/signin', '../pages/Signin.tsx'),
    route('/signup', '../pages/Signup.tsx'),

    // приватные
    route('/characters', '../pages/Characters.tsx'),
    route('/characters/:id', '../pages/Character.tsx'),
    route('/locations', '../pages/Locations.tsx'),
    route('/locations/:id', '../pages/Location.tsx'),
    route('/episodes', '../pages/Episodes.tsx'),
    route('/episodes/:id', '../pages/Episode.tsx'),
  ]),

  route('*', '../pages/NotFound.tsx'),
] satisfies RouteConfig;
