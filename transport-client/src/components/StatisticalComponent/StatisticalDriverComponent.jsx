import React, {Component} from 'react';
import JourneyService from "../../services/JourneyService";

class StatisticalDriverComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            driversCount: [],
            drivers: [],
        }
        this.totalSalary = this.totalSalary.bind(this);

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
            this.setState({driversCount: this.state.driversCount})
        })
    }

    totalSalary() {
        this.props.history.push('/totalStatisticalDriver')
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Thống kê tài xế</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.totalSalary}>Xem tổng lương</button>
                </div>

                <div style={{fontSize: "13px"}}>Lái xe: 550đ/km + 10% độ khó 1, + 20% độ khó 2, + 30% độ khó 3<br/>
                    Phụ xe: 275đ/km + 10% độ khó 1, + 20% độ khó 2, + 30% độ khó 3<br/>
                    Hỗ trợ ăn: 100k/chuyến độ khó 1, 110k/chuyến độ khó 2, 120k/chuyến độ khó 3
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>
                                <a href="/#">STT</a>
                            </th>
                            <th>
                                <a href="/#">Họ tên</a>
                            </th>
                            <th>
                                <a href="/#">Số CMND</a>
                            </th>
                            <th>
                                <a href="/#">Tuyến đường chạy</a>
                            </th>
                            <th style={{textAlign: "center"}}>
                                <a href="/#">Độ dài (km)</a>
                            </th>
                            <th>
                                <a href="/#">Độ khó</a>
                            </th>
                            <th>
                                <a href="/#">Vị trí</a>
                            </th>
                            <th>
                                <a href="/#">Lương/chuyến</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.driversCount.map(driver =>
                            <tr>
                                <td>{this.state.i++}</td>
                                <td>{driver.name}</td>
                                <td>{driver.idCard}</td>
                                <td>{driver.route}</td>
                                <td style={{textAlign: "center"}}>{driver.length}</td>
                                <td style={{textAlign: "center"}}>{driver.complexity}</td>
                                <td>{driver.pos}</td>
                                <td>{parseFloat(driver.salary).toLocaleString()}</td>
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