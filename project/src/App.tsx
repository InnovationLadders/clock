import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MainDisplay from './components/MainDisplay';
import Settings from './components/Settings';
import { setupDailyCleanup } from './utils/storage';
import { Settings as SettingsIcon } from 'lucide-react';

const MainApp: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [settingsKey, setSettingsKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // إعداد تنظيف الذاكرة اليومي
    setupDailyCleanup();
  }, []);

  const handleSettingsChange = () => {
    setSettingsKey(prev => prev + 1);
  };

  if (showSettings) {
    return (
      <Settings
        onBack={() => setShowSettings(false)}
        onSettingsChange={handleSettingsChange}
      />
    );
  }

  return (
    <div className="relative">
      <MainDisplay key={settingsKey} />
      
      {/* زر الإعدادات */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed top-4 left-4 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 z-50"
        title="الإعدادات"
      >
        <SettingsIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;