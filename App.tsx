
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import gradient from './images/gradient.webp';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import Docs from './views/Docs';

export const AppContent: React.FC = () => {
  const [view, setView] = React.useState('LANDING');

  const renderView = () => {
    switch (view) {
      case 'LANDING':
        return <Landing onEnter={() => setView('DASHBOARD')} onDocs={() => setView('DOCS')} />;
      case 'DASHBOARD':
        return <Dashboard onBack={() => setView('LANDING')} onNavigate={(v) => setView(v)} />;
      case 'DOCS':
        return <Docs onBack={() => setView('LANDING')} />;
      default:
        return <Landing onEnter={() => setView('DASHBOARD')} onDocs={() => setView('DOCS')} />;
    }
  };

  return (
    <div className="antialiased selection:bg-bio-red selection:text-white text-bio-black min-h-screen transition-colors duration-300">
      {renderView()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider image={gradient}>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;