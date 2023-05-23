export const processSalaryFieldAccom = (from, to) => {
    let result = 'з/п ';
    if (from === 0 && to === 0) {
        result += `по договоренности `;
    } else if (from && to) {
        result += `${from} - ${to} `;
    } else if (from) {
        result += `от ${from} `;
    } else if (to) {
        result += `${to} `;
    } else {
        result = 'не указана';
    }

    return result;
};