import React, { useState, useEffect } from 'react';
import { Settings } from '../types';

interface DuasPanelProps {
  duas: string[];
  settings: Settings;
}

const DuasPanel: React.FC<DuasPanelProps> = ({ duas, settings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (duas.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % duas.length);
    }, 10000); // تغيير كل 10 ثوانٍ

    return () => clearInterval(interval);
  }, [duas.length]);

  if (duas.length === 0) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-b from-emerald-600/20 to-teal-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
        <h2 className="text-2xl font-bold text-center text-white mb-6" style={{ fontFamily: 'Amiri, serif' }}>
          أدعية وأذكار
        </h2>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p 
              className="leading-relaxed text-white"
              style={{ 
                fontFamily: `${settings.fontSettings.duasFontFamily}, serif`,
                fontSize: `${settings.fontSettings.duasFontSize}px`
              }}
            >
              {duas[currentIndex]}
            </p>
            
            {/* مؤشر الصفحات */}
            <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
              {duas.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuasPanel;