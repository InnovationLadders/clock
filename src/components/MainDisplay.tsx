import React from 'react';
import { useCurrentTime } from '../hooks/useTime';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { getNextPrayer, formatTime, formatCountdown, formatCurrentTime, getHijriDate, getGregorianDate } from '../utils/prayerCalculations';
import PrayerTimesBar from './PrayerTimesBar';
import CountdownCircle from './CountdownCircle';
import DuasPanel from './DuasPanel';
import AnnouncementsPanel from './AnnouncementsPanel';

const MainDisplay: React.FC = () => {
  console.log('MainDisplay component entered');
  
  const currentTime = useCurrentTime();
  const { prayerTimes, settings } = usePrayerTimes();

  console.log('MainDisplay - Prayer times and settings:', { prayerTimes, settings });

  const nextPrayer = prayerTimes ? getNextPrayer(prayerTimes, settings) : null;
  const isPortrait = settings.displayMode === 'portrait';

  console.log('MainDisplay - Next prayer:', nextPrayer);
  console.log('MainDisplay - Display mode:', settings.displayMode, 'isPortrait:', isPortrait);

  if (isPortrait) {
    console.log('Rendering in portrait mode');
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
          <div className="text-center py-4 md:py-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-2xl" style={{ fontFamily: 'Amiri, serif' }}>
              {settings.mosqueName}
            </h1>
            <div className="w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto drop-shadow-lg"></div>
          </div>

          {/* الوقت الحالي والتاريخ */}
          <div className="text-center mb-4 md:mb-6">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 drop-shadow-2xl" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {formatCurrentTime(currentTime)}
            </div>
            
            <div className="space-y-1">
              <div className="text-sm md:text-base lg:text-lg text-emerald-200 drop-shadow-lg" style={{ fontFamily: 'Amiri, serif' }}>
                {getHijriDate()}
              </div>
              <div className="text-xs md:text-sm lg:text-base text-blue-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {getGregorianDate()}
              </div>
            </div>
          </div>

          {/* العد التنازلي */}
          <div className="flex items-center justify-center mb-4 md:mb-6">
            {nextPrayer && (
              <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-white/30">
                <div className="text-xs md:text-sm text-emerald-200 mb-1 md:mb-2 drop-shadow-lg text-center" style={{ fontFamily: 'Amiri, serif' }}>
                  {nextPrayer.isIqamah ? 'الوقت المتبقي للإقامة' : 'الوقت المتبقي للأذان'}
                </div>
                
                <div className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg text-center" style={{ fontFamily: 'Amiri, serif' }}>
                  صلاة {nextPrayer.name}
                </div>
                
                <div className="text-xl md:text-2xl lg:text-3xl font-mono font-bold text-yellow-300 mb-1 md:mb-2 drop-shadow-lg">
                  {formatCountdown(nextPrayer.isIqamah ? nextPrayer.iqamahTime : nextPrayer.time)}
                </div>
                
                <div className="text-sm md:text-base text-white/80 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {formatTime(nextPrayer.isIqamah ? nextPrayer.iqamahTime : nextPrayer.time)}
                </div>
              </div>
            )}
          </div>

          {/* الأدعية والإعلانات - تحت بعضها البعض */}
          <div className="flex-1 px-4 pb-24 md:pb-28 space-y-3 md:space-y-4 overflow-y-auto">
            {/* الأدعية */}
            <div className="h-32 md:h-40 lg:h-48">
              <DuasPanel duas={settings.duas} settings={settings} />
            </div>
            
            {/* الإعلانات */}
            <div className="h-32 md:h-40 lg:h-48">
              <AnnouncementsPanel announcements={settings.announcements} settings={settings} />
            </div>
          </div>

          {/* شريط أوقات الصلاة */}
          {prayerTimes && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/20 py-3 md:py-4">
              <div className="grid grid-cols-5 gap-1 md:gap-2 px-4">
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
                      <h3 className="text-sm md:text-base lg:text-lg font-bold text-white mb-1 drop-shadow-lg" style={{ fontFamily: 'Amiri, serif' }}>
                        {prayer.name}
                      </h3>
                      <div className="space-y-1">
                        <div className="text-xs md:text-sm text-emerald-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {formatTime(prayer.time)}
                        </div>
                        <div className="text-xs md:text-sm text-yellow-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
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

  console.log('Rendering in landscape mode');
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
      <div className="relative z-10 text-center py-4 md:py-6 lg:py-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-2xl" style={{ fontFamily: 'Amiri, serif' }}>
          {settings.mosqueName}
        </h1>
        <div className="w-24 md:w-28 lg:w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto drop-shadow-lg"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 flex flex-1 px-4 md:px-6 lg:px-8 pb-40 md:pb-44 lg:pb-48">
        {/* الأدعية - الجانب الأيمن */}
        <div className="w-1/4 pr-2 md:pr-3 lg:pr-4">
          <DuasPanel duas={settings.duas} settings={settings} />
        </div>

        {/* الوسط - الوقت والعد التنازلي */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8">
          {/* الوقت الحالي */}
          <div className="text-center mb-4 md:mb-6 lg:mb-8">
            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 md:mb-3 lg:mb-4 drop-shadow-2xl" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {formatCurrentTime(currentTime)}
            </div>
            
            {/* التاريخ الهجري والميلادي */}
            <div className="space-y-1 md:space-y-2">
              <div className="text-base md:text-lg lg:text-xl text-emerald-200 drop-shadow-lg" style={{ fontFamily: 'Amiri, serif' }}>
                {getHijriDate()}
              </div>
              <div className="text-sm md:text-base lg:text-lg text-blue-200 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
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
        <div className="w-1/4 pl-2 md:pl-3 lg:pl-4">
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