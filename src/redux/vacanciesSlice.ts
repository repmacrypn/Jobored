import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import { RootState } from './store'
import { IVacancy } from '../types/vacancy.interface'
import { IVacanciesQuery } from '../types/vacanciesQuery.interface'

interface IVacanciesState {
    query: IVacanciesQuery
}

const initialState: IVacanciesState = {
    query: {
        catalogue: '',
        paymentFrom: '',
        paymentTo: '',
        searchKeyWord: '',
        count: 4,
        page: 0,
        agreed: 0,
    },
}

export const filterSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        saveQueryData: (state, action: PayloadAction<IVacanciesQuery>) => {
            state.query = action.payload
        },
    },
})

export const selectQueryData = (state: RootState) => state.vacancies.query

export const { saveQueryData } = filterSlice.actions
export default filterSlice.reducer

interface IVacanciesResponseData {
    total: number;
    objects: IVacancy[];
}

export interface IAllCataloguesResponseData {
    key: number;
    title_trimmed: string;
}

export const extendedVacanciesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVacancies: builder.query({
            query: ({ agreed, count, page, catalogue = '', paymentFrom = '', paymentTo = '', searchKeyWord = '' }: IVacanciesQuery) =>
                `vacancies/?no_agreement=${agreed}&count=${count}&page=${page}&published=1&keyword=${searchKeyWord}&payment_from=${paymentFrom}&payment_to=${paymentTo}&catalogues=${catalogue}`,
            transformResponse: (responseData: IVacanciesResponseData) => {
                return { vacancies: responseData.objects, total: responseData.total }
            }
        }),
        getVacancy: builder.query<IVacancy, string>({
            query: (vacancyId) => `vacancies/${vacancyId}`,
        }),
        getAllCatalogues: builder.query<IAllCataloguesResponseData[], null>({
            query: () => 'catalogues/',
        }),
    })
})

export const { useGetAllCataloguesQuery, useGetVacanciesQuery, useGetVacancyQuery } = extendedVacanciesApiSlice
