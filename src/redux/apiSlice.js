import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/* export const API_URL = 'https://cors-anywhere.herokuapp.com/https://api.superjob.ru/2.0/'; */
export const API_URL_PROXY = 'https://proxy-jobored.onrender.com/proxy/';
export const SECRET_KEY = 'v3.r.137517554.6a3406a45db74566309a11194e021ee48878e9d2.7518f55ddb05ab00b122be23b82bf16a8ab671d5';

const defaultValidateStatus = (response) =>
    response.status >= 200 && response.status <= 299

const baseQuery = fetchBaseQuery({
    reducerPath: 'vacanciesApi',
    headers: {
        'x-api-app-id': SECRET_KEY,
    },
    prepareHeaders: (headers) => {
        const access = localStorage.getItem('access_token')

        if (access) {
            headers.set('authorization', `Bearer ${access}`)
        }

        return headers
    },
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 410) {
        // try to get a new token
        const refreshResult = await baseQuery(`oauth2/refresh_token/?refresh_token=${localStorage.getItem('refresh_token')}&client_id=2355&client_secret=${SECRET_KEY}`, api, extraOptions)
        if (refreshResult.data) {
            // store the new token
            localStorage.setItem('access_token', refreshResult.data.access_token);
            localStorage.setItem('refresh_token', refreshResult.data.refresh_token);
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            console.warn('api 410 user not auth error');
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'vacanciesApi',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        login: builder.query({
            query: () => `oauth2/password/?login=artik3267@gmail.com&password=VGcf6498&client_id=2355&client_secret=${SECRET_KEY}&hr=0`,
        }),
        //нужно будет разделить все и сделать inject endpoints
        getVacancies: builder.query({
            //у agreed есть дополнительная логика
            query: ({ count, page, catalogue, paymentFrom, paymentTo, searchKeyWord, agreed }) =>
                `vacancies/?no_agreement=${agreed}&count=${count}&page=${page}&published=1&keyword=${searchKeyWord}&payment_from=${paymentFrom}&payment_to=${paymentTo}&catalogues=${catalogue}`
            ,
        }),
        getVacancy: builder.query({
            query: (vacancyId) => `vacancies/${vacancyId}`,
        }),
        getAllCatalogues: builder.query({
            query: () => 'catalogues/',
        }),
    }),
})

export const { useGetPostsQuery, useLazyGetPostQuery, useAddNewPostMutation } = apiSlice