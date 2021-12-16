import React, {Component} from 'react';
import JourneyService from "../../services/JourneyService";
import ReactPaginate from "react-paginate";

class ListJourneyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: '',
            pageCount: '',
            key: '',
            journeys: [],
            journeyDriver: []
        }
        this.addJourney = this.addJourney.bind(this);
        this.updateJourney = this.updateJourney.bind(this);
        this.deleteJourney = this.deleteJourney.bind(this);
        this.searchJourney = this.searchJourney.bind(this);
    }

    updateJourney(id) {
        this.props.history.push(`/update-journey/${id}`);
    }

    componentDidMount() {
        JourneyService.fetchJourneys(1).then(resp => {
            this.setState({journeys: resp})
        })
        JourneyService.getJourneys().then(resp => {
            const total = resp.data.length;
            let pageCount = Math.ceil(total / 5);
            this.setState({pageCount: pageCount});
            this.setState({total: total})
        })
        JourneyService.getJourneyDriver().then(resp => {
            this.setState({journeyDriver: resp.data})
        })

    }

    handlePageClick = (data) => {
        let selected = data.selected + 1;
        JourneyService.fetchJourneys(selected).then(resp => {
            this.setState({journeys: resp})
        })
    };

    addJourney() {
        this.props.history.push('/add-journey');
    }

    deleteJourney(id) {
        JourneyService.deleteJourney(id).then(resp => {
            this.setState({
                journeys: this.state.journeys.filter(journey =>
                    journey.id !== id)
            });
            this.props.history.push('/listJourneys');
        })
    }

    searchJourney(key) {
        if (key.trim() === '') {
            return JourneyService.getJourneys().then((res) => {
                this.setState({journeys: res.data});
                this.props.history.push(`/journeys/${key}`);
            });
        } else {
            JourneyService.searchJourneys(key.trim()).then(resp => {
                this.setState({journeys: resp.data})
            });
            this.props.history.push(`/journeys/${key}`);
        }
    }

    inputKey = (event) => {
        this.setState({key: event.target.value});
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Danh sách chuyến xe</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addJourney}>Thêm chuyến xe</button>
                    <p style={{margin: "auto"}} className="form-inline"></p>
                    <input className="form-inline" style={{marginLeft: "5px"}} placeholder="Nhập điểm đầu"
                           name="key" value={this.state.key} onChange={this.inputKey}/>
                    <button className="btn btn-primary" onClick={() => this.searchJourney(this.state.key)}
                            style={{marginLeft: "10px"}}>Tìm kiếm
                    </button>
                </div>
                <br/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>
                                <a href="/#">Tuyến đường</a>
                            </th>
                            <th>
                                <a href="/#">Xe</a>
                            </th>
                            <th>
                                <a href="/#">Lái xe</a>
                            </th>
                            <th>
                                <a href="/#">Phụ xe</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Số khách</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Giá vé (đồng)</a>
                            </th>
                            <th>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.journeys.map(journey =>
                            <tr key={journey.id}>
                                <td>{journey.route.first_point} - {journey.route.end_point}</td>
                                <td>{journey.vehicle.licensePlate} / {journey.vehicle.seat} ghế</td>
                                {this.state.journeyDriver.map(resp => {
                                    if (resp.role === "TX")
                                        if (resp.journeys.id === journey.id)
                                            return <td>{resp.drivers.name}</td>
                                })
                                }
                                {this.state.journeyDriver.map(resp => {
                                    if (resp.role === "PX")
                                        if (resp.journeys.id === journey.id)
                                            return <td>{resp.drivers.name}</td>
                                })
                                }
                                <td>{journey.guest_quanity}</td>
                                <td>{journey.fare}</td>
                                <td className="text-center">
                                    <button className="btn btn-info"
                                            onClick={() => this.updateJourney(journey.id)}>Sửa
                                    </button>
                                    <button className="btn btn-danger"
                                            onClick={() => this.deleteJourney(journey.id)}
                                            style={{marginLeft: "10px"}}>Xóa
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    Tổng kết quả: {this.state.total} chuyến xe
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

export default ListJourneyComponent;