import React, {Component} from 'react';
import VehicleService from "../../services/VehicleService";

class AddVehicleComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            licensePlate: '',
            colour: '',
            manufacturer: '',
            manufacture_year: '',
            model: '',
            seat: '',
            year_of_use: '',
            maintenance_day: '',
            errorField: []
        }
        this.inputLicensePlate = this.inputLicensePlate.bind(this);
        this.inputColour = this.inputColour.bind(this);
        this.inputManufacturer = this.inputManufacturer.bind(this);
        this.inputManufactureYear = this.inputManufactureYear.bind(this);
        this.inputModel = this.inputModel.bind(this);
        this.inputSeat = this.inputSeat.bind(this);
        this.inputYearOfUse = this.inputYearOfUse.bind(this);
        this.inputMaintenanceDay = this.inputMaintenanceDay.bind(this);
        this.saveVehicle = this.saveVehicle.bind(this);
    }


    saveVehicle = (e) => {
        this.setState({errorField: []})
        e.preventDefault();
        let vehicle = {
            licensePlate: this.state.licensePlate,
            colour: this.state.colour,
            manufacturer: this.state.manufacturer,
            manufacture_year: this.state.manufacture_year,
            model: this.state.model,
            seat: this.state.seat,
            year_of_use: this.state.year_of_use,
            maintenance_day: this.state.maintenance_day
        };

        return VehicleService.addVehicle(vehicle)
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
                this.props.history.push('/vehicles')
            });

    }
    inputLicensePlate = (event) => {
        this.setState({licensePlate: event.target.value});
    }
    inputColour = (event) => {
        this.setState({colour: event.target.value});
    }
    inputManufacturer = (event) => {
        this.setState({manufacturer: event.target.value});
    }
    inputManufactureYear = (event) => {
        this.setState({manufacture_year: event.target.value});
    }
    inputModel = (event) => {
        this.setState({model: event.target.value});
    }
    inputSeat = (event) => {
        this.setState({seat: event.target.value});
    }
    inputYearOfUse = (event) => {
        this.setState({year_of_use: event.target.value});
    }
    inputMaintenanceDay = (event) => {
        this.setState({maintenance_day: event.target.value});
    }

    cancel() {
        this.props.history.push('/vehicles');
    }

    render() {

        return (
            <div>
                <div className="container">
                    <hr/>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Thêm xe</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Biển số: </label>
                                        <input placeholder="Nhập biển số" name="licensePlate" className="form-control"
                                               value={this.state.licensePlate} onChange={this.inputLicensePlate}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (!itemError.field) ?
                                                        <p class="text-danger">*{itemError.defaultMessage}</p> :
                                                        (itemError.field === 'licensePlate') ?
                                                            <p class="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Màu xe: </label>
                                        <input placeholder="Nhập màu xe" name="colour" className="form-control"
                                               value={this.state.colour} onChange={this.inputColour}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'colour') ?
                                                        <p class="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Hãng sản xuất: </label>
                                        <input placeholder="Nhập hãng sản xuất" name="manufacturer"
                                               className="form-control"
                                               value={this.state.manufacturer} onChange={this.inputManufacturer}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'manufacturer') ?
                                                        <p class="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Năm sản xuất: </label>
                                        <input placeholder="Nhập năm sản xuất" name="manufacture_year"
                                               className="form-control"
                                               value={this.state.manufacture_year}
                                               onChange={this.inputManufactureYear}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'manufacture_year') ?
                                                        <p class="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Model: </label>
                                        <input placeholder="Nhập model" name="model" className="form-control"
                                               value={this.state.model} onChange={this.inputModel}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'model') ?
                                                        <p class="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Số ghế: </label>
                                        <input placeholder="Nhập số ghế" name="seat" className="form-control"
                                               value={this.state.seat} onChange={this.inputSeat}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'seat') ?
                                                        <p class="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Số năm sử dụng: </label>
                                        <input placeholder="Nhập số năm sử dụng" name="year_of_use"
                                               className="form-control"
                                               value={this.state.year_of_use} onChange={this.inputYearOfUse}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'year_of_use') ?
                                                        <p class="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày bảo dưỡng cuối: </label>
                                        <input placeholder="Nhập ngày bảo dưỡng cuối cùng" name="maintenance_day"
                                               className="form-control"
                                               value={this.state.maintenance_day} onChange={this.inputMaintenanceDay}/>
                                        {
                                            this.state.errorField.map(itemError => {
                                                return (
                                                    (itemError.field === 'maintenance_day') ?
                                                        <p class="text-danger">*{itemError.defaultMessage}</p> : ''
                                                )
                                            })
                                        }
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveVehicle}>Lưu
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

export default AddVehicleComponent;