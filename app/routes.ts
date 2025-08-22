import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  // Главная
  index('src/App.tsx'),

  // characters
  route('/characters', 'src/pages/Characters.tsx'),
  route('/characters/:id', 'src/pages/Character.tsx'),

  // locations
  route('/locations', 'src/pages/Locations.tsx'),
  route('/locations/:id', 'src/pages/Location.tsx'),

  // episodes
  route('/episodes', 'src/pages/Episodes.tsx'),
  route('/episodes/:id', 'src/pages/Episode.tsx'),

  // 404 — всегда в конце!
  route('*', './src/pages/NotFound.tsx'),
] satisfies RouteConfig;
