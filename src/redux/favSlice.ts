import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favourites: [],
    currentFavArray: [],
    page: 0,
}

export const favSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        getFavourites: (state, action) => {
            state.currentFavArray = action.payload
        },
        modifyFavArray: (state, action) => {
            const { isFavCur, vacancy } = action.payload

            isFavCur ?
                state.favourites = state.favourites.filter(fav => fav.id !== vacancy.id) :
                state.favourites.push(vacancy)
        },
        setPageNumber: (state, action) => {
            state.page = action.payload
        }
    },
})

export const selectFav = (state) => state.favourites.favourites

export const { getFavourites, modifyFavArray, setPageNumber } = favSlice.actions
export default favSlice.reducer
