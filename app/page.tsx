'use client';

import TrainingApp from './components/TrainingApp';

export default function Home() {
  const handleLogout = () => {
    console.log('Logout');
  };

  return <TrainingApp onLogout={handleLogout} />;
}
