import React from 'react';
import { useCurrentTime } from '../hooks/useTime';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { getNextPrayer, formatTime, formatCountdown, formatCurrentTime, getHijriDate, getGregorianDate } from '../utils/prayerCalculations';
import PrayerTimesBar from './PrayerTimesBar';
import CountdownCircle from './CountdownCircle';
import DuasPanel from './DuasPanel';
import AnnouncementsPanel from './AnnouncementsPanel';

const MainDisplay: React.FC = () => {
  const currentTime = useCurrentTime();
  const { prayerTimes, settings } = usePrayerTimes();

  const nextPrayer = prayerTimes ? getNextPrayer(prayerTimes, settings) : null;
  const isPortrait = settings.displayMode === 'portrait';

  if (isPortrait) {
    // تحديد الأنماط للوضع الطولي
    const containerStyle = {
      width: '100vh',
      height: '100vw',
      transformOrigin: 'top left',
      transform: 'rotate(-90deg) translateX(-100%)',
      position: 'fixed' as const,
      top: 0,
      left: 0
    };

    return (
      <div 
        className="min-h-screen text-white relative overflow-hidden"
        style={containerStyle}
      >
        {/* الخلفية الإسلامية */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${settings.backgroundImage})`
          }}
        />
        
        {/* طبقة تراكب شفافة */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

        {/* المحتوى في وضع الطول */}
        <div className="relative z-10 flex flex-col h-screen">
          {/* اسم المسجد */}
          <div className="text-center py-6">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-2xl" style={{ fontFamily: 'Amiri, serif' }}>
              {settings.mosqueName}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto drop-shadow-lg"></div>
          </div>

          {/* الوقت الحالي والتاريخ */}
          <div className="text-center mb-6">
            <div className="text-5xl font-bold mb-3 drop-shadow-2xl" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {formatCurrentTime(currentTime)}
            </div>
            
            <div className="space-y-1">
              <div className="text-lg text-emerald-200 drop-shadow-lg" style={{ fontFamily: 'Amiri, serif' }}>
                {getHijriDate()}
              </div>
              <div className="text-base text-blue-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {getGregorianDate()}
              </div>
            </div>
          </div>

          {/* العد التنازلي */}
          <div className="flex items-center justify-center mb-6">
            {nextPrayer && (
              <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-white/30">
                <div className="text-sm text-emerald-200 mb-2 drop-shadow-lg text-center" style={{ fontFamily: 'Amiri, serif' }}>
                  {nextPrayer.isIqamah ? 'الوقت المتبقي للإقامة' : 'الوقت المتبقي للأذان'}
                </div>
                
                <div className="text-2xl font-bold text-white mb-3 drop-shadow-lg text-center" style={{ fontFamily: 'Amiri, serif' }}>
                  صلاة {nextPrayer.name}
                </div>
                
                <div className="text-3xl font-mono font-bold text-yellow-300 mb-2 drop-shadow-lg">
                  {formatCountdown(nextPrayer.isIqamah ? nextPrayer.iqamahTime : nextPrayer.time)}
                </div>
                
                <div className="text-base text-white/80 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {formatTime(nextPrayer.isIqamah ? nextPrayer.iqamahTime : nextPrayer.time)}
                </div>
              </div>
            )}
          </div>

          {/* الأدعية والإعلانات - تحت بعضها البعض */}
          <div className="flex-1 px-4 mb-6 space-y-4">
            {/* الأدعية */}
            <div className="h-48">
              <DuasPanel duas={settings.duas} settings={settings} />
            </div>
            
            {/* الإعلانات */}
            <div className="h-48">
              <AnnouncementsPanel announcements={settings.announcements} settings={settings} />
            </div>
          </div>

          {/* شريط أوقات الصلاة */}
          {prayerTimes && (
            <div className="bg-black/40 backdrop-blur-sm border-t border-white/20 py-4">
              <div className="grid grid-cols-5 gap-2 px-4">
                {[
                  { name: 'الفجر', time: prayerTimes.fajr, delay: settings.iqamahDelays.fajr },
                  { name: 'الظهر', time: prayerTimes.dhuhr, delay: settings.iqamahDelays.dhuhr },
                  { name: 'العصر', time: prayerTimes.asr, delay: settings.iqamahDelays.asr },
                  { name: 'المغرب', time: prayerTimes.maghrib, delay: settings.iqamahDelays.maghrib },
                  { name: 'العشاء', time: prayerTimes.isha, delay: settings.iqamahDelays.isha }
                ].map((prayer) => {
                  const iqamahTime = new Date(prayer.time.getTime() + prayer.delay * 60000);
                  
                  return (
                    <div key={prayer.name} className="text-center">
                      <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg" style={{ fontFamily: 'Amiri, serif' }}>
                        {prayer.name}
                      </h3>
                      <div className="space-y-1">
                        <div className="text-sm text-emerald-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {formatTime(prayer.time)}
                        </div>
                        <div className="text-sm text-yellow-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {formatTime(iqamahTime)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // وضع العرض الأفقي (الافتراضي)
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* الخلفية الإسلامية */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${settings.backgroundImage})`
        }}
      />
      
      {/* طبقة تراكب شفافة */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

      {/* اسم المسجد */}
      <div className="relative z-10 text-center py-8">
        <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-2xl" style={{ fontFamily: 'Amiri, serif' }}>
          {settings.mosqueName}
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto drop-shadow-lg"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 flex flex-1 px-8 pb-32">
        {/* الأدعية - الجانب الأيمن */}
        <div className="w-1/4 pr-4">
          <DuasPanel duas={settings.duas} settings={settings} />
        </div>

        {/* الوسط - الوقت والعد التنازلي */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {/* الوقت الحالي */}
          <div className="text-center mb-8">
            <div className="text-7xl font-bold mb-4 drop-shadow-2xl" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {formatCurrentTime(currentTime)}
            </div>
            
            {/* التاريخ الهجري والميلادي */}
            <div className="space-y-2">
              <div className="text-xl text-emerald-200 drop-shadow-lg" style={{ fontFamily: 'Amiri, serif' }}>
                {getHijriDate()}
              </div>
              <div className="text-lg text-blue-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {getGregorianDate()}
              </div>
            </div>
          </div>

          {/* العد التنازلي للأذان القادم */}
          {nextPrayer && (
            <CountdownCircle
              nextPrayer={nextPrayer}
              countdown={formatCountdown(nextPrayer.isIqamah ? nextPrayer.iqamahTime : nextPrayer.time)}
            />
          )}
        </div>

        {/* الإعلانات - الجانب الأيسر */}
        <div className="w-1/4 pl-4">
          <AnnouncementsPanel announcements={settings.announcements} settings={settings} />
        </div>
      </div>

      {/* شريط أوقات الصلاة في الأسفل */}
      {prayerTimes && (
        <PrayerTimesBar prayerTimes={prayerTimes} settings={settings} />
      )}
    </div>
  );
};

export default MainDisplay;