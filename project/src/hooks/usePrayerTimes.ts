import { useState, useEffect } from 'react';
import { PrayerTimes, Settings } from '../types';
import { calculatePrayerTimes } from '../utils/prayerCalculations';
import { getSettings } from '../utils/storage';

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [settings, setSettings] = useState<Settings>(getSettings());

  useEffect(() => {
    const updatePrayerTimes = () => {
      const times = calculatePrayerTimes(settings);
      setPrayerTimes(times);
    };

    updatePrayerTimes();
    
    // تحديث أوقات الصلاة كل دقيقة
    const interval = setInterval(updatePrayerTimes, 60000);
    
    return () => clearInterval(interval);
  }, [settings]);

  const refreshSettings = () => {
    setSettings(getSettings());
  };

  return { prayerTimes, settings, refreshSettings };
};