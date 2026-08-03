import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {getSettings,updateSettings,} from "../services/settingsService";
const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettingsState] = useState({
    currency: '₹',
    currencyCode: 'INR',
    language: 'en',
    theme: 'light',
    notifications: { budgetAlerts: true, weeklySummary: true }
  });

  useEffect(() => {

    const loadSettings = async () => {

      try {

        const res = await getSettings();

        setSettingsState(prev => ({
          ...prev,
          ...res.settings
        }));

      } catch (error) {

        console.error("Error loading settings", error);

      }

    };

    loadSettings();

  }, []);

  useEffect(() => {

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(settings.theme);

    localStorage.setItem(
      "gromo_settings",
      JSON.stringify(settings)
    );

    const saveSettings = async () => {

      try {

        await updateSettings({
          theme: settings.theme,
          currency: settings.currencyCode,
          language: settings.language,
          notifications: settings.notifications
        });

      } catch (err) {

        console.error("Failed to save settings", err);

      }

    };

    saveSettings();

  }, [settings]);

  const setCurrency = useCallback((symbol, code) => {
    setSettingsState(prev => ({ ...prev, currency: symbol, currencyCode: code }));
  }, []);

  const setLanguage = useCallback((lang) => {
    setSettingsState(prev => ({ ...prev, language: lang }));
  }, []);

  const setTheme = useCallback((theme) => {
    setSettingsState(prev => ({ ...prev, theme }));
  }, []);

  const setNotification = useCallback((key, value) => {
    setSettingsState(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  }, []);

  const exportAllData = useCallback(() => {
    const expenses = localStorage.getItem('gromo_expenses');
    const budgets = localStorage.getItem('gromo_budgets');
    const userSettings = localStorage.getItem('gromo_settings');

    const data = {
      expenses: expenses ? JSON.parse(expenses) : [],
      budgets: budgets ? JSON.parse(budgets) : {},
      settings: userSettings ? JSON.parse(userSettings) : settings
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gromo_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [settings]);

  const importData = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.expenses) localStorage.setItem('gromo_expenses', JSON.stringify(data.expenses));
      if (data.budgets) localStorage.setItem('gromo_budgets', JSON.stringify(data.budgets));
      if (data.settings) localStorage.setItem('gromo_settings', JSON.stringify(data.settings));
      window.location.reload();
      return true;
    } catch (error) {
      console.error('Error importing data', error);
      return false;
    }
  }, []);

  const clearAllData = useCallback(() => {
    localStorage.removeItem('gromo_expenses');
    localStorage.removeItem('gromo_budgets');
    localStorage.removeItem('gromo_settings');
  }, []);

  const resetApp = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  const value = useMemo(() => ({
    ...settings,
    setCurrency,
    setLanguage,
    setTheme,
    setNotification,
    exportAllData,
    importData,
    clearAllData,
    resetApp
  }), [settings, setCurrency, setLanguage, setTheme, setNotification, exportAllData, importData, clearAllData, resetApp]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
