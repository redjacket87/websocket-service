import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAvailableEvents, subscribeEvent, unSubscribeEvent} from '../actions/app';
import {EventPlate} from '../components';

const mapStateToProps = ({availableEvents}) => ({
	availableEvents
});

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({
		getAvailableEvents,
		subscribeEvent,
		unSubscribeEvent
	}, dispatch)
);

/**
 * Контейнер страницы логина
 */
class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getAvailableEvents();
	}

	render() {
		const {availableEvents, subscribeEvent, unSubscribeEvent} = this.props;
		return availableEvents
		? availableEvents.map(({eventName, active, value}) => {
			return <EventPlate
				eventName={eventName}
				active={active}
				subscribeEvent={subscribeEvent}
				unSubscribeEvent={unSubscribeEvent}
				value={value}
			/>
		})
		: null;
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
