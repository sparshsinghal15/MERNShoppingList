import React, { Fragment } from 'react';
import { Collapse, Nav, NavbarToggler, NavbarBrand, Navbar, NavItem, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import RegisterModal from './auth/registerModal';
import LoginModal from './auth/loginModal';
import Logout from './auth/logout';

class AppNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
		this.toggle = this.toggle.bind(this);
	}

	static propTypes = {
		auth: PropTypes.object.isRequired
	};
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<Fragment>
				<NavItem>
					<span className="navbar-text mr-3">
						<strong>{user ? user.name : null}</strong>
					</span>
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</Fragment>
		);
		const guestLinks = (
			<Fragment>
				<NavItem>
					<RegisterModal />
				</NavItem>
				<NavItem>
					<LoginModal />
				</NavItem>
			</Fragment>
		);
		return (
			<Navbar color="dark" expand="sm" dark className="mb-5">
				<Container>
					<NavbarBrand href="">ShoppingList</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{isAuthenticated ? authLinks : guestLinks}
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);
