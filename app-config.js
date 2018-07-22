module.exports = {
	events: ['EVENT1', 'EVENT2', 'EVENT3'],
	interval: 500,
	port: '2018',
	host: 'localhost',
	texts: {
		'login-error-text': 'В логине или пароле ошибка',
		'need-authorize': 'Чтобы зайти на сайт вам нужно авторизироваться'
	},
	getUrls() {
		return {
			loginUrl: `/login/action`,
			loginPage: '/login',
			appRoot: '/',
			getAvailableEventsUrl: '/get-available-events',
			subscribeEvent: '/subscribe-event'
		}
	},
	login: 'b2broker',
	password: 'qwerty',
	cookieName: 'app_lgn'
};
