import axios from 'axios';

import config from '../../app-config';
import utils from '../../utils';
import {CHANGE_INPUT, AUTHORIZATION_ERROR} from '../types/login';

export const changeInputValue = (name, value) => ({
	type: CHANGE_INPUT,
	payload: {
		name,
		value
	}
});

export const appLogin = (login, password) => dispatch => {
	const {loginUrl, appRoot} = config.getUrls();
	const authorizationHeader = utils.getAuthorizationHeader(login, password);
	const headers = {
		'Authorization': authorizationHeader
	};
	axios.get(loginUrl, {headers})
		.then(({data}) => {
			const {status} = data;
			if (status === 'success') {
				window.location = appRoot;
				return;
			}
			dispatch({
				type: AUTHORIZATION_ERROR
			})
		})
};