import axios from "axios";

const DRIVER_API_BASE_URL = "http://localhost:8080/driver";

class DriverService {
    getDrivers() {
        return axios.get(DRIVER_API_BASE_URL + '/list');
    }

    addDriver(driver) {
        return axios.post(DRIVER_API_BASE_URL, driver)
            .catch(error => {
                return error.response;
            });
    }

    getDriverByIdCard(idCard) {
        return axios.get(DRIVER_API_BASE_URL + '/' + idCard)
            .catch(error => {
                return error.response;
            });
        ;
    }

    updateDriver(idCard, driver) {
        return axios.put(DRIVER_API_BASE_URL + '/' + idCard, driver)
            .catch(error => {
                return error.response;
            });
        ;
    }

    deleteDriver(idCard) {
        return axios.delete(DRIVER_API_BASE_URL + '/' + idCard);
    }

    searchDrivers(idCard) {
        return axios.get(DRIVER_API_BASE_URL + '/search/' + idCard);
    }

    fetchDrivers = async (currentPage) => {
        const res = await fetch(DRIVER_API_BASE_URL + `/page/_pageNo=${currentPage}&_limit=5`);
        const data = await res.json();
        return data;
    }
}

export default new DriverService()