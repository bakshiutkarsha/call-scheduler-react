import moment from 'moment';

export const getFormattedDate = (date: Date): string => {
    return moment(date).format('h:mm a');
}

export const getDateFromHour = (hour: number): Date => {
    let date = new Date()
    date.setHours(hour)
    date.setMinutes(0)
    date.setSeconds(0)
    return date;
}