import React from 'react'
import { Collapse,Nav, NavbarToggler, NavbarBrand,Navbar, NavItem,NavLink, Container} from 'reactstrap'

class AppNavbar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render () {
        return (
            <Navbar color="dark" expand="sm" dark className="mb-5" >
                <Container>
                    <NavbarBrand href="">
                        ShoppingList
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} /> 
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        ) 
    }
}

export default AppNavbar