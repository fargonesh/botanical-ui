import React, { useState } from 'react';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import Docs from './views/Docs';
import { ViewState } from './types';
import { ThemeProvider } from './contexts/ThemeContext';
import gradient from './images/gradient.webp';

const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);

  // Simple view switching based on state (SPA)
  const renderView = () => {
    switch (view) {
      case ViewState.LANDING:
        return <Landing onEnter={() => setView(ViewState.DASHBOARD)} onDocs={() => setView(ViewState.DOCS)} />;
      case ViewState.DASHBOARD:
        return <Dashboard onBack={() => setView(ViewState.LANDING)} onNavigate={(v) => setView(v)} />;
      case ViewState.DOCS:
        return <Docs onBack={() => setView(ViewState.LANDING)} />;
      default:
        return <Landing onEnter={() => setView(ViewState.DASHBOARD)} onDocs={() => setView(ViewState.DOCS)} />;
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