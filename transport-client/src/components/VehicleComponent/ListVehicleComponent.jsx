import React, {Component} from 'react';
import VehicleService from "../../services/VehicleService";
import ReactPaginate from "react-paginate";

class ListVehicleComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total: '',
            pageCount: '',
            key: '',
            vehicles: []
        }
        this.addVehicle = this.addVehicle.bind(this);
        this.updateVehicle = this.updateVehicle.bind(this);
        this.deleteVehicle = this.deleteVehicle.bind(this);
        this.searchVehicle = this.searchVehicle.bind(this);
    }

    updateVehicle(licensePlate) {
        this.props.history.push(`/update-vehicle/${licensePlate}`);
    }

    componentDidMount() {
        VehicleService.fetchVehicles(1).then(resp => {
            this.setState({vehicles: resp})
        })
        VehicleService.getVehicles().then(resp => {
            const total = resp.data.length;
            let pageCount = Math.ceil(total / 5);
            this.setState({pageCount: pageCount});
            this.setState({total: total})
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected + 1;
        VehicleService.fetchVehicles(selected).then(resp => {
            this.setState({vehicles: resp})
        })
    };

    addVehicle() {
        this.props.history.push('/add-vehicle');
    }

    deleteVehicle(licensePlate) {
        VehicleService.deleteVehicle(licensePlate).then(resp => {
            this.setState({
                vehicles: this.state.vehicles.filter(vehicle =>
                    vehicle.licensePlate !== licensePlate)
            });
            this.props.history.push('/vehicles');
        })
    }

    searchVehicle(key) {
        if (key.trim() === '') {
            return VehicleService.getVehicles().then((res) => {
                this.setState({vehicles: res.data});
                this.props.history.push(`/vehicles/${key}`);
            });
        } else {
            VehicleService.searchVehicles(key.trim()).then(resp => {
                this.setState({vehicles: resp.data})
            });
            this.props.history.push(`/vehicles/${key}`);
        }
    }

    inputKey = (event) => {
        this.setState({key: event.target.value});
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Danh s??ch xe</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addVehicle}>Th??m xe</button>
                    <p style={{margin: "auto"}} className="form-inline"></p>
                    <input className="form-inline" style={{marginLeft: "5px"}} placeholder="Nh???p bi???n s???"
                           name="key" value={this.state.key} onChange={this.inputKey}/>
                    <button className="btn btn-primary" onClick={() => this.searchVehicle(this.state.key)}
                            style={{marginLeft: "10px"}}>
                        T??m ki???m
                    </button>
                </div>
                <br/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>
                                <a href="/#">Bi???n s???</a>
                            </th>
                            <th>
                                <a href="/#">
                                    M??u xe</a>
                            </th>
                            <th>
                                <a href="/#">
                                    H??ng s???n xu???t</a>
                            </th>
                            <th>
                                <a href="/#">
                                    N??m s???n xu???t</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Model</a>
                            </th>
                            <th>
                                <a href="/#">
                                    S??? gh???</a>
                            </th>
                            <th>
                                <a href="/#">
                                    S??? n??m s??? d???ng</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Ng??y b???o d?????ng cu???i</a>
                            </th>
                            <th>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.vehicles.map(
                            vehicle =>
                                <tr key={vehicle.licensePlate}>
                                    <td>{vehicle.licensePlate}</td>
                                    <td>{vehicle.colour}</td>
                                    <td>{vehicle.manufacturer}</td>
                                    <td>{vehicle.manufacture_year}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.seat}</td>
                                    <td>{vehicle.year_of_use}</td>
                                    <td>{vehicle.maintenance_day}</td>
                                    <td>
                                        <button className="btn btn-info"
                                                onClick={() => this.updateVehicle(vehicle.licensePlate)}>S???a
                                        </button>
                                        <button className="btn btn-danger"
                                                onClick={() => this.deleteVehicle(vehicle.licensePlate)}
                                                style={{marginLeft: "10px"}}>X??a
                                        </button>
                                    </td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                    T???ng k???t qu???: {this.state.total} xe
                </div>
                <div>
                    {(this.state.pageCount > 1) ?
                        <ReactPaginate
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            pageCount={this.state.pageCount}
                            marginPageDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination justify-content-center'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                        /> : ''}
                </div>
            </div>
        );
    }
}

export default ListVehicleComponent;