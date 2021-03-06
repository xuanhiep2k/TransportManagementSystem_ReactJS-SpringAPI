import React, {Component} from 'react';
import JourneyService from "../../services/JourneyService";

class StatisticalDriverComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            vehiclesCount: [],
            vehicles: [],
        }
        this.totalRevenue = this.totalRevenue.bind(this);

    }

    componentDidMount() {
        JourneyService.getJourneys().then(resp => {
            const vehicle = resp.data
            this.setState({journeyDriver: vehicle})
            this.state.journeyDriver.map(res => {
                let revenue = 0;
                revenue = res.guest_quanity * res.fare;
                this.state.vehicles.push(res.vehicle.licensePlate.concat(" / ")
                    .concat(res.route.first_point + " - " + res.route.end_point).concat(" / ")
                    .concat(res.guest_quanity).concat(" / ")
                    .concat(res.fare).concat(" / ")
                    .concat(revenue.toString()))

            })
            this.state.vehicles.map(resp => {
                this.state.vehiclesCount.push({
                    licensePlate: resp.toString().split(' / ')[0],
                    route: resp.toString().split(' / ')[1],
                    guest_quanity: resp.toString().split(' / ')[2],
                    fare: resp.toString().split(' / ')[3],
                    revenue: resp.toString().split(' / ')[4]
                })
            })
            let arr = this.state.vehiclesCount.sort((a, b) => (a.licensePlate > b.licensePlate) ? 1 : -1)

            const convert = (arr) => {
                const res = {};
                arr.forEach((obj) => {
                    const key = obj.licensePlate;
                    if (!res[key]) {
                        res[key] = {
                            ...obj,
                            count: 0
                        };
                        res[key].revenue = 0;
                    }
                    ;
                    res[key].revenue = parseFloat(res[key].revenue) + (parseFloat(obj.revenue))
                    res[key].count += 1;
                });
                return Object.values(res);
            };
            console.log(convert(arr));
            this.setState({vehiclesCount: this.state.vehiclesCount})
        })
    }

    totalRevenue() {
        this.props.history.push('/totalStatisticalVehicle')
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Th???ng k?? xe</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.totalRevenue}>Xem t???ng doanh thu</button>
                </div>

                <div style={{fontSize: "13px"}}>Doanh thu: Gi?? v?? x s??? kh??ch
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>
                                <a href="/#">STT</a>
                            </th>
                            <th>
                                <a href="/#">Xe</a>
                            </th>
                            <th>
                                <a href="/#">Tuy???n ???????ng</a>
                            </th>
                            <th>
                                <a href="/#">S??? kh??ch</a>
                            </th>
                            <th>
                                <a href="/#">Gi?? v??</a>
                            </th>
                            <th style={{textAlign: "center"}}>
                                <a href="/#">Doanh thu/chuy???n</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.vehiclesCount.map(vehicle =>
                            <tr>
                                <td>{this.state.i++}</td>
                                <td>{vehicle.licensePlate}</td>
                                <td>{vehicle.route}</td>
                                <td>{vehicle.guest_quanity}</td>
                                <td>{parseFloat(vehicle.fare).toLocaleString()}</td>
                                <td style={{textAlign: "center"}}>{parseFloat(vehicle.revenue).toLocaleString()}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default StatisticalDriverComponent;