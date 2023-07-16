export const processSalaryFieldAccom = (from, to) => {
    let result = 'з/п ';

    if (from === 0 && to === 0) {
        return result + `по договоренности `;
    } else if (from && to) {
        return result + `${from} - ${to} `;
    } else if (from) {
        return result + `от ${from} `;
    } else if (to) {
        return result + `${to} `;
    }

    return 'не указана';
};