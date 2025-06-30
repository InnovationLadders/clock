import { Coordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes, Madhab } from 'adhan';
import { PrayerTimes, NextPrayer, Settings } from '../types';

export const calculatePrayerTimes = (settings: Settings): PrayerTimes => {
  const coordinates = new Coordinates(settings.location.latitude, settings.location.longitude);
  const date = new Date();
  
  // اختيار طريقة الحساب
  let params;
  switch (settings.calculationMethod) {
    case 'UmmAlQura':
      params = CalculationMethod.UmmAlQura();
      break;
    case 'MuslimWorldLeague':
      params = CalculationMethod.MuslimWorldLeague();
      break;
    case 'Egyptian':
      params = CalculationMethod.Egyptian();
      break;
    case 'Karachi':
      params = CalculationMethod.Karachi();
      break;
    case 'NorthAmerica':
      params = CalculationMethod.NorthAmerica();
      break;
    default:
      params = CalculationMethod.UmmAlQura();
  }
  
  // تحديد المذهب
  params.madhab = settings.madhab === 'Hanafi' ? Madhab.Hanafi : Madhab.Shafi;
  
  const prayerTimes = new AdhanPrayerTimes(coordinates, date, params);
  
  return {
    fajr: prayerTimes.fajr,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha
  };
};

export const getNextPrayer = (prayerTimes: PrayerTimes, settings: Settings): NextPrayer | null => {
  const now = new Date();
  const prayers = [
    { name: 'الفجر', time: prayerTimes.fajr, delay: settings.iqamahDelays.fajr },
    { name: 'الظهر', time: prayerTimes.dhuhr, delay: settings.iqamahDelays.dhuhr },
    { name: 'العصر', time: prayerTimes.asr, delay: settings.iqamahDelays.asr },
    { name: 'المغرب', time: prayerTimes.maghrib, delay: settings.iqamahDelays.maghrib },
    { name: 'العشاء', time: prayerTimes.isha, delay: settings.iqamahDelays.isha }
  ];
  
  for (const prayer of prayers) {
    const iqamahTime = new Date(prayer.time.getTime() + prayer.delay * 60000);
    
    // إذا لم يحن وقت الأذان بعد
    if (prayer.time > now) {
      return {
        name: prayer.name,
        time: prayer.time,
        iqamahTime,
        isIqamah: false
      };
    }
    
    // إذا حان وقت الأذان ولكن لم يحن وقت الإقامة
    if (iqamahTime > now) {
      return {
        name: prayer.name,
        time: prayer.time,
        iqamahTime,
        isIqamah: true
      };
    }
  }
  
  // إذا انتهت جميع الصلوات، العودة لصلاة الفجر في اليوم التالي
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowCoordinates = new Coordinates(settings.location.latitude, settings.location.longitude);
  
  let params;
  switch (settings.calculationMethod) {
    case 'UmmAlQura':
      params = CalculationMethod.UmmAlQura();
      break;
    case 'MuslimWorldLeague':
      params = CalculationMethod.MuslimWorldLeague();
      break;
    case 'Egyptian':
      params = CalculationMethod.Egyptian();
      break;
    case 'Karachi':
      params = CalculationMethod.Karachi();
      break;
    case 'NorthAmerica':
      params = CalculationMethod.NorthAmerica();
      break;
    default:
      params = CalculationMethod.UmmAlQura();
  }
  
  params.madhab = settings.madhab === 'Hanafi' ? Madhab.Hanafi : Madhab.Shafi;
  const tomorrowPrayerTimes = new AdhanPrayerTimes(tomorrowCoordinates, tomorrow, params);
  
  return {
    name: 'الفجر',
    time: tomorrowPrayerTimes.fajr,
    iqamahTime: new Date(tomorrowPrayerTimes.fajr.getTime() + settings.iqamahDelays.fajr * 60000),
    isIqamah: false
  };
};

// تحويل الأرقام العربية إلى إنجليزية
const convertToEnglishNumbers = (str: string): string => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = str;
  for (let i = 0; i < arabicNumbers.length; i++) {
    result = result.replace(new RegExp(arabicNumbers[i], 'g'), englishNumbers[i]);
  }
  return result;
};

// تحويل الوقت إلى نظام 12 ساعة بدون AM/PM
const formatTo12Hour = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  
  // تحويل إلى نظام 12 ساعة
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours - 12;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const formatTime = (date: Date): string => {
  return convertToEnglishNumbers(formatTo12Hour(date));
};

export const formatCountdown = (targetTime: Date): string => {
  const now = new Date();
  const diff = targetTime.getTime() - now.getTime();
  
  if (diff <= 0) return '00:00:00';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatCurrentTime = (date: Date): string => {
  return convertToEnglishNumbers(formatTo12Hour(date));
};

export const getHijriDate = (): string => {
  const date = new Date();
  try {
    const hijriString = date.toLocaleDateString('ar-SA-u-ca-islamic', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return convertToEnglishNumbers(hijriString);
  } catch (error) {
    // في حالة فشل التحويل، استخدم تنسيق بديل
    return convertToEnglishNumbers(date.toLocaleDateString('ar-SA', {
      calendar: 'islamic',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }
};

export const getGregorianDate = (): string => {
  const date = new Date();
  try {
    // استخدام التقويم الميلادي بشكل صريح
    const gregorianString = date.toLocaleDateString('ar-SA', {
      calendar: 'gregory',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
    return convertToEnglishNumbers(gregorianString);
  } catch (error) {
    // في حالة فشل التحويل، استخدم تنسيق بديل
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    
    // محاولة استخدام اللغة الإنجليزية ثم ترجمة النتيجة
    const englishDate = date.toLocaleDateString('en-US', options);
    
    // ترجمة أيام الأسبوع والشهور إلى العربية
    const dayTranslations: { [key: string]: string } = {
      'Sunday': 'الأحد',
      'Monday': 'الاثنين',
      'Tuesday': 'الثلاثاء',
      'Wednesday': 'الأربعاء',
      'Thursday': 'الخميس',
      'Friday': 'الجمعة',
      'Saturday': 'السبت'
    };
    
    const monthTranslations: { [key: string]: string } = {
      'January': 'يناير',
      'February': 'فبراير',
      'March': 'مارس',
      'April': 'أبريل',
      'May': 'مايو',
      'June': 'يونيو',
      'July': 'يوليو',
      'August': 'أغسطس',
      'September': 'سبتمبر',
      'October': 'أكتوبر',
      'November': 'نوفمبر',
      'December': 'ديسمبر'
    };
    
    let arabicDate = englishDate;
    
    // ترجمة أيام الأسبوع
    Object.entries(dayTranslations).forEach(([english, arabic]) => {
      arabicDate = arabicDate.replace(english, arabic);
    });
    
    // ترجمة الشهور
    Object.entries(monthTranslations).forEach(([english, arabic]) => {
      arabicDate = arabicDate.replace(english, arabic);
    });
    
    return convertToEnglishNumbers(arabicDate);
  }
};