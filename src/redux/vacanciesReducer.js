import { vacanciesAPI } from "../api/api";

const SET_VACANCIES = 'vacancies/SET_USERS';
const SET_CURRENT_PAGE = 'vacancies/SET_CURRENT_PAGE';
const SET_PRELOADER = 'vacancies/SET_PRELOADER';
const SET_TOTAL_COUNT = 'vacancies/SET_TOTAL_COUNT';
const SET_CATALOGUE = 'vacancies/SET_CATALOGUE';
const SET_ALL_CATALOGUES = 'vacancies/SET_ALL_CATALOGUES';
const SET_PAYMENT_FROM = 'vacancies/SET_PAYMENT_FROM';
const SET_PAYMENT_TO = 'vacancies/SET_PAYMENT_TO';
const SET_KEYWORD = 'vacancies/SET_KEYWORD';
const SET_VACANCY = 'vacancies/SET_VACANCY';

const initialState = {
    vacancies: [],
    portionSise: 3,
    count: 4,
    totalCount: 0,
    currentPage: 0,
    isFetching: false,
    allCatalogues: [],
    catalogue: '',
    paymentFrom: '',
    paymentTo: '',
    keyWord: '',
    vacancy: {},
};

const vacanciesReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_VACANCIES: {
            return {
                ...state,
                vacancies: [...action.vacancies],
            };
        }

        case SET_VACANCY: {
            return {
                ...state,
                vacancy: action.vacancy,
            };
        }

        case SET_CATALOGUE: {
            return {
                ...state,
                catalogue: action.catalogue,
            };
        }

        case SET_ALL_CATALOGUES: {
            return {
                ...state,
                allCatalogues: action.allCatalogues,
            };
        }

        case SET_PAYMENT_FROM: {
            return {
                ...state,
                paymentFrom: action.paymentFrom,
            };
        }

        case SET_PAYMENT_TO: {
            return {
                ...state,
                paymentTo: action.paymentTo,
            };
        }

        case SET_KEYWORD: {
            return {
                ...state,
                keyWord: action.keyWord,
            };
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            };
        }

        case SET_TOTAL_COUNT: {
            let total = action.totalCount;
            if (total > 500) total = 500;

            return {
                ...state,
                totalCount: total,
            };
        }

        case SET_PRELOADER: {
            return {
                ...state,
                isFetching: action.isFetching,
            };
        }

        default: return state;
    }
};

const setVacancies = (vacancies) => ({ type: SET_VACANCIES, vacancies, });
const setPreloader = (isFetching) => ({ type: SET_PRELOADER, isFetching, });
const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount, });
const setAllCatalogues = (allCatalogues) => ({ type: SET_ALL_CATALOGUES, allCatalogues, });
const setVacancy = (vacancy) => ({ type: SET_VACANCY, vacancy, });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage, });
export const setCatalogue = (catalogue) => ({ type: SET_CATALOGUE, catalogue, });
export const setPaymentFrom = (paymentFrom) => ({ type: SET_PAYMENT_FROM, paymentFrom, });
export const setPaymentTo = (paymentTo) => ({ type: SET_PAYMENT_TO, paymentTo, });
export const setKeyWord = (keyWord) => ({ type: SET_KEYWORD, keyWord, });

const getVacancies = async (count, currentPage, catalogue, paymentFrom,
    paymentTo, searchKeyWord, dispatch, isTotalNeeded = false) => {
    dispatch(setPreloader(true));

    const data = await vacanciesAPI.getVacancies(count, currentPage,
        catalogue, paymentFrom, paymentTo, searchKeyWord);

    dispatch(setVacancies(data.objects));
    if (isTotalNeeded) {
        dispatch(setTotalCount(data.total));
    }
    dispatch(setPreloader(false));
};

export const getVacanciesOnFieldLoad = (count, currentPage, catalogue = '', paymentFrom = '',
    paymentTo = '', searchKeyWord = '') => async (dispatch) => {

        getVacancies(count, currentPage, catalogue, paymentFrom,
            paymentTo, searchKeyWord, dispatch, true);

        dispatch(setCatalogue(catalogue));
        dispatch(setPaymentFrom(paymentFrom));
        dispatch(setPaymentTo(paymentTo));
        dispatch(setKeyWord(searchKeyWord));
    };

export const getVacanciesOnFieldChange = (count, pageNumber, catalogue = '',
    paymentFrom = '', paymentTo = '', searchKeyWord = '') => async (dispatch) => {

        getVacancies(count, pageNumber, catalogue, paymentFrom,
            paymentTo, searchKeyWord, dispatch);

        dispatch(setCurrentPage(pageNumber));
    };

export const getAllCatalogues = () => async (dispatch) => {
    const data = await vacanciesAPI.getAllCatalogues();

    dispatch(setAllCatalogues(data));
};

export const getVacancy = (vacancyId) => async (dispatch) => {
    dispatch(setPreloader(true));

    const data = await vacanciesAPI.getVacancy(vacancyId);

    dispatch(setVacancy(data));
    dispatch(setPreloader(false));
};

export default vacanciesReducer;
