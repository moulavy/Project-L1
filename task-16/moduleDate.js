import moment from 'moment';

function getCurrentDate() {
   return moment().format('DD-MM-YYYY');
}

function formatDate(date) {
   //Зададим формат входной даты 'DD-MM-YYYY'
   return moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY');
}

export { getCurrentDate, formatDate };
