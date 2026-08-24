'use client';

import { useEffect, useState } from 'react';
import Login from './components/Login';
import TrainingApp from './components/TrainingApp';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.status === 401) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    } catch (error) {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return authenticated ? (
    <TrainingApp onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
