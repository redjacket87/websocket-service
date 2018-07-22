import {AUTHORIZATION_ERROR, CHANGE_INPUT} from "../types/login";
import config from '../../app-config';

const initialState = {
	error: '',
	login: '',
	password: ''
};

export default function loginPageReducer (state = initialState,action) {
	switch (action.type) {
		case CHANGE_INPUT:
			const {payload = {}} = action;
			const {name, value} = payload;
			return  Object.assign({}, state, {[name]: value});
		case AUTHORIZATION_ERROR:
			return Object.assign({}, state, {error: config.texts['login-error-text']});
		default:
			return state;
	}
}
