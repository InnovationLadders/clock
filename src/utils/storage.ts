import { Settings } from '../types';

const LOCAL_STORAGE_KEY = 'mosqueDisplaySettings';

const getDefaultSettings = (): Settings => ({
  mosqueName: 'مسجد النور',
  displayMode: 'landscape',
  location: {
    latitude: 24.7136, // إحداثيات الرياض الافتراضية
    longitude: 46.6877,
    city: 'الرياض'
  },
  calculationMethod: 'UmmAlQura',
  madhab: 'Shafi',
  iqamahDelays: {
    fajr: 15,
    dhuhr: 15,
    asr: 15,
    maghrib: 10,
    isha: 15,
  },
  fontSettings: {
    duasFontFamily: 'Amiri',
    duasFontSize: 24,
    announcementsFontFamily: 'Cairo',
    announcementsFontSize: 24,
  },
  backgroundImage: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  duas: [
    'اللهم اهدنا فيمن هديت وعافنا فيمن عافيت وتولنا فيمن توليت',
    'سبحان الله وبحمده سبحان الله العظيم',
    'لا إله إلا أنت سبحانك إني كنت من الظالمين',
    'اللهم أعني على ذكرك وشكرك وحسن عبادتك',
    'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار'
  ],
  announcements: [
    'يرجى تسوية الصفوف وسد الفراغات',
    'أقيمت الصلاة، يرجى إغلاق الهواتف',
    'درس بعد صلاة المغرب مباشرة',
    'تبرعات لصيانة المسجد، جزاكم الله خيراً'
  ],
});

export const getSettings = (): Settings => {
  try {
    const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      // دمج الإعدادات المحفوظة مع الافتراضية للتأكد من وجود جميع الخصائص
      return { ...getDefaultSettings(), ...parsedSettings };
    }
  } catch (error) {
    console.error("فشل تحميل الإعدادات من التخزين المحلي، سيتم استخدام الإعدادات الافتراضية.", error);
  }
  return getDefaultSettings();
};

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    console.log("تم حفظ الإعدادات بنجاح في التخزين المحلي");
  } catch (error) {
    console.error("فشل حفظ الإعدادات في التخزين المحلي.", error);
  }
};

export const setupDailyCleanup = (): void => {
  // تنظيف بيانات قديمة من التخزين المحلي إذا لزم الأمر
  console.log("تم إعداد التنظيف اليومي للتخزين المحلي");
  
  // يمكن إضافة منطق تنظيف هنا مثل:
  // - حذف بيانات مؤقتة قديمة
  // - تحديث الإعدادات إذا تغير هيكلها
  
  try {
    // التأكد من أن الإعدادات محدثة بأحدث هيكل
    const currentSettings = getSettings();
    saveSettings(currentSettings);
  } catch (error) {
    console.error("خطأ في عملية التنظيف اليومي:", error);
  }
};

// دالة إضافية لإعادة تعيين الإعدادات للقيم الافتراضية
export const resetToDefaultSettings = (): void => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log("تم إعادة تعيين الإعدادات للقيم الافتراضية");
  } catch (error) {
    console.error("فشل في إعادة تعيين الإعدادات:", error);
  }
};

// دالة للتحقق من وجود إعدادات محفوظة
export const hasStoredSettings = (): boolean => {
  try {
    return localStorage.getItem(LOCAL_STORAGE_KEY) !== null;
  } catch (error) {
    console.error("فشل في التحقق من وجود إعدادات محفوظة:", error);
    return false;
  }
};