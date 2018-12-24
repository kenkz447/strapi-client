import { DEFAULT_APP_LANG } from '@/configs';

import { en, vi } from './translation';

const translationResources = {
    en,
    vi
};

export type AvaliableLanguage = keyof typeof translationResources;

export const avaliableLanguages: {
    readonly name: AvaliableLanguage,
    readonly label: string,
    readonly symbol: string
}[] = [
    { name: 'en', label: 'English', symbol: '🇬🇧' },
    { name: 'vi', label: 'Vietnamese', symbol: '🇻🇳' }
];

export const text = (source) => {
    let lang = localStorage.getItem('lang');
    if (!lang) {
        lang = DEFAULT_APP_LANG;
    }

    if (translationResources[lang]) {
        return translationResources[lang][source] || source;
    }

    return source;
};