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
    const code = currentMoment.format('YYMMDD-HHmmss');
    return code;
};