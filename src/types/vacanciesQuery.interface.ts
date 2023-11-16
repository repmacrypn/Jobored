export interface IVacanciesQuery {
  agreed: number
  catalogue?: string | null
  paymentFrom?: '' | number
  paymentTo?: '' | number
  searchKeyWord?: string
  count?: number
  page?: number
}
