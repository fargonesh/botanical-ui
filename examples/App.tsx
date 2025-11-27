import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Landing from '../views/Landing';
import Dashboard from '../views/Dashboard';
import Docs from '../views/Docs';
import { ViewState } from '../types';

const AppContent: React.FC = () => {
  const [view, setView] = React.useState<ViewState>(ViewState.LANDING);

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
    <div className="antialiased selection:bg-bio-primary selection:text-white bg-bio-white text-bio-black min-h-screen transition-colors duration-300">
      {renderView()}
    </div>
  );
};

const ExampleApp: React.FC = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default ExampleApp;
