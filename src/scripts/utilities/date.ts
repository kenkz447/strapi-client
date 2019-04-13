import * as moment from 'moment';

export const formatDate = (date: Date | string | undefined, format: string) => {
    if (!date) {
        return '...';
    }
    const dateMoment = moment(date);
    return dateMoment.format(format);
};

export const getNextsDaysRange = (days: number): [moment.Moment, moment.Moment] => {
    return [moment(), moment().add('days', days)];
};

export const startAndEndOfTime = (date?: Date, unitOfTime: moment.unitOfTime.StartOf = 'month') => {
    let _date = date || new Date;

    return [moment(_date).startOf(unitOfTime), moment(_date).endOf(unitOfTime)];
};

export const dateToString = (value: unknown) => {
    if (moment.isDate(value) || moment.isMoment(value)) {
        return value.toISOString();
    }

    return value;
};

export const isFutureDate = (date: string | Date | moment.Moment) => {
    const today = new Date();
    const dateMoment = moment(date);

    const currentMomentDate = dateMoment.toDate();
    if (today < currentMomentDate) {
        return true;
    }

    return false;
};