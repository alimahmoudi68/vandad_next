import momentj from 'moment-jalaali';

import moment from 'moment';
import 'moment/locale/fa';

export const showDateNow  = () =>{
    return momentj().format('jYYYY/jM/jD');
}


interface ShowDateProps {
    time: string | number | Date;
}

export const showDate = ({ time }: ShowDateProps) => {
    return moment(time).fromNow();
}

interface ShowDateTimeProps {
    time: string | number | Date;
}

export const showDateTime = ({ time }: ShowDateTimeProps) => {
    return momentj(time).format('jYYYY/jM/jD - HH:mm');
}

interface ShowAgeProps {
    birthday: string;
}

export const showAge = ({ birthday }: ShowAgeProps): number => {
    const miladiBirthday = momentj(`${birthday} 00:00`, 'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm');
    return moment().diff(moment(`${miladiBirthday}`, 'jYYYY-M-jD HH:mm'), 'years');
}

interface ShowDateChartProps {
    time: string | number | Date;
}

export const showDateChart = ({ time }: ShowDateChartProps) => {
    return momentj(time).format('jYYYY-jM-jD');
}


interface ShowDateMonthlyChartProps {
    time: string | number | Date;
}

export const showDateMonthlyChart = ({ time }: ShowDateMonthlyChartProps) => {
    return momentj(time).format('jYYYY-jM');
}