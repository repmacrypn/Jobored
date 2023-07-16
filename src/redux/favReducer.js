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
            action.isFav ?
                state.favourites.filter(fav => fav.id !== action.vacancy.id) :
                state.favourites.push(action.vacancy)
        },
        setFavTotalCount: (state, action) => {
            state.
        }
    },
})
export const { getFavourites, modifyFavArray } = favSlice.actions
export default favSlice.reducer
