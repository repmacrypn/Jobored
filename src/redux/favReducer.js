const SET_FAVOURITES = 'favourites/SET_FAVOURITES';
const MODIFY_FAVOURITES_STATE = 'favourites/MODIFY_FAVOURITES_STATE';
const SET_CURRENT_PAGE = 'favourites/SET_CURRENT_PAGE';
const SET_FAV_TOTAL_COUNT = 'favourites/SET_FAV_TOTAL_COUNT';

const initialState = {
    favourites: [],
    currentFavArray: [],
    count: 4,
    totalCount: 0,
    currentPage: 0,
};

const vacanciesReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_FAVOURITES: {
            return {
                ...state,
                currentFavArray: [...action.favourites],
            };
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            };
        }

        case SET_FAV_TOTAL_COUNT: {
            return {
                ...state,
                totalCount: action.totalCount,
            };
        }

        case MODIFY_FAVOURITES_STATE: {
            return {
                ...state,
                favourites: action.isFav ?
                    state.favourites.filter(fav => fav.id !== action.vacancy.id) :
                    [...state.favourites, action.vacancy]
            };
        }

        default: return state;
    }
};

export const setFavourites = (favourites) => ({ type: SET_FAVOURITES, favourites, });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage, });
export const setFavTotalCount = (totalCount) => ({ type: SET_FAV_TOTAL_COUNT, totalCount, });
export const modifyFavArray = (vacancy, isFav) => ({ type: MODIFY_FAVOURITES_STATE, vacancy, isFav });
export default vacanciesReducer;
