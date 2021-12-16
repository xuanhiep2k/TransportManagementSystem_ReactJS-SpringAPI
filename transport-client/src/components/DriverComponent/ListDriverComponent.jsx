import React, {Component} from 'react';
import DriverService from "../../services/DriverService";
import ReactPaginate from "react-paginate";

class ListDriverComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total: '',
            pageCount: '',
            key: '',
            drivers: []
        }
        this.addDriver = this.addDriver.bind(this);
        this.updateDriver = this.updateDriver.bind(this);
        this.deleteDriver = this.deleteDriver.bind(this);
        this.searchDriver = this.searchDriver.bind(this);
    }

    updateDriver(idCard) {
        this.props.history.push(`/update-driver/${idCard}`);
    }

    componentDidMount() {
        DriverService.fetchDrivers(1).then(resp => {
            this.setState({drivers: resp})
        })
        DriverService.getDrivers().then(resp => {
            const total = resp.data.length;
            let pageCount = Math.ceil(total / 5);
            this.setState({pageCount: pageCount});
            this.setState({total: total})
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected + 1;
        DriverService.fetchDrivers(selected).then(resp => {
            this.setState({drivers: resp})
        })
    };

    addDriver() {
        this.props.history.push('/add-driver');
    }

    deleteDriver(idCard) {
        DriverService.deleteDriver(idCard).then(resp => {
            this.setState({
                drivers: this.state.drivers.filter(driver =>
                    driver.idCard !== idCard)
            });
            this.props.history.push('/listdrivers');
        })
    }

    searchDriver(key) {
        if (key.trim() === '') {
            return DriverService.getDrivers().then((res) => {
                this.setState({drivers: res.data});
                this.props.history.push(`/drivers/${key}`);
            });
        } else {
            DriverService.searchDrivers(key.trim()).then(resp => {
                this.setState({drivers: resp.data})
            });
            this.props.history.push(`/drivers/${key}`);
        }
    }

    inputKey = (event) => {
        this.setState({key: event.target.value});
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Danh sách tài xế </h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addDriver}>Thêm tài xế</button>
                    <p style={{margin: "auto"}} className="form-inline"></p>
                    <input className="form-inline" style={{marginLeft: "5px"}} placeholder="Nhập số CMND"
                           name="key" value={this.state.key} onChange={this.inputKey}/>
                    <button className="btn btn-primary" onClick={() => this.searchDriver(this.state.key)}
                            style={{marginLeft: "10px"}}>Tìm kiếm
                    </button>
                </div>
                <br/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>
                                <a href="/#">Số CMND</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Họ và tên</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Số GPLX</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Loại GPLX</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Địa chỉ</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Ngày tháng năm sinh</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Thâm niên</a>
                            </th>
                            <th>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.drivers.map(
                            driver =>
                                <tr key={driver.idCard}>
                                    <td>{driver.idCard}</td>
                                    <td>{driver.name}</td>
                                    <td>{driver.license}</td>
                                    <td>{driver.type}</td>
                                    <td>{driver.address}</td>
                                    <td>{driver.birth}</td>
                                    <td>{driver.seniority}</td>
                                    <td>
                                        <button className="btn btn-info"
                                                onClick={() => this.updateDriver(driver.idCard)}>Sửa
                                        </button>
                                        <button className="btn btn-danger"
                                                onClick={() => this.deleteDriver(driver.idCard)}
                                                style={{marginLeft: "10px"}}>Xóa
                                        </button>
                                    </td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                    Tổng kết quả: {this.state.total} tài xế
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

export default ListDriverComponent;