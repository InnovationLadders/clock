import React, { useState, useEffect } from 'react';
import { Settings } from '../types';

interface AnnouncementsPanelProps {
  announcements: string[];
  settings: Settings;
}

const AnnouncementsPanel: React.FC<AnnouncementsPanelProps> = ({ announcements, settings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (announcements.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 8000); // تغيير كل 8 ثوانٍ

    return () => clearInterval(interval);
  }, [announcements.length]);

  if (announcements.length === 0) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-b from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
        <h2 className="text-2xl font-bold text-center text-white mb-6" style={{ fontFamily: 'Amiri, serif' }}>
          إعلانات المسجد
        </h2>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p 
              className="leading-relaxed text-white"
              style={{ 
                fontFamily: `${settings.fontSettings.announcementsFontFamily}, sans-serif`,
                fontSize: `${settings.fontSettings.announcementsFontSize}px`
              }}
            >
              {announcements[currentIndex]}
            </p>
            
            {/* مؤشر الصفحات */}
            <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
              {announcements.map((_, index) => (
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

export default AnnouncementsPanel;