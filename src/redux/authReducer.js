import { authAPI } from "../api/api";

const TOGGLE_IS_AUTH = 'authReducer/TOGGLE_IS_AUTH';

const innitialState = {
    isAuth: false,
};

const authReducer = (state = innitialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_AUTH: {
            return {
                ...state,
                isAuth: action.payload,
            };
        }

        default: return state;
    }
};

const toggleIsAuth = (isAuth) => ({ type: TOGGLE_IS_AUTH, isAuth });

export const getLoginData = () => async (dispatch) => {
    try {
        const data = await authAPI.login();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        dispatch(toggleIsAuth(true));
    } catch (e) {
        console.log(e?.data?.message);
    }
};

export default authReducer;