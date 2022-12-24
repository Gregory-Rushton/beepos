import axios from "axios";


export const Ontology = {
    autocomplete: async (term) => {
        const headers = {Accept: 'application/json'};
        const url = 'https://consent-ontology.dsde-dev.broadinstitute.org/autocomplete?q=' + term;
        const response = await axios.get(url, headers);
        return response.data;
    }
};
