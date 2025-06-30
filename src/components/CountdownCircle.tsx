import React from 'react';
import { NextPrayer } from '../types';
import { formatTime } from '../utils/prayerCalculations';

interface CountdownCircleProps {
  nextPrayer: NextPrayer;
  countdown: string;
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({ nextPrayer, countdown }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* الدائرة الخارجية */}
      <div className="w-full max-w-80 aspect-square rounded-full border-4 border-white/20 flex items-center justify-center relative">
        {/* الدائرة الداخلية */}
        <div className="w-4/5 h-4/5 rounded-full bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-white/30">
          {/* نوع العد التنازلي */}
          <div className="text-sm md:text-base lg:text-lg text-emerald-200 mb-1 md:mb-2 drop-shadow-lg text-center" style={{ fontFamily: 'Amiri, serif' }}>
            {nextPrayer.isIqamah ? 'الوقت المتبقي للإقامة' : 'الوقت المتبقي للأذان'}
          </div>
          
          {/* اسم الصلاة */}
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3 lg:mb-4 drop-shadow-lg text-center" style={{ fontFamily: 'Amiri, serif' }}>
            صلاة {nextPrayer.name}
          </div>
          
          {/* العد التنازلي */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-yellow-300 mb-1 md:mb-2 drop-shadow-lg">
            {countdown}
          </div>
          
          {/* وقت الصلاة */}
          <div className="text-sm md:text-base lg:text-lg text-white/80 drop-shadow-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {formatTime(nextPrayer.isIqamah ? nextPrayer.iqamahTime : nextPrayer.time)}
          </div>
        </div>
        
        {/* نقاط زخرفية حول الدائرة */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 bg-white/40 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-45%)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CountdownCircle;