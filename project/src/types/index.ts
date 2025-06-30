export interface PrayerTimes {
  fajr: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

export interface Settings {
  mosqueName: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
  };
  calculationMethod: 'UmmAlQura' | 'MuslimWorldLeague' | 'Egyptian' | 'Karachi' | 'NorthAmerica';
  madhab: 'Shafi' | 'Hanafi';
  backgroundImage: string;
  displayMode: 'landscape' | 'portrait';
  fontSettings: {
    duasFontSize: number;
    duasFontFamily: string;
    announcementsFontSize: number;
    announcementsFontFamily: string;
  };
  iqamahDelays: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
  duas: string[];
  announcements: string[];
}

export interface NextPrayer {
  name: string;
  time: Date;
  iqamahTime: Date;
  isIqamah: boolean;
}

export const SAUDI_CITIES = [
  { name: 'الرياض', latitude: 24.7136, longitude: 46.6753 },
  { name: 'جدة', latitude: 21.4858, longitude: 39.1925 },
  { name: 'مكة المكرمة', latitude: 21.3891, longitude: 39.8579 },
  { name: 'المدينة المنورة', latitude: 24.5247, longitude: 39.5692 },
  { name: 'الدمام', latitude: 26.4207, longitude: 50.0888 },
  { name: 'الطائف', latitude: 21.2703, longitude: 40.4158 },
  { name: 'تبوك', latitude: 28.3998, longitude: 36.5700 },
  { name: 'بريدة', latitude: 26.3260, longitude: 43.9750 },
  { name: 'خميس مشيط', latitude: 18.3000, longitude: 42.7300 },
  { name: 'حائل', latitude: 27.5114, longitude: 41.6900 }
];

export const CALCULATION_METHODS = [
  { key: 'UmmAlQura', name: 'أم القرى (السعودية)' },
  { key: 'MuslimWorldLeague', name: 'رابطة العالم الإسلامي' },
  { key: 'Egyptian', name: 'الهيئة المصرية العامة للمساحة' },
  { key: 'Karachi', name: 'جامعة العلوم الإسلامية، كراتشي' },
  { key: 'NorthAmerica', name: 'الجمعية الإسلامية لأمريكا الشمالية' }
];

export const MADHABS = [
  { key: 'Shafi', name: 'الشافعي' },
  { key: 'Hanafi', name: 'الحنفي' }
];

export const BACKGROUND_IMAGES = [
  {
    name: 'المصباح',
    url: 'https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  },
  {
    name: 'الغروب',
    url: 'https://images.pexels.com/photos/4668228/pexels-photo-4668228.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  },
];

export const FONT_FAMILIES = [
  { key: 'Amiri', name: 'أميري (Amiri)' },
  { key: 'Cairo', name: 'القاهرة (Cairo)' },
  { key: 'Noto Sans Arabic', name: 'نوتو سانس عربي' },
  { key: 'Tajawal', name: 'تجوال (Tajawal)' }
];