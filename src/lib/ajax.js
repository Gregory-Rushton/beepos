import axios from "axios";

export const Database = {
    getProducts: async (location) => {
        const queryString = location == null ? "" : `?location=${location}`
        const url = `${process.env.REACT_APP_BACKEND_URL}/db/getProducts${queryString}`;
        const response = await axios.get(url);
        return response.data;
    }
}

export const Auth = {
    getUser: async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/auth/getUser`;
        const response = await axios.get(url, { withCredentials: true }); //allows for cookie parsing
        return response.data;
    }
}