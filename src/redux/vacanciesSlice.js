import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const initialState = {
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
        saveQueryData: (state, action) => {
            state.query = action.payload
        },
    },
})

export const selectQueryData = state => state.vacancies.query

export const { saveQueryData } = filterSlice.actions
export default filterSlice.reducer

export const extendedVacanciesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVacancies: builder.query({
            query: ({ agreed, count, page, catalogue = '', paymentFrom = '', paymentTo = '', searchKeyWord = '' }) =>
                `vacancies/?no_agreement=${agreed}&count=${count}&page=${page}&published=1&keyword=${searchKeyWord}&payment_from=${paymentFrom}&payment_to=${paymentTo}&catalogues=${catalogue}`,
            transformResponse: (responseData) => {
                return { vacancies: responseData.objects, total: responseData.total }
            }
        }),
        getVacancy: builder.query({
            query: (vacancyId) => `vacancies/${vacancyId}`,
        }),
        getAllCatalogues: builder.query({
            query: () => 'catalogues/',
        }),
    })
})

export const { useGetAllCataloguesQuery, useGetVacanciesQuery, useGetVacancyQuery } = extendedVacanciesApiSlice
