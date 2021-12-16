import axios from "axios";

const VEHICLE_API_BASE_URL = "http://localhost:8080/vehicle";

class VehicleService {
    getVehicles() {
        return axios.get(VEHICLE_API_BASE_URL + '/list');
    }

    addVehicle(vehicle) {
        return axios.post(VEHICLE_API_BASE_URL, vehicle)
            .catch(error => {
                return error.response;
            });
    }

    getVehicleByLicensePlate(licensePlate) {
        return axios.get(VEHICLE_API_BASE_URL + '/' + licensePlate)
            .catch(error => {
                return error.response;
            });
        ;
    }

    updateVehicle(licensePlate, vehicle) {
        return axios.put(VEHICLE_API_BASE_URL + '/' + licensePlate, vehicle)
            .catch(error => {
                return error.response;
            });
        ;
    }

    deleteVehicle(licensePlate) {
        return axios.delete(VEHICLE_API_BASE_URL + '/' + licensePlate);
    }

    searchVehicles(licensePlate) {
        return axios.get(VEHICLE_API_BASE_URL + '/search/' + licensePlate);
    }

    fetchVehicles = async (currentPage) => {
        const res = await fetch(VEHICLE_API_BASE_URL + `/page/_pageNo=${currentPage}&_limit=5`);
        const data = await res.json();
        return data;
    }
}

export default new VehicleService()