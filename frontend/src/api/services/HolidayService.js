import api from "../api";

export const fetchHolidays = async (country, year) => {
    const response = await api.get(`/holidays?country=${country}&year=${year}`);
    return response.data;
};
