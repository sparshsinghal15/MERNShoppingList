import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';

class LoginModal extends React.Component {
	state = {
		modal: false,
		email: '',
		password: '',
		msg: null
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		login: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	componentDidUpdate(prevProps) {
		const { error } = this.props;
		if (error !== prevProps.error) {
			// check for login error
			if (error.id === 'LOGIN_FAIL') {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}

		// if (this.state.modal) {
		// 	if (isAuthenticated) this.toggle();
		// }
	}

	toggle = () => {
		this.props.clearErrors();
		this.setState((state) => ({
			...state,
			modal: !this.state.modal
		}));
	};
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();

		const { email, password } = this.state;

		const user = {
			email,
			password
		};

		this.props.login(user);
	};
	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					Login
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Login</ModalHeader>
					<ModalBody>
						{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="email">Email</Label>
								<Input
									type="text"
									name="email"
									id="email"
									placeholder="Email"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Label for="name">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Button color="dark" style={{ marginTop: '1.5rem' }} block>
									Login
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
