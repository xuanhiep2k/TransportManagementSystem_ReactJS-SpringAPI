import React, {Component} from 'react';
import RouteService from "../../services/RouteService";
import ReactPaginate from "react-paginate";

class ListRouteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: '',
            pageCount: '',
            key: '',
            routes: []
        }
        this.addRoute = this.addRoute.bind(this);
        this.updateRoute = this.updateRoute.bind(this);
        this.deleteRoute = this.deleteRoute.bind(this);
        this.searchRoute = this.searchRoute.bind(this);
    }

    updateRoute(id) {
        this.props.history.push(`/update-route/${id}`);
    }

    componentDidMount() {
        RouteService.fetchRoutes(1).then(resp => {
            this.setState({routes: resp})
        })
        RouteService.getRoutes().then(resp => {
            const total = resp.data.length;
            let pageCount = Math.ceil(total / 5);
            this.setState({pageCount: pageCount});
            this.setState({total: total})
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected + 1;
        RouteService.fetchRoutes(selected).then(resp => {
            this.setState({routes: resp})
        })
    };

    addRoute() {
        this.props.history.push('/add-route');
    }

    deleteRoute(id) {
        RouteService.deleteRoute(id).then(resp => {
            this.setState({
                routes: this.state.routes.filter(route =>
                    route.id !== id)
            });
            this.props.history.push('/listRoutes');
        })
    }

    searchRoute(key) {
        if (key.trim() === '') {
            return RouteService.getRoutes().then((res) => {
                this.setState({routes: res.data});
                this.props.history.push(`/routes/${key}`);
            });
        } else {
            RouteService.searchRoutes(key.trim()).then(resp => {
                this.setState({routes: resp.data})
            });
            this.props.history.push(`/routes/${key}`);
        }
    }

    inputKey = (event) => {
        this.setState({key: event.target.value});
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Danh sách tuyến đường </h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addRoute}>Thêm tuyến đường</button>
                    <p style={{margin: "auto"}} className="form-inline"></p>
                    <input className="form-inline" style={{marginLeft: "5px"}} placeholder="Nhập điểm đầu"
                           name="key" value={this.state.key} onChange={this.inputKey}/>
                    <button className="btn btn-primary" onClick={() => this.searchRoute(this.state.key)}
                            style={{marginLeft: "10px"}}>Tìm kiếm
                    </button>
                </div>
                <br/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>
                                <a href="/#">Điểm đầu</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Điểm cuối</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Độ dài (km)</a>
                            </th>
                            <th>
                                <a href="/#">
                                    Độ phức tạp</a>
                            </th>
                            <th >
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.routes.map(route =>
                            <tr key={route.id}>
                                <td>{route.first_point}</td>
                                <td>{route.end_point}</td>
                                <td>{route.length}</td>
                                <td>{route.complexity}</td>
                                <td className="text-center">
                                    <button className="btn btn-info"
                                            onClick={() => this.updateRoute(route.id)}>Sửa
                                    </button>
                                    <button className="btn btn-danger"
                                            onClick={() => this.deleteRoute(route.id)}
                                            style={{marginLeft: "10px"}}>Xóa
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    Tổng kết quả: {this.state.total} tuyến đường
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

export default ListRouteComponent;