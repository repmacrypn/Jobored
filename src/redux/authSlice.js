import { apiSlice } from './apiSlice'
import { SECRET_KEY } from './apiSlice'

export const extendedAuthApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query({
            query: () => `oauth2/password/?login=artik3267@gmail.com&password=VGcf6498&client_id=2355&client_secret=${SECRET_KEY}&hr=0`,
        }),
    })
})

export const { useLazyLoginQuery } = extendedAuthApiSlice