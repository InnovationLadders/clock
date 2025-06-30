import React, { useState } from 'react';
import { Settings as SettingsType, SAUDI_CITIES, CALCULATION_METHODS, MADHABS, BACKGROUND_IMAGES, FONT_FAMILIES } from '../types';
import { getSettings, saveSettings } from '../utils/storage';
import { Settings as SettingsIcon, Save, Plus, Trash2, ArrowLeft, Image, Monitor, Smartphone, Type } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onSettingsChange: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, onSettingsChange }) => {
  const [settings, setSettings] = useState<SettingsType>(getSettings());
  const [newDua, setNewDua] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleSave = () => {
    saveSettings(settings);
    onSettingsChange();
    alert('تم حفظ الإعدادات بنجاح');
  };

  const addDua = () => {
    if (newDua.trim()) {
      setSettings(prev => ({
        ...prev,
        duas: [...prev.duas, newDua.trim()]
      }));
      setNewDua('');
    }
  };

  const removeDua = (index: number) => {
    setSettings(prev => ({
      ...prev,
      duas: prev.duas.filter((_, i) => i !== index)
    }));
  };

  const addAnnouncement = () => {
    if (newAnnouncement.trim()) {
      setSettings(prev => ({
        ...prev,
        announcements: [...prev.announcements, newAnnouncement.trim()]
      }));
      setNewAnnouncement('');
    }
  };

  const removeAnnouncement = (index: number) => {
    setSettings(prev => ({
      ...prev,
      announcements: prev.announcements.filter((_, i) => i !== index)
    }));
  };

  const selectCity = (city: typeof SAUDI_CITIES[0]) => {
    setSettings(prev => ({
      ...prev,
      location: {
        latitude: city.latitude,
        longitude: city.longitude,
        city: city.name
      }
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8 pb-24">
        {/* الهيدر */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <SettingsIcon className="w-8 h-8 ml-4" />
            <h1 className="text-4xl font-bold" style={{ fontFamily: 'Amiri, serif' }}>
              إعدادات الشاشة الدعوية
            </h1>
          </div>
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            العودة للشاشة الرئيسية
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* الإعدادات الأساسية */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Amiri, serif' }}>
              الإعدادات الأساسية
            </h2>
            
            {/* اسم المسجد */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">اسم المسجد</label>
              <input
                type="text"
                value={settings.mosqueName}
                onChange={(e) => setSettings(prev => ({ ...prev, mosqueName: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                style={{ fontFamily: 'Amiri, serif' }}
              />
            </div>

            {/* وضع العرض */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">وضع العرض</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSettings(prev => ({ ...prev, displayMode: 'landscape' }))}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    settings.displayMode === 'landscape'
                      ? 'border-emerald-400 bg-emerald-400/20'
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <Monitor className="w-5 h-5 ml-2" />
                  أفقي
                </button>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, displayMode: 'portrait' }))}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    settings.displayMode === 'portrait'
                      ? 'border-emerald-400 bg-emerald-400/20'
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 ml-2" />
                  طولي
                </button>
              </div>
            </div>

            {/* الموقع الجغرافي */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">الموقع الجغرافي</label>
              <select
                value={settings.location.city}
                onChange={(e) => {
                  const city = SAUDI_CITIES.find(c => c.name === e.target.value);
                  if (city) selectCity(city);
                }}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                {SAUDI_CITIES.map(city => (
                  <option key={city.name} value={city.name} className="bg-gray-800">
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* إعدادات مخصصة للموقع */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">خط العرض</label>
                <input
                  type="number"
                  step="0.0001"
                  value={settings.location.latitude}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    location: { ...prev.location, latitude: parseFloat(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">خط الطول</label>
                <input
                  type="number"
                  step="0.0001"
                  value={settings.location.longitude}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    location: { ...prev.location, longitude: parseFloat(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* إعدادات حساب الصلاة */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Amiri, serif' }}>
              إعدادات حساب الصلاة
            </h2>
            
            {/* طريقة الحساب */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">طريقة الحساب</label>
              <select
                value={settings.calculationMethod}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  calculationMethod: e.target.value as any 
                }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                {CALCULATION_METHODS.map(method => (
                  <option key={method.key} value={method.key} className="bg-gray-800">
                    {method.name}
                  </option>
                ))}
              </select>
            </div>

            {/* المذهب */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">المذهب</label>
              <select
                value={settings.madhab}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  madhab: e.target.value as any 
                }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                {MADHABS.map(madhab => (
                  <option key={madhab.key} value={madhab.key} className="bg-gray-800">
                    {madhab.name}
                  </option>
                ))}
              </select>
            </div>

            {/* أوقات الإقامة */}
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Amiri, serif' }}>
              المدة بين الأذان والإقامة (بالدقائق)
            </h3>
            
            {Object.entries(settings.iqamahDelays).map(([prayer, delay]) => (
              <div key={prayer} className="mb-3">
                <label className="block text-sm font-semibold mb-1">
                  {prayer === 'fajr' ? 'الفجر' :
                   prayer === 'dhuhr' ? 'الظهر' :
                   prayer === 'asr' ? 'العصر' :
                   prayer === 'maghrib' ? 'المغرب' : 'العشاء'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={delay}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    iqamahDelays: {
                      ...prev.iqamahDelays,
                      [prayer]: parseInt(e.target.value) || 1
                    }
                  }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            ))}
          </div>

          {/* إعدادات الخطوط */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ fontFamily: 'Amiri, serif' }}>
              <Type className="w-6 h-6 ml-2" />
              إعدادات الخطوط
            </h2>
            
            {/* خط الأدعية */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">الأدعية والأذكار</h3>
              
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-2">نوع الخط</label>
                <select
                  value={settings.fontSettings.duasFontFamily}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    fontSettings: { ...prev.fontSettings, duasFontFamily: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400"
                >
                  {FONT_FAMILIES.map(font => (
                    <option key={font.key} value={font.key} className="bg-gray-800">
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">حجم الخط: {settings.fontSettings.duasFontSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={settings.fontSettings.duasFontSize}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    fontSettings: { ...prev.fontSettings, duasFontSize: parseInt(e.target.value) }
                  }))}
                  className="w-full"
                />
              </div>
            </div>

            {/* خط الإعلانات */}
            <div>
              <h3 className="text-lg font-bold mb-3">الإعلانات</h3>
              
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-2">نوع الخط</label>
                <select
                  value={settings.fontSettings.announcementsFontFamily}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    fontSettings: { ...prev.fontSettings, announcementsFontFamily: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400"
                >
                  {FONT_FAMILIES.map(font => (
                    <option key={font.key} value={font.key} className="bg-gray-800">
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">حجم الخط: {settings.fontSettings.announcementsFontSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={settings.fontSettings.announcementsFontSize}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    fontSettings: { ...prev.fontSettings, announcementsFontSize: parseInt(e.target.value) }
                  }))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* الخلفية */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ fontFamily: 'Amiri, serif' }}>
              <Image className="w-6 h-6 ml-2" />
              خلفية الشاشة
            </h2>
            
            <div className="space-y-4">
              {BACKGROUND_IMAGES.map((bg, index) => (
                <div key={index} className="relative">
                  <input
                    type="radio"
                    id={`bg-${index}`}
                    name="background"
                    value={bg.url}
                    checked={settings.backgroundImage === bg.url}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      backgroundImage: e.target.value 
                    }))}
                    className="sr-only"
                  />
                  <label
                    htmlFor={`bg-${index}`}
                    className={`block cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      settings.backgroundImage === bg.url 
                        ? 'border-emerald-400 ring-2 ring-emerald-400/50' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={bg.url}
                      alt={bg.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2 bg-black/50">
                      <span className="text-sm text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>
                        {bg.name}
                      </span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* الأدعية والأذكار */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Amiri, serif' }}>
              الأدعية والأذكار
            </h2>
            
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDua}
                  onChange={(e) => setNewDua(e.target.value)}
                  placeholder="أضف دعاء جديد..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                  style={{ fontFamily: 'Amiri, serif' }}
                />
                <button
                  onClick={addDua}
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {settings.duas.map((dua, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                  <span className="flex-1 text-sm" style={{ fontFamily: 'Amiri, serif' }}>
                    {dua}
                  </span>
                  <button
                    onClick={() => removeDua(index)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* الإعلانات */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Amiri, serif' }}>
              إعلانات المسجد
            </h2>
            
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  placeholder="أضف إعلان جديد..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                  style={{ fontFamily: 'Cairo, sans-serif' }}
                />
                <button
                  onClick={addAnnouncement}
                  className="px-4 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {settings.announcements.map((announcement, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                  <span className="flex-1 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    {announcement}
                  </span>
                  <button
                    onClick={() => removeAnnouncement(index)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105"
          >
            <Save className="w-6 h-6 ml-2 inline" />
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;