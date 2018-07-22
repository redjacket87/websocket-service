const config = require('../app-config');

module.exports = {
	getAuthorizationHeader(login, password) {
		const encryptedLogin = Buffer.from(login).toString('base64');
		const encryptedPassword = Buffer.from(password).toString('base64');
		return `${encryptedLogin}:${encryptedPassword}`;
	},
	checkAuthorization(encodedString) {
		const {login, password} = config;
		const encodedStringArray = encodedString.split(':');
		const loginFromClient = Buffer.from(encodedStringArray[0], 'base64').toString('ascii');
		const passwordFromClient = Buffer.from(encodedStringArray[1], 'base64').toString('ascii');
		return login === loginFromClient && password === passwordFromClient;
	}
};
