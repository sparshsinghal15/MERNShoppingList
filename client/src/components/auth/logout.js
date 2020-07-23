import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authAction';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';

class Logout extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired
	};

	render() {
		return (
			<Fragment>
				<NavLink onClick={this.props.logout} href="">
					Logout
				</NavLink>
			</Fragment>
		);
	}
}

const mapDispatchToProps = {
	logout
};

export default connect(null, mapDispatchToProps)(Logout);
