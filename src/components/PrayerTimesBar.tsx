import React from 'react';
import { PrayerTimes, Settings } from '../types';
import { formatTime } from '../utils/prayerCalculations';

interface PrayerTimesBarProps {
  prayerTimes: PrayerTimes;
  settings: Settings;
}

const PrayerTimesBar: React.FC<PrayerTimesBarProps> = ({ prayerTimes, settings }) => {
  const prayers = [
    { name: 'الفجر', time: prayerTimes.fajr, delay: settings.iqamahDelays.fajr },
    { name: 'الظهر', time: prayerTimes.dhuhr, delay: settings.iqamahDelays.dhuhr },
    { name: 'العصر', time: prayerTimes.asr, delay: settings.iqamahDelays.asr },
    { name: 'المغرب', time: prayerTimes.maghrib, delay: settings.iqamahDelays.maghrib },
    { name: 'العشاء', time: prayerTimes.isha, delay: settings.iqamahDelays.isha }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/20">
      <div className="grid grid-cols-5 gap-2 md:gap-3 lg:gap-4 px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        {prayers.map((prayer) => {
          const iqamahTime = new Date(prayer.time.getTime() + prayer.delay * 60000);
          
          return (
            <div key={prayer.name} className="text-center">
              <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-2 md:mb-3 lg:mb-4 drop-shadow-lg" style={{ fontFamily: 'Amiri, serif' }}>
                {prayer.name}
              </h3>
              <div className="space-y-1 md:space-y-2 lg:space-y-3">
                <div className="text-sm md:text-lg lg:text-xl xl:text-2xl text-emerald-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {formatTime(prayer.time)}
                </div>
                <div className="text-sm md:text-lg lg:text-xl xl:text-2xl text-yellow-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {formatTime(iqamahTime)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrayerTimesBar;