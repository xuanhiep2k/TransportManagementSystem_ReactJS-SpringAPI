import axios from "axios";

const ROUTE_API_BASE_URL = "http://localhost:8080/route";

class RouteService {
    getRoutes() {
        return axios.get(ROUTE_API_BASE_URL + '/list');
    }

    addRoute(route) {
        return axios.post(ROUTE_API_BASE_URL, route)
            .catch(error => {
                return error.response;
            });
    }

    getRouteById(id) {
        return axios.get(ROUTE_API_BASE_URL + '/' + id)
            .catch(error => {
                return error.response;
            });
        ;
    }

    updateRoute(id, route) {
        console.log(id)
        return axios.put(ROUTE_API_BASE_URL + '/' + id, route)
            .catch(error => {
                return error.response;
            });
        ;
    }

    deleteRoute(id) {
        return axios.delete(ROUTE_API_BASE_URL + '/' + id);
    }

    searchRoutes(id) {
        return axios.get(ROUTE_API_BASE_URL + '/search/' + id);
    }

    fetchRoutes = async (currentPage) => {
        const res = await fetch(ROUTE_API_BASE_URL + `/page/_pageNo=${currentPage}&_limit=5`);
        const data = await res.json();
        return data;
    }
}

export default new RouteService();