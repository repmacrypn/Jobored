export const processSalaryFieldAccom = (from: number, to: number): string => {
  const result = 'з/п '

  if (from === 0 && to === 0) {
    return `${result}по договоренности `
  }
  if (from && to) {
    return `${result}${from} - ${to} `
  }
  if (from) {
    return `${result}от ${from} `
  }
  if (to) {
    return `${result}${to} `
  }

  return 'не указана'
}
