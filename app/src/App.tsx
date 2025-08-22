import { Link } from 'react-router-dom';

export default function App() {
  return (
    <main style={{ textAlign: 'center', padding: 40 }}>
      <h1>Rick and Morty Wiki</h1>
      <nav style={{ marginTop: 20 }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>
            <Link to='/characters'>Герои</Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to='/locations'>Локации</Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to='/episodes'>Эпизоды</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
