import axios from "axios";

const JOURNEY_API_BASE_URL = "http://localhost:8080/journey";
const JOURNEYDRIVER_API_BASE_URL = "http://localhost:8080/journeyDriver";

class JourneyService {
    getJourneys() {
        return axios.get(JOURNEY_API_BASE_URL + '/list');
    }

    getJourneyDriver() {
        return axios.get(JOURNEYDRIVER_API_BASE_URL + '/list');
    }

    getJourneyDriverBy(id) {
        return axios.get(JOURNEYDRIVER_API_BASE_URL + "/" + id);
    }

    addJourney(journey) {
        return axios.post(JOURNEY_API_BASE_URL, journey)
            .catch(error => {
                return error.response;
            });
    }

    getJourneyById(id) {
        return axios.get(JOURNEY_API_BASE_URL + '/' + id)
            .catch(error => {
                return error.response;
            });
        ;
    }

    updateJourney(id, journey) {
        return axios.put(JOURNEY_API_BASE_URL + '/' + id, journey)
            .catch(error => {
                return error.response;
            });
        ;
    }

    deleteJourney(id) {
        return axios.delete(JOURNEY_API_BASE_URL + '/' + id);
    }

    searchJourneys(id) {
        return axios.get(JOURNEY_API_BASE_URL + '/search/' + id);
    }

    fetchJourneys = async (currentPage) => {
        const res = await fetch(JOURNEY_API_BASE_URL + `/page/_pageNo=${currentPage}&_limit=5`);
        const data = await res.json();
        return data;
    }
}


export default new JourneyService();