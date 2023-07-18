import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import { SECRET_KEY } from './apiSlice'

const initialState = {
    isAuth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
    },
})

export const selectIsAuth = (state) => state.auth.isAuth

export const { setIsAuth } = authSlice.actions
export default authSlice.reducer

export const extendedAuthApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query({
            query: () => `oauth2/password/?login=artik3267@gmail.com&password=VGcf6498&client_id=2355&client_secret=${SECRET_KEY}&hr=0`,
            transformResponse: transformData => {
                return { access_token: transformData.access_token, refresh_token: transformData.refresh_token }
            },
        }),
    })
})

export const { useLazyLoginQuery } = extendedAuthApiSlice