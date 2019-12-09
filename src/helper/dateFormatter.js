import moment from 'moment';

export function dateFormatter(selectedDate) {
    const date = moment(selectedDate);

    const day = date.date();
    const month = date.month();
    const year = date.year();

    return `${day}/${month+1}/${year}`;
}