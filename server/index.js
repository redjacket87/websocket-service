const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {port, cookieName, events, getUrls, serverCrushDelay} = require('../app-config');
const {
	loginUrl,
	appRoot,
	getAvailableEventsUrl,
	loginPage
} = getUrls();
const utils = require('../utils');

const app = express();
const http = require('http').Server(app);
const Server = require('socket.io');
let io = Server(http);

// подключаем мидлвары для раздачи статики и парсинга запроса
app.use(appRoot, express.static(path.resolve(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(cookieParser());

app.get(appRoot, (req, res) => {
		const cookie = req.cookies[cookieName];
		if (!cookie || typeof cookie !== 'string') {
			res.redirect(loginPage);
			return;
		}
		if (!utils.checkAuthorization(cookie)){
			res.redirect(loginPage);
			return;
		}
        const filePath = path.resolve(__dirname, '../public/app.html');
        res.sendFile(filePath);
	})
	.get(loginPage, (req, res) => {
		const cookie = req.cookies[cookieName];
		if (cookie && utils.checkAuthorization(cookie)){
			res.redirect(appRoot);
			return;
		}
		const filePath = path.resolve(__dirname, '../public/login.html');
		res.sendFile(filePath);
	})
	.get(loginUrl, (req, res) => {
		const {authorization} = req.headers;
		const status = utils.checkAuthorization(authorization) ? 'success' : 'error';
		// пишем куку на 15 минут
		const maxAge = 1000*60*15;
		if (status === 'success') {
			res.cookie(cookieName, authorization, {maxAge});
		}
		res.json({
			status
		})
	})
	.get(getAvailableEventsUrl, (req, res) => {
		res.json({
			events
		})
	});

io.on('connection', (socket) => {
	socket.on('check-connection', () => {
		socket.emit('checked');
		console.log('соединение установлено');
		const self = {};
		events.forEach((event) => {
			socket.on(event, (interval) => {
				self[event] = setInterval(() => {
					console.log('setInterval');
					socket.emit(event, {payload: (Math.random()*100).toFixed(2)});
				}, interval);
			});
			socket.on('clear-interval', ({eventName}) => {
				if (eventName !== event) {
					return;
				}
				clearInterval(self[eventName]);
			})
		});
	});
});

http.listen(port);
