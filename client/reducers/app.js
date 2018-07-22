import {GET_AVAILABLE_EVENTS, SET_ACTIVE_MODE, UPDATE_VALUE} from '../types/app';

const initialState = {
	availableEvents: []
};

const updateStoreItem = (state, action, key, value) => {
	const actionEventName = action.eventName || action.payload.eventName;
	const availableEvents = state.availableEvents.map((event) => {
		const {eventName} = event;
		return eventName === actionEventName
			? Object.assign({}, event, {[key]: value})
			: event;
	});
	return Object.assign({}, state, {availableEvents});
};

export default function loginPageReducer (state = initialState,action) {
	switch (action.type) {
		case GET_AVAILABLE_EVENTS:
			return Object.assign({}, state, {availableEvents: action.payload});
		case SET_ACTIVE_MODE:
			return updateStoreItem(state, action, 'active', action.active);
		case UPDATE_VALUE:
			return updateStoreItem(state, action, 'value', action.payload.value);
		default:
			return state;
	}
}
