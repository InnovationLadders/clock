import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MainDisplay from './components/MainDisplay';
import Settings from './components/Settings';
import { setupDailyCleanup } from './utils/storage';
import { Settings as SettingsIcon, Maximize, Minimize } from 'lucide-react';

const MainApp: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [settingsKey, setSettingsKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // إعداد تنظيف الذاكرة اليومي
    setupDailyCleanup();
  }, []);

  useEffect(() => {
    // مراقبة تغييرات وضع ملء الشاشة
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleSettingsChange = () => {
    setSettingsKey(prev => prev + 1);
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error('خطأ في تبديل وضع ملء الشاشة:', error);
    }
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
      
      {/* أزرار التحكم */}
      <div className="fixed top-4 left-4 flex space-x-2 space-x-reverse z-50">
        {/* زر ملء الشاشة */}
        <button
          onClick={toggleFullscreen}
          className="p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
          title={isFullscreen ? "الخروج من ملء الشاشة" : "ملء الشاشة"}
        >
          {isFullscreen ? (
            <Minimize className="w-6 h-6 text-white" />
          ) : (
            <Maximize className="w-6 h-6 text-white" />
          )}
        </button>

        {/* زر الإعدادات */}
        <button
          onClick={() => setShowSettings(true)}
          className="p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
          title="الإعدادات"
        >
          <SettingsIcon className="w-6 h-6 text-white" />
        </button>
      </div>
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