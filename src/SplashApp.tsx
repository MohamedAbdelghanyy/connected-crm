import { Suspense, lazy, useEffect, useState } from 'react';
import AppLoading from './app/loading';

const App = lazy(() => import('./App'));

const SplashApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };
    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <AppLoading />
      ) : (
        <Suspense fallback={<AppLoading />}>
          <App />
        </Suspense>
      )}
    </div>
  );
};

export default SplashApp;
