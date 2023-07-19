import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favourites: [],
    currentFavArray: [],
}

export const favSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        getFavourites: (state, action) => {
            state.favourites = action.payload
        },
        modifyFavArray: (state, action) => {
            const { isFavCur, vacancy } = action.payload

            isFavCur ?
                state.favourites = state.favourites.filter(fav => fav.id !== vacancy.id) :
                state.favourites.push(vacancy)
        },
        setFavTotalCount: (state, action) => {
            action.payload.isFavCur ?
                state.favourites.length++ :
                state.favourites.length--
        },
    },
})

export const selectFav = (state) => state.favourites.favourites

export const { getFavourites, modifyFavArray, setFavTotalCount } = favSlice.actions
export default favSlice.reducer
