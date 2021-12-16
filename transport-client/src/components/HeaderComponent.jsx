import React, {Component} from 'react';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container className="justify-content-start">
                            <Navbar.Brand href="/#">Trang chủ</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="/listVehicles">Quản lý xe</Nav.Link>
                                <Nav.Link href="/listDrivers">Quản lý tài xế</Nav.Link>
                                <Nav.Link href="/listRoutes">Quản lý tuyến đường</Nav.Link>
                                <Nav.Link href="/listJourneys">Quản lý chuyến xe</Nav.Link>
                                <NavDropdown title="Thống kê" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/statisticalDriver">Thống kê tài xế</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/statisticalVehicle">Thống kê xe</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;