import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const initialState = {
    filterData: {
        catalogue: '',
        paymentFrom: '',
        paymentTo: '',
        keyWord: '',
    },
}

export const filterSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        saveFilterData: (state, action) => {
            state.filterData = action.payload
            //проверить здесь потом небудет ли ререндериться весь филтер компонент
            //из-за того что присваивается новай обьект
        },
    },
})

export const { saveFilterData } = filterSlice.actions
export default filterSlice.reducer

export const extendedVacanciesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVacancies: builder.query({
            //у agreed есть дополнительная логика
            query: ({ count, page, catalogue, paymentFrom, paymentTo, searchKeyWord, agreed }) =>
                `vacancies/?no_agreement=${agreed}&count=${count}&page=${page}&published=1&keyword=${searchKeyWord}&payment_from=${paymentFrom}&payment_to=${paymentTo}&catalogues=${catalogue}`,
        }),
        getVacancy: builder.query({
            query: (vacancyId) => `vacancies/${vacancyId}`,
        }),
        getAllCatalogues: builder.query({
            query: () => 'catalogues/',
        }),
    })
})

export const { useGetAllCataloguesQuery, useLazyGetVacanciesQuery, useGetVacancyQuery } = extendedVacanciesApiSlice
