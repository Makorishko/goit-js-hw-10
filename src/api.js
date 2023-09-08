import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_ZR73vW3tt5i83HEPNPodBUVw325nxhTg697a8rGx7QXosAthSkmj7dI1z87bvYJE";

export function fetchBreeds() { 
    return axios.get('https://api.thecatapi.com/v1/breeds');
};

export function fetchCatByBreed(breedId){ 
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=` + breedId);
}