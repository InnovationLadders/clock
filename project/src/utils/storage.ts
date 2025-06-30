import { Settings } from '../types';

const STORAGE_KEY = 'mosque_display_settings';

// الإعدادات الافتراضية
const DEFAULT_SETTINGS: Settings = {
  mosqueName: 'مسجد الهدى',
  location: {
    latitude: 24.7136,
    longitude: 46.6753,
    city: 'الرياض'
  },
  calculationMethod: 'UmmAlQura',
  madhab: 'Shafi',
  backgroundImage: 'https://images.pexels.com/photos/4668228/pexels-photo-4668228.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  displayMode: 'landscape',
  fontSettings: {
    duasFontSize: 24,
    duasFontFamily: 'Amiri',
    announcementsFontSize: 24,
    announcementsFontFamily: 'Cairo'
  },
  iqamahDelays: {
    fajr: 20,
    dhuhr: 10,
    asr: 10,
    maghrib: 5,
    isha: 10
  },
  duas: [
    'اللهم اغفر لي ذنبي وخطئي وجهلي',
    'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار',
    'اللهم أعني على ذكرك وشكرك وحسن عبادتك',
    'سبحان الله وبحمده سبحان الله العظيم',
    'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير',
    'اللهم صل وسلم على نبينا محمد وعلى آله وصحبه أجمعين'
  ],
  announcements: [
    'درس العصر يوم الخميس بعد صلاة العصر',
    'تبرعات لصيانة المسجد',
    'حلقة تحفيظ القرآن للأطفال',
    'محاضرة دينية يوم الجمعة بعد صلاة المغرب',
    'دروس تعليم التجويد للكبار'
  ]
};

// دالة مساعدة لدمج الكائنات بعمق
const deepMerge = (target: any, source: any): any => {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
};

export const getSettings = (): Settings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedSettings = JSON.parse(stored);
      // دمج الإعدادات المحفوظة مع الإعدادات الافتراضية لضمان وجود جميع الخصائص المطلوبة
      return deepMerge(DEFAULT_SETTINGS, parsedSettings);
    }
  } catch (error) {
    console.warn('Error parsing stored settings, using defaults:', error);
  }
  
  return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

// تنظيف الذاكرة يومياً في الساعة 12 صباحاً
export const setupDailyCleanup = (): void => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const msUntilMidnight = tomorrow.getTime() - now.getTime();
  
  setTimeout(() => {
    // تنظيف الذاكرة
    if (window.gc) {
      window.gc();
    }
    
    // إعادة تحميل الصفحة لضمان الأداء الأمثل
    window.location.reload();
    
    // جدولة التنظيف التالي
    setupDailyCleanup();
  }, msUntilMidnight);
};