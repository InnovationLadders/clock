// أنواع البيانات الأساسية
export interface Location {
  latitude: number;
  longitude: number;
  city: string;
}

export interface IqamahDelays {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

export interface FontSettings {
  duasFontFamily: string;
  duasFontSize: number;
  announcementsFontFamily: string;
  announcementsFontSize: number;
}

export interface Settings {
  mosqueName: string;
  displayMode: 'landscape' | 'portrait';
  location: Location;
  calculationMethod: 'UmmAlQura' | 'MuslimWorldLeague' | 'Egyptian' | 'Karachi' | 'NorthAmerica';
  madhab: 'Shafi' | 'Hanafi';
  iqamahDelays: IqamahDelays;
  fontSettings: FontSettings;
  backgroundImage: string;
  duas: string[];
  announcements: string[];
}

export interface PrayerTimes {
  fajr: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

export interface NextPrayer {
  name: string;
  time: Date;
  iqamahTime: Date;
  isIqamah: boolean;
}

// المدن السعودية مع إحداثياتها
export const SAUDI_CITIES = [
  { name: 'الرياض', latitude: 24.7136, longitude: 46.6877 },
  { name: 'جدة', latitude: 21.4858, longitude: 39.1925 },
  { name: 'مكة المكرمة', latitude: 21.3891, longitude: 39.8579 },
  { name: 'المدينة المنورة', latitude: 24.5247, longitude: 39.5692 },
  { name: 'الدمام', latitude: 26.4207, longitude: 50.0888 },
  { name: 'الخبر', latitude: 26.2172, longitude: 50.1971 },
  { name: 'الطائف', latitude: 21.2703, longitude: 40.4034 },
  { name: 'بريدة', latitude: 26.3260, longitude: 43.9750 },
  { name: 'تبوك', latitude: 28.3998, longitude: 36.5700 },
  { name: 'خميس مشيط', latitude: 18.3059, longitude: 42.7278 },
  { name: 'حائل', latitude: 27.5114, longitude: 41.6900 },
  { name: 'المجمعة', latitude: 25.9077, longitude: 45.3605 },
  { name: 'جيزان', latitude: 16.8892, longitude: 42.5511 },
  { name: 'نجران', latitude: 17.4924, longitude: 44.1277 },
  { name: 'الباحة', latitude: 20.0129, longitude: 41.4687 },
  { name: 'ينبع', latitude: 24.0896, longitude: 38.0618 },
  { name: 'القطيف', latitude: 26.5205, longitude: 49.9668 },
  { name: 'عرعر', latitude: 30.9753, longitude: 41.0381 },
  { name: 'سكاكا', latitude: 29.9697, longitude: 40.2064 },
  { name: 'أبها', latitude: 18.2164, longitude: 42.5053 }
];

// طرق حساب أوقات الصلاة
export const CALCULATION_METHODS = [
  { key: 'UmmAlQura', name: 'أم القرى (السعودية)' },
  { key: 'MuslimWorldLeague', name: 'رابطة العالم الإسلامي' },
  { key: 'Egyptian', name: 'الهيئة المصرية العامة للمساحة' },
  { key: 'Karachi', name: 'جامعة العلوم الإسلامية، كراتشي' },
  { key: 'NorthAmerica', name: 'الجمعية الإسلامية لأمريكا الشمالية' }
];

// المذاهب الفقهية
export const MADHABS = [
  { key: 'Shafi', name: 'الشافعي' },
  { key: 'Hanafi', name: 'الحنفي' }
];

// الخطوط المتاحة
export const FONT_FAMILIES = [
  { key: 'Amiri', name: 'أميري' },
  { key: 'Cairo', name: 'القاهرة' },
  { key: 'Noto Sans Arabic', name: 'نوتو سانس عربي' },
  { key: 'Tajawal', name: 'تجوال' }
];

// صور الخلفية المتاحة
export const BACKGROUND_IMAGES = [
  {
    name: 'مسجد كلاسيكي',
    url: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'مسجد حديث',
    url: 'https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'مسجد بالليل',
    url: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'الحرم المكي',
    url: 'https://images.pexels.com/photos/4668228/pexels-photo-4668228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'مسجد تقليدي',
    url: 'https://images.pexels.com/photos/1464207/pexels-photo-1464207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'مسجد بالغروب',
    url: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];