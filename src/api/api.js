import axios from "axios";

export const API_URL = 'https://startup-summer-2023-proxy.onrender.com/2.0/';
export const ACCESS_TOKEN = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
export const SECRET_KEY = 'GEU4nvd3rej*jeh.eqp';

const instance = axios.create({
    /* withCredentials: true, */
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-secret-key': SECRET_KEY,
        'x-api-app-id': ACCESS_TOKEN,
    },
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
});

instance.interceptors.response.use((config) => {
    return config;
}, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            alert('ПОПЫТКА К БЕГСТВИЮ!!!');
            const response = await axios.get(`${API_URL}oauth2/refresh_token/?refresh_token=${localStorage.getItem('refresh_token')}&client_id=2356&client_secret=${ACCESS_TOKEN}`);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            return instance.request(originalRequest);
        } catch (e) {
            alert('НЕ АВТОРИЗОВАН!!!');
        }
    }
    throw error;
});

export const authAPI = {
    async login() {
        const response = await instance.get(`oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=${ACCESS_TOKEN}&hr=0`);
        return response.data;
    },
    async refreshToken() {
        const response = await axios.get(`${API_URL}oauth2/refresh_token/`);
        return response.data;
    },
};

export const vacanciesAPI = {
    async getVacancies(count, page, catalogue, paymentFrom, paymentTo, searchKeyWord) {
        const response = await instance.get(`vacancies/?no_agreement=1&count=${count}&page=${page}&published=1&keyword=${searchKeyWord}&payment_from=${paymentFrom}&payment_to=${paymentTo}&catalogues=${catalogue}`);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log('some error occured');
        }
    },
    async getAllCatalogues() {
        const response = await instance.get(`catalogues/`,);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log('some error occured');
        }
    },
};

