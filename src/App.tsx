import { createSignal, createEffect, Component } from 'solid-js';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';


const App: Component = () => {
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | null>(null);

  createEffect(() => {
    const authStatus = JSON.parse(localStorage.getItem('is_authenticated') || 'null');
    setIsAuthenticated(authStatus);
  });

  return (
    <>
      {isAuthenticated() ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
