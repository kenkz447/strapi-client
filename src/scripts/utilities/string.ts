import * as moment from 'moment';

export const randomString = (
    chars: number,
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    let result = '';

    // random last two chars
    for (let i = 0; i <= chars; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return result;
};

export const genCodeWithCurrentDate = (prefix?: string) => {
    const currentMoment = moment();
    const code = currentMoment.format('YYMMDDHHmmss');
    return prefix ? prefix + code : code;
};