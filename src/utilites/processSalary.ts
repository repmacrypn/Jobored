export const processSalaryFieldAccom = (from: number, to: number): string => {
    let result = 'з/п '

    if (from === 0 && to === 0) {
        return result + `по договоренности `
    } else if (from && to) {
        return result + `${from} - ${to} `
    } else if (from) {
        return result + `от ${from} `
    } else if (to) {
        return result + `${to} `
    }

    return 'не указана'
}