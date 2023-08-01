import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

/* export const API_URL = 'https://cors-anywhere.herokuapp.com/https://api.superjob.ru/2.0/' */
/* export const API_URL = 'https://api.superjob.ru/2.0/' */
export const API_URL = 'https://proxy-jobored.onrender.com/proxy'
export const SECRET_KEY = 'v3.r.137517554.6a3406a45db74566309a11194e021ee48878e9d2.7518f55ddb05ab00b122be23b82bf16a8ab671d5'

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    headers: {
        'x-api-app-id': SECRET_KEY,
    },
    prepareHeaders: (headers) => {
        const access = localStorage.getItem('accessToken')

        if (access) {
            headers.set('authorization', `Bearer ${access}`)
        }

        return headers
    },
})

interface IRefreshTokenResult {
    access_token: string;
    refresh_token: string;
}

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 410) {
        // try to get a new token
        const refreshResult = await baseQuery(`oauth2/refresh_token/?refresh_token=${localStorage.getItem('refreshToken')}&client_id=2355&client_secret=${SECRET_KEY}`, api, extraOptions)
        const refreshData: IRefreshTokenResult = refreshResult?.data as IRefreshTokenResult
        if (refreshData) {
            // store the new token
            localStorage.setItem('accessToken', refreshData.access_token)
            localStorage.setItem('refreshToken', refreshData.refresh_token)
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            console.warn('api 401 user not auth error')
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'vacanciesApi',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({}),
})