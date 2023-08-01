import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiSlice, SECRET_KEY } from './apiSlice'
import { RootState } from './store'
import { IAuthTokensResponse } from '../types/authTokensRes.interface'

interface IAuthState {
    isAuth: boolean
}

const initialState: IAuthState = {
    isAuth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
})

export const selectIsAuth = (state: RootState) => state.auth.isAuth

export const { setIsAuth } = authSlice.actions
export default authSlice.reducer

export const extendedAuthApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query({
            query: () => `oauth2/password/?login=artik3267@gmail.com&password=VGcf6498&client_id=2355&client_secret=${SECRET_KEY}&hr=0`,
            transformResponse: (transformData: IAuthTokensResponse) => {
                return { access_token: transformData.access_token, refresh_token: transformData.refresh_token }
            },
        }),
    })
})

export const { useLazyLoginQuery } = extendedAuthApiSlice