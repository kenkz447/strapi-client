import { TOKEN_KEY } from '@/configs';

const cookies = require('js-cookie');

export interface CookiesOption {
    readonly expires?: Date | number;
    readonly path?: string;
    readonly domain?: string;
    readonly secure?: boolean;
}

export const getToken = (): string | null => {
    const tokenFormCookies = cookies.get(TOKEN_KEY);
    return tokenFormCookies || null;
};

export const saveToken = (token: string, cookiesOption?: CookiesOption) => {
    cookies.set(TOKEN_KEY, token, cookiesOption);
};

export const clearToken = () => {
    cookies.remove(TOKEN_KEY);
};