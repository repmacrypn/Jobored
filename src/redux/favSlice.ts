import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/redux/store'
import { IVacancy } from '@/types/vacancy.interface'

interface IFavState {
  favourites: IVacancy[]
  currentFavArray: IVacancy[]
  page: number
}

const initialState: IFavState = {
  favourites: [],
  currentFavArray: [],
  page: 0,
}

export const favSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    getFavourites: (state, action: PayloadAction<IVacancy[]>) => {
      state.currentFavArray = action.payload
    },
    modifyFavArray: (
      state,
      action: PayloadAction<{ vacancy: IVacancy; isFavCur: boolean }>,
    ) => {
      const { isFavCur, vacancy } = action.payload

      if (isFavCur) {
        state.favourites.filter((fav: IVacancy) => fav.id !== vacancy.id)
      } else {
        state.favourites.push(vacancy)
      }
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const selectFav = (state: RootState) => state.favourites.favourites

export const { getFavourites, modifyFavArray, setPageNumber } = favSlice.actions
export default favSlice.reducer
