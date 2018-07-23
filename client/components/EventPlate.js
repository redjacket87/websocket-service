import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import StyledParagraph from './StyledParagraph';

const Paragraph = styled(StyledParagraph)`
	&&& {
		margin-right: 20px;
	}
`;

const StyledButton = styled(Button)`
	&&& {
		margin-right: 20px;
	}
`;

class EventPlate extends React.Component {
	constructor(props) {
		super(props);
		this.subscribeEvent = this.subscribeEvent.bind(this);
		this.unSubscribeEvent = this.unSubscribeEvent.bind(this);
	}

	subscribeEvent(eventName) {
		this.props.subscribeEvent(eventName);
	}

	unSubscribeEvent(eventName) {
		console.log(this.props);
		this.props.unSubscribeEvent(eventName);
	}

	render() {
		const {active} = this.props;
		const buttonText = active ? 'Отписаться' : 'Подписаться';
		const buttonStyle = active ? 'primary' : 'success';
		return (
			<Panel {...this.props}>
				<Panel.Body {...this.props}>
					<Paragraph
						color='#31708f'
						size='25'
						verticalAlign='middle'
						display='inline-block'
					>
						{this.props.eventName}
					</Paragraph>
					<StyledButton
						bsStyle={buttonStyle}
						bsSize='small'
						onClick={active
							? () => this.unSubscribeEvent(this.props.eventName)
							: () => this.subscribeEvent(this.props.eventName)
						}>
						{buttonText}
					</StyledButton>
					<Paragraph
						color='#31708f'
						size='25'
						verticalAlign='middle'
						display='inline-block'
					>
						{this.props.value ? this.props.value : ''}
					</Paragraph>
					<Paragraph
						color='#31708f'
						size='20'
						verticalAlign='middle'
						display='inline-block'
					>
						{this.props.error ? 'Ждем подключения к серверу...' : ''}
					</Paragraph>
				</Panel.Body>
			</Panel>
		)
	}
}

export default EventPlate;