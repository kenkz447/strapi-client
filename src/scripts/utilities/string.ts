import * as moment from 'moment';

export const randomString = (
    chars: number,
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    let result = '';

    // random last two chars
    for (var i = 0; i <= chars; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return result;
};

export const genCodeWithCurrentDate = () => {
    const currentMoment = moment();
    let code = currentMoment.format('YYMMDDHHmm');
    const randomCode = randomString(2);
    return code + randomCode;
};