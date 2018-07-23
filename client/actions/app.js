import axios from 'axios';
import {getUrls, interval} from '../../app-config';
import {GET_AVAILABLE_EVENTS, SET_ACTIVE_MODE, UPDATE_VALUE, SET_ERROR} from '../types/app';
import io from 'socket.io-client';
const socket = io({
	autoConnect: true
});


export const getAvailableEvents = () => dispatch => {
	const {getAvailableEventsUrl} = getUrls();
	axios.get(getAvailableEventsUrl)
		.then(({data}) => {
			const {events = []} = data;
			const eventsToCollection = events.map((event) => {
				return {
					eventName: event,
					active: false,
					error: false
				}
			});
			dispatch({
				type: GET_AVAILABLE_EVENTS,
				payload: eventsToCollection
			})
		})
};

// @todo redjacket87 Вынести лапшу в отдельные методы
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
	dispatch({
		type: SET_ERROR,
		payload: {
			eventName,
			error: false
		}
	});
	socket.emit('check-connection');
	socket.on('disconnect', () => {
		dispatch({
			type: UPDATE_VALUE,
			payload: {
				eventName,
				value: null
			}
		});
		dispatch({
			type: SET_ERROR,
			payload: {
				eventName,
				error: true
			}
		});
		console.log('disconnect');
		socket.removeListener(eventName);
	});
};

export const unSubscribeEvent = (eventName) => dispatch => {
	socket.removeListener(eventName);
	// обязательно чистим интервалы
	socket.emit('clear-interval', {eventName});
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
	dispatch({
		type: SET_ERROR,
		payload: {
			eventName,
			error: false
		}
	});
};
