import axios from "axios";

export const Database = {
    getProducts: async (location) => {
        const queryString = location == null ? "" : `?location=${location}`
        const url = `${process.env.REACT_APP_BACKEND_URL}/db/getProducts${queryString}`;
        const response = await axios.get(url);
        return response.data;
    }
}

export const Orders = {
    add: async (cart, name, email, phone, address) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/orders/add`
        const response = await axios.post(url, { 
            "wantsToReceiveEmails": true,
            "Order": {
                "name": name,
                "email": email,
                "address": address,
                "phoneNumber": phone
            },
            "Items": cart
        })
        return response
    }
}

export const Auth = {
    getUser: async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/auth/getUser`;
        const response = await axios.get(url, { withCredentials: true }); //allows for cookie parsing
        return response.data;
    }
}