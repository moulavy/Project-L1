import { getCurrentDate, formatDate } from './moduleDate.js';
const date1 = getCurrentDate();
console.log('Текущая дата', date1)

const date2 = formatDate('20-09-2000');
console.log('Мое день рождения', date2);