import { useState, useEffect } from 'react';
import { PrayerTimes, Settings } from '../types';
import { calculatePrayerTimes } from '../utils/prayerCalculations';
import { getSettings } from '../utils/storage';

export const usePrayerTimes = () => {
  console.log('usePrayerTimes hook entered');
  
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [settings, setSettings] = useState<Settings>(() => {
    const initialSettings = getSettings();
    console.log('usePrayerTimes - Initial settings from storage:', initialSettings);
    return initialSettings;
  });

  useEffect(() => {
    console.log('usePrayerTimes useEffect - updatePrayerTimes starting');
    const updatePrayerTimes = () => {
      console.log('usePrayerTimes - Calculating prayer times with settings:', settings);
      try {
        const times = calculatePrayerTimes(settings);
        console.log('usePrayerTimes - Calculated prayer times:', times);
        setPrayerTimes(times);
      } catch (error) {
        console.error('usePrayerTimes - Error calculating prayer times:', error);
      }
    };

    updatePrayerTimes();
    
    // تحديث أوقات الصلاة كل دقيقة
    const interval = setInterval(() => {
      console.log('usePrayerTimes - Interval update triggered');
      updatePrayerTimes();
    }, 60000);
    
    return () => {
      console.log('usePrayerTimes - Cleaning up interval');
      clearInterval(interval);
    };
  }, [settings]);

  const refreshSettings = () => {
    console.log('usePrayerTimes - refreshSettings called');
    const newSettings = getSettings();
    console.log('usePrayerTimes - New settings loaded:', newSettings);
    setSettings(newSettings);
  };

  console.log('usePrayerTimes - Returning:', { prayerTimes, settings });
  return { prayerTimes, settings, refreshSettings };
};