import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MainDisplay from './components/MainDisplay';
import Settings from './components/Settings';
import { setupDailyCleanup } from './utils/storage';
import { Settings as SettingsIcon, Maximize, Minimize } from 'lucide-react';

const MainApp: React.FC = () => {
  console.log('MainApp component entered');
  
  const [showSettings, setShowSettings] = useState(false);
  const [settingsKey, setSettingsKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  console.log('MainApp render - showSettings:', showSettings);
  console.log('MainApp render - isFullscreen:', isFullscreen);

  useEffect(() => {
    console.log('MainApp useEffect - setupDailyCleanup starting');
    // إعداد تنظيف الذاكرة اليومي
    setupDailyCleanup();
    console.log('MainApp useEffect - setupDailyCleanup completed');
  }, []);

  useEffect(() => {
    console.log('MainApp useEffect - fullscreen listener setup starting');
    // مراقبة تغييرات وضع ملء الشاشة
    const handleFullscreenChange = () => {
      const newFullscreenState = !!document.fullscreenElement;
      console.log('Fullscreen change detected:', newFullscreenState);
      setIsFullscreen(newFullscreenState);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    console.log('Fullscreen event listener added');
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      console.log('Fullscreen event listener removed');
    };
  }, []);

  const handleSettingsChange = () => {
    console.log('Settings changed, updating key');
    setSettingsKey(prev => prev + 1);
  };

  const toggleFullscreen = async () => {
    console.log('Toggle fullscreen clicked, current state:', isFullscreen);
    try {
      if (document.fullscreenElement) {
        console.log('Exiting fullscreen...');
        await document.exitFullscreen();
      } else {
        console.log('Entering fullscreen...');
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error('خطأ في تبديل وضع ملء الشاشة:', error);
    }
  };

  console.log('MainApp - About to render, showSettings state:', showSettings);

  if (showSettings) {
    console.log('Rendering Settings component');
    return (
      <Settings
        onBack={() => {
          console.log('Settings onBack called');
          setShowSettings(false);
        }}
        onSettingsChange={handleSettingsChange}
      />
    );
  }

  console.log('Rendering MainDisplay component with controls');

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
          style={{ display: 'block' }} // إضافة style صريح للتأكد من الظهور
        >
          {isFullscreen ? (
            <Minimize className="w-6 h-6 text-white" />
          ) : (
            <Maximize className="w-6 h-6 text-white" />
          )}
        </button>

        {/* زر الإعدادات */}
        <button
          onClick={() => {
            console.log('Settings button clicked');
            setShowSettings(true);
          }}
          className="p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
          title="الإعدادات"
          style={{ display: 'block' }} // إضافة style صريح للتأكد من الظهور
        >
          <SettingsIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* عنصر اختبار مرئي */}
      <div 
        className="fixed top-20 left-4 bg-red-500 text-white p-2 rounded z-50"
        style={{ fontSize: '12px' }}
      >
        Debug: showSettings={showSettings.toString()}, isFullscreen={isFullscreen.toString()}
      </div>
    </div>
  );
};

function App() {
  console.log('App component rendering');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;