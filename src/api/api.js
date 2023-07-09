import axios from "axios";

export const API_URL = 'https://api.superjob.ru/2.0/';
export const ACCESS_TOKEN = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
export const SECRET_KEY = 'GEU4nvd3rej*jeh.eqp';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-secret-key': SECRET_KEY,
        'x-api-app-id': ACCESS_TOKEN,
    },
});

instance.interceptors.request.use((config) => {
    const access = localStorage.getItem('access_token');

    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
});

instance.interceptors.response.use((config) => {
    return config;
}, async error => {
    const originalRequest = error.config;
    if (error.response.status === 410 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await instance.get(`oauth2/refresh_token/?refresh_token=${localStorage.getItem('refresh_token')}&client_id=2356&client_secret=${ACCESS_TOKEN}`);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            return instance.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    }
    throw error;
});

export const authAPI = {
    async login() {
        const response = await instance.get(`oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=${ACCESS_TOKEN}&hr=0`);
        return response.data;
    },
};

export const vacanciesAPI = {
    async getVacancies(count, page, catalogue, paymentFrom, paymentTo, searchKeyWord) {
        let agreed = Number(!(paymentFrom === 0 && paymentTo === 0));

        const response = await instance.get(`vacancies/?no_agreement=${agreed}&count=${count}&page=${page}&published=1&keyword=${searchKeyWord}&payment_from=${paymentFrom}&payment_to=${paymentTo}&catalogues=${catalogue}`);
        return response.data;
    },
    async getAllCatalogues() {
        const response = await instance.get(`catalogues/`);
        return response.data;
    },
    async getVacancy(vacancyId) {
        const response = await instance.get(`vacancies/${vacancyId}`);
        return response.data;
    },
};

