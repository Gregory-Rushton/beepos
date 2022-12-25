import axios from "axios";

export const Database = {
    getProducts: async (location) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/db/getProducts?location=${location}`;
        const response = await axios.get(url);
        return response.data;
    }
}