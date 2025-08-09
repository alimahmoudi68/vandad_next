import momentj from 'moment-jalaali';

import moment from 'moment';
import 'moment/locale/fa';

export const showDateNow  = () =>{
    return momentj().format('jYYYY/jM/jD');
}


export const showDateFromNow = ( time: string | number | Date) => {
    return moment(time).fromNow();
}


export const showDateTime = (time : string | number | Date) => {
    return momentj(time).format('jYYYY/jM/jD - HH:mm');
}


export const showDate = (time : string | number | Date) => {
    return momentj(time).format('jYYYY/jM/jD');
}


