import axios from 'axios';
import {getUrls, interval} from '../../app-config';
import {GET_AVAILABLE_EVENTS, SET_ACTIVE_MODE, UPDATE_VALUE} from '../types/app';
import io from 'socket.io-client';
const socket = io();


export const getAvailableEvents = () => dispatch => {
	const {getAvailableEventsUrl} = getUrls();
	axios.get(getAvailableEventsUrl)
		.then(({data}) => {
			const {events = []} = data;
			const eventsToCollection = events.map((event) => {
				return {
					eventName: event,
					active: false
				}
			});
			dispatch({
				type: GET_AVAILABLE_EVENTS,
				payload: eventsToCollection
			})
		})
};

export const subscribeEvent = (eventName) => dispatch => {
	socket.on('checked', () => {
		socket.removeListener('checked');
		console.log('connected');
		socket.on(eventName, ({payload}) => {
			dispatch({
				type: UPDATE_VALUE,
				payload: {
					eventName,
					value: payload
				}
			});
		});
		socket.emit(eventName, interval);
		dispatch({
			type: SET_ACTIVE_MODE,
			eventName,
			active: true
		});
	});
	socket.emit('check-connection');
	socket.on('disconnect', () => {
		console.log('disconnect');
		socket.removeListener(eventName);
		socket.destroy();
	});
};

export const unSubscribeEvent = (eventName) => dispatch => {
	socket.removeListener(eventName);
	// обязательно чистим интервалы
	socket.emit('clear-interval');
	dispatch({
		type: SET_ACTIVE_MODE,
		eventName,
		active: false
	});
	dispatch({
		type: UPDATE_VALUE,
		payload: {
			eventName,
			value: null
		}
	});
};
