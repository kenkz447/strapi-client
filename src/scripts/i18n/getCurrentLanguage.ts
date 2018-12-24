import { DEFAULT_APP_LANG } from '@/configs';

export const getCurrentLanguage = () => {
    return localStorage.getItem('lang') || DEFAULT_APP_LANG;
}