import React, {Component} from 'react';
import {MDBContainer} from "mdbreact";

class FooterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>
                <footer>
                    <div className="footer-copyright text-center py-3">
                        <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a
                            href="/statistical">NHÓM 3</a>
                        </MDBContainer>
                    </div>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;