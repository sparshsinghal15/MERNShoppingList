import axios from 'axios';
import {
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	USER_LOADING
} from './types';
import { returnErrors } from './errorAction';

// REGISTER USER
export const register = ({ name, email, password }) => (dispatch) => {
	// HEADERS
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	// REQUEST BODY
	const body = JSON.stringify({ name, email, password });

	axios
		.post('/api/users', body, config)
		.then((res) =>
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
			dispatch({
				type: REGISTER_FAIL
			});
		});
};

// LOGIN
export const login = ({ email, password }) => (dispatch) => {
	// HEADERS
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	const body = JSON.stringify({ email, password });

	axios
		.post('/api/auth', body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAIL));
			dispatch({
				type: LOGIN_FAIL
			});
		});
};

// LOGOUT
export const logout = () => ({
	type: LOGOUT_SUCCESS
});

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
	// USER LOADING
	dispatch({ type: USER_LOADING });

	axios
		.get('/api/auth/user', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR
			});
		});
};

export const tokenConfig = (getState) => {
	// GET TOKEN FROM LOCALSTORAGE
	const token = getState().auth.token;

	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	// IF TOKEN ADD TO HEADERS
	if (token) {
		config.headers['x-auth-token'] = token;
	}

	return config;
};
