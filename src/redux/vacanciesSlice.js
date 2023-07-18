import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const initialState = {
    filterData: {
        catalogue: '',
        paymentFrom: '',
        paymentTo: '',
        keyWord: '',
    },
    pageNumber: 0,
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
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload
        }
    },
})

export const selectFilterData = state => state.vacancies.filterData

export const { saveFilterData, setPageNumber } = filterSlice.actions
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

export const { useGetAllCataloguesQuery, useLazyGetVacanciesQuery, useGetVacancyQuery } = extendedVacanciesApiSlice
