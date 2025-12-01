import React from 'react';
import { ThemeProvider } from 'botanical-ui';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import Docs from './views/Docs';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import 'botanical-ui/style.css';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Landing onEnter={() => navigate('/dashboard')} onDocs={() => navigate('/docs')} />} />
      <Route path="/dashboard" element={<Dashboard onBack={() => navigate('/')} onNavigate={(v) => navigate(v === 'DOCS' ? '/docs' : '/dashboard')} />} />
      <Route path="/docs" element={<Docs onBack={() => navigate('/')} />} />
    </Routes>
  );
};

const ExampleApp: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="antialiased selection:bg-bio-primary selection:text-white bg-bio-white text-bio-black min-h-screen transition-colors duration-300">
          <AppRoutes />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default ExampleApp;
