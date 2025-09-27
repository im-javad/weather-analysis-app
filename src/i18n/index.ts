import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      login: {
        nameLabel: "Enter your name",
        loginButton: "Login",
      },
      dashboard: {
        selectCity: "Search Your Location",
        currentWeather: "Weather Dashboard",
        forecast14Days: "2 weeks Forecast",
        monthlyAverage: "Average Monthly Temprature",
        loading: "Loading...",
        error: "Error loading data",
        min: "Hight",
        max: "Low",
        servedBy:
          "All rights of this site are reserved for Nadin Sadr Aria Engineering Company.",
        contactUs: "contact us : info@nadin.ir",
        published: "2025, September",
      },
      settings: {
        language: "Language",
        theme: "Mode",
        english: "En",
        persian: "Fa",
      },
      weather: {
        sunny: "Sunny",
        cloudy: "Cloudy",
        rain: "Rain",
        storm: "Storm",
        clear: "Clear",
        partlyCloudy: "Partly Cloudy",
      },
      months: {
        january: "jan",
        february: "Feb",
        march: "Mar",
        april: "Apr",
        may: "May",
        june: "Jun",
        july: "Jul",
        august: "Aug",
        september: "Sep",
        october: "Oct",
        november: "Nov",
        december: "Des",
      },
    },
  },
  fa: {
    translation: {
      login: {
        nameLabel: "نام خود را وارد کنید",
        loginButton: "ورود",
      },
      dashboard: {
        selectCity: "مکان مورد نظر را جستجو کنید",
        currentWeather: "داشبورد آب و هوا",
        forecast14Days: "پیش بینی 2 هفته",
        monthlyAverage: "میانگین دمای ماهانه",
        loading: "در حال بارگذاری...",
        error: "خطا در بارگذاری اطلاعات",
        min: "کمینه",
        max: "بیشینه",
        servedBy:
          "تمامی حقوق این سایت برای شرکت مهندسی نادین صدر آریا محفوظ است.",
        contactUs: "تماس با ما : info@nadin.ir",
        published: "2025, سپتامبر",
      },
      settings: {
        language: "زبان",
        theme: "حالت",
        english: "انگلیسی",
        persian: "فارسی",
      },
      weather: {
        sunny: "آفتابی",
        cloudy: "ابری",
        rain: "بارانی",
        storm: "طوفانی",
        clear: "صاف",
        partlyCloudy: "نیمه ابری",
      },
      months: {
        january: "ژا",
        february: "فو",
        march: "ما",
        april: "آو",
        may: "مه",
        june: "ژو",
        july: "ژئ",
        august: "اوت",
        september: "سپ",
        october: "اک",
        november: "نو",
        december: "دس",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
  });

export default i18n;
