import React, {Component} from 'react';
import RouteService from "../../services/RouteService";
import {Form} from "react-bootstrap";

class AddRouteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_point: '',
            end_point: '',
            length: '',
            complexity:'',
            errorField: [],
            options: [{
                value: "1",
                label: "1",
            }, {
                value: "2",
                label: "2",
            }, {
                value: "3",
                label: "3",
            }]
        }
        this.inputFirstPoint = this.inputFirstPoint.bind(this);
        this.inputEndPoint = this.inputEndPoint.bind(this);
        this.inputLength = this.inputLength.bind(this);
        this.inputComplexity = this.inputComplexity.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveRoute = this.saveRoute.bind(this);
    }

    saveRoute = (e) => {
        this.setState({
            errorField: []
        })
        e.preventDefault();
        let route = {
            first_point: this.state.first_point,
            end_point: this.state.end_point,
            length: this.state.length,
            complexity: this.state.complexity
        };
        console.log(this.state.complexity)
        return RouteService.addRoute(route)
            .then(resp => {
                if (resp.data.field === false) {
                    this.setState({errorField: this.state.errorField.concat(resp.data)})
                } else {
                    const dataError = []
                    dataError.push(resp.data.errors)
                    // eslint-disable-next-line
                    dataError.map(error => {
                        // eslint-disable-next-line
                        error.map(listError => {
                            this.setState({errorField: this.state.errorField.concat(listError)})
                        })
                    })
                }
            }).catch(resp => {
                this.props.history.push('/listRoutes')
            });

    }
    handleChange = (event) => {
        this.setState({complexity: event.target.value})
    }
    inputFirstPoint = (event) => {
        this.setState({first_point: event.target.value});
    }
    inputEndPoint = (event) => {
        this.setState({end_point: event.target.value});
    }
    inputLength = (event) => {
        this.setState({length: event.target.value});
    }
    inputComplexity = (event) => {
        this.setState({complexity: event.target.value});
    }

    cancel() {
        this.props.history.push('/listRoutes');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <hr/>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Thêm tuyến đường</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Điểm đầu: </label>
                                        <input placeholder="Nhập điểm đầu" name="first_point" className="form-control"
                                               value={this.state.first_point} onChange={this.inputFirstPoint}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (!itemError.field) ?
                                                        <p className="text-danger">*{itemError.defaultMessage}</p> :
                                                        (itemError.field === 'first_point') ?
                                                            <p className="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Điểm cuối: </label>
                                        <input placeholder="Nhập điểm cuối" name="end_point" className="form-control"
                                               value={this.state.end_point} onChange={this.inputEndPoint}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'end_point') ?
                                                        <p className="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Độ dài quãng đường: </label>
                                        <input placeholder="Nhập độ dài quãng đường" name="length"
                                               className="form-control"
                                               value={this.state.length} onChange={this.inputLength}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'length') ?
                                                        <p className="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Độ phức tạp: </label>
                                        <Form.Select defaultValue="1" value={this.state.complexity}
                                                     onChange={this.handleChange} className="form-control">
                                            <option value="">Chọn 1 loại độ phức tạp</option>
                                            {this.state.options.map(item => {
                                                return <option value={item.value}>{item.label}</option>
                                            })
                                            }
                                        </Form.Select>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'complexity') ?
                                                        <p className="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveRoute}>Lưu
                                    </button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px"}}>Hủy
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddRouteComponent;