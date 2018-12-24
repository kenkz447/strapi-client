export const setCurrentLanguage = (langCode: string) => {
    return localStorage.setItem('lang', langCode);
};