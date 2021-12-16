import React, {Component} from 'react';
import JourneyService from "../../services/JourneyService";
import {number} from "prop-types";

class TotalStatisticalDriverComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            vehiclesCount: [],
            vehicles: [],
            totalRevenue: []
        }
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
            this.setState({totalRevenue: convert(arr)})
        })
    }

    cancel() {
        this.props.history.push('/statisticalVehicle')
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Xem tổng doanh thu xe</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.cancel.bind(this)}>Quay lại
                    </button>
                </div>
                <br/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>
                                <a href="/#">STT</a>
                            </th>
                            <th style={{textAlign: "center"}}>
                                <a href="/#">Xe</a>
                            </th>
                            <th style={{textAlign: "center"}}>
                                <a href="/#">Tổng số chuyển</a>
                            </th>
                            <th style={{textAlign: "center"}}>
                                <a href="/#">Tổng doanh thu</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.totalRevenue.map(revenue =>
                            <tr>
                                <td style={{textAlign: "center"}}>{this.state.i++}</td>
                                <td style={{textAlign: "center"}}>{revenue.licensePlate}</td>
                                <td style={{textAlign: "center"}}>{revenue.count}</td>
                                <td style={{textAlign: "center"}}>{revenue.revenue.toLocaleString()}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TotalStatisticalDriverComponent;