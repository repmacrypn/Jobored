export interface IVacanciesQuery {
    agreed: number;
    catalogue?: string;
    paymentFrom?: string;
    paymentTo?: string;
    searchKeyWord?: string;
    count: number;
    page: number;
}