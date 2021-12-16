import React, {Component} from 'react';
import JourneyService from "../../services/JourneyService";
import {number} from "prop-types";

class TotalStatisticalDriverComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            driversCount: [],
            drivers: [],
            totalSalary: []
        }
    }

    componentDidMount() {
        JourneyService.getJourneyDriver().then(resp => {
            const driver = resp.data
            this.setState({journeyDriver: driver})
            this.state.journeyDriver.map(res => {
                if (res.role === "TX") {
                    let salary = 0;
                    if (res.journeys.route.complexity === 1) {
                        salary += (550 + 550 * 10 / 100) * (res.journeys.route.length) + 100000
                        this.state.drivers.push(res.drivers.name.concat(" / ")
                            .concat(res.drivers.idCard).concat(" / ")
                            .concat(res.journeys.route.first_point + " - " + res.journeys.route.end_point).concat(" / ")
                            .concat(res.journeys.route.length).concat(" / ")
                            .concat(res.journeys.route.complexity).concat(" / ")
                            .concat("Lái xe").concat(" / ")
                            .concat(salary.toString()))
                    } else if (res.journeys.route.complexity === 2) {
                        salary += (550 + 550 * 20 / 100) * (res.journeys.route.length) + 110000
                        this.state.drivers.push(res.drivers.name.concat(" / ")
                            .concat(res.drivers.idCard).concat(" / ")
                            .concat(res.journeys.route.first_point + " - " + res.journeys.route.end_point).concat(" / ")
                            .concat(res.journeys.route.length).concat(" / ")
                            .concat(res.journeys.route.complexity).concat(" / ")
                            .concat("Lái xe").concat(" / ")
                            .concat(salary.toString()))
                    } else if (res.journeys.route.complexity === 3) {
                        salary += (550 + 550 * 30 / 100) * (res.journeys.route.length) + 120000
                        this.state.drivers.push(res.drivers.name.concat(" / ")
                            .concat(res.drivers.idCard).concat(" / ")
                            .concat(res.journeys.route.first_point + " - " + res.journeys.route.end_point).concat(" / ")
                            .concat(res.journeys.route.length).concat(" / ")
                            .concat(res.journeys.route.complexity).concat(" / ")
                            .concat("Lái xe").concat(" / ")
                            .concat(salary.toString()))
                    }
                }
                if (res.role === "PX") {
                    let salary = 0;
                    if (res.journeys.route.complexity === 1) {
                        salary += (275 + 275 * 10 / 100) * (res.journeys.route.length) + 100000
                        this.state.drivers.push(res.drivers.name.concat(" / ")
                            .concat(res.drivers.idCard).concat(" / ")
                            .concat(res.journeys.route.first_point + " - " + res.journeys.route.end_point).concat(" / ")
                            .concat(res.journeys.route.length).concat(" / ")
                            .concat(res.journeys.route.complexity).concat(" / ")
                            .concat("Phụ xe").concat(" / ")
                            .concat(salary.toString()))
                    } else if (res.journeys.route.complexity === 2) {
                        salary += (275 + 275 * 20 / 100) * (res.journeys.route.length) + 110000
                        this.state.drivers.push(res.drivers.name.concat(" / ")
                            .concat(res.drivers.idCard).concat(" / ")
                            .concat(res.journeys.route.first_point + " - " + res.journeys.route.end_point).concat(" / ")
                            .concat(res.journeys.route.length).concat(" / ")
                            .concat(res.journeys.route.complexity).concat(" / ")
                            .concat("Phụ xe").concat(" / ")
                            .concat(salary.toString()))
                    } else if (res.journeys.route.complexity === 3) {
                        salary += (275 + 275 * 30 / 100) * (res.journeys.route.length) + 120000
                        this.state.drivers.push(res.drivers.name.concat(" / ")
                            .concat(res.drivers.idCard).concat(" / ")
                            .concat(res.journeys.route.first_point + " - " + res.journeys.route.end_point).concat(" / ")
                            .concat(res.journeys.route.length).concat(" / ")
                            .concat(res.journeys.route.complexity).concat(" / ")
                            .concat("Phụ xe").concat(" / ")
                            .concat(salary.toString()))
                    }
                }
            })
            this.state.drivers.map(resp => {
                this.state.driversCount.push({
                    name: resp.toString().split(' / ')[0],
                    idCard: resp.toString().split(' / ')[1],
                    route: resp.toString().split(' / ')[2],
                    length: resp.toString().split(' / ')[3],
                    complexity: resp.toString().split(' / ')[4],
                    pos: resp.toString().split(' / ')[5],
                    salary: resp.toString().split(' / ')[6]
                })
            })
            let arr = this.state.driversCount.sort((a, b) => (a.idCard - b.idCard))

            const convert = (arr) => {
                const res = {};
                arr.forEach((obj) => {
                    const key = obj.idCard;
                    if (!res[key]) {
                        res[key] = {
                            ...obj,
                            count: 0
                        };
                        res[key].salary = 0;
                    }
                    ;
                    res[key].salary = parseFloat(res[key].salary) + (parseFloat(obj.salary))
                    res[key].count += 1;
                });
                return Object.values(res);
            };
            console.log(convert(arr));
            this.setState({totalSalary: convert(arr)})
        })
    }

    cancel() {
        this.props.history.push('/statisticalDriver')
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Xem tổng lương tài xế</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.cancel.bind(this)}>Quay lại
                    </button>
                </div>
                <br/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th style={{textAlign:"center"}}>
                                <a href="/#">STT</a>
                            </th>
                            <th style={{textAlign:"center"}}>
                                <a href="/#">Họ tên</a>
                            </th>
                            <th style={{textAlign:"center"}}>
                                <a href="/#">Số CMND</a>
                            </th>
                            <th style={{textAlign:"center"}}>
                                <a href="/#">Tổng số chuyến</a>
                            </th>
                            <th style={{textAlign:"center"}}>
                                <a href="/#">Tổng lương</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.totalSalary.map(driver =>
                            <tr>
                                <td style={{textAlign:"center"}}>{this.state.i++}</td>
                                <td >{driver.name}</td>
                                <td style={{textAlign:"center"}}>{driver.idCard}</td>
                                <td style={{textAlign:"center"}}>{driver.count}</td>
                                <td style={{textAlign:"center"}}>{driver.salary.toLocaleString()}</td>
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