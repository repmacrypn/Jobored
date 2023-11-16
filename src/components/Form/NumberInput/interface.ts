export interface ICustomNumberInput {
  keyWord: 'От' | 'До'
  value: number | ''
  handleChange: (currentValue: number | '', keyWord: 'От' | 'До') => void
}
