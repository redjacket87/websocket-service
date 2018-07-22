import * as React from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';
import {AlertLantern, LoginGroup} from '../components/';
import {changeInputValue, appLogin} from '../actions/login';
import {texts} from '../../app-config';

const mapStateToProps = ({error, login, password}) => ({
	error,
	login,
	password
});

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({
		changeInputValue,
		appLogin
	}, dispatch)
);

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: raw;
	justify-content: flex-end;
`;

/**
 * Контейнер страницы логина
 */
class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.onButtonClick = this.onButtonClick.bind(this);
	}

	onButtonClick() {
		const {login, password} = this.props;
		this.props.appLogin(login, password);
	}

	render() {
		const {error, changeInputValue} = this.props;
		const lanternStyle = error ? 'danger' : 'info';
		const lanternText = error ? error : texts['need-authorize'];
		return (
			<div>
				<AlertLantern
					style={lanternStyle}
					text={lanternText}
					visibility={true}
					textSize='16'
					align='center'
				/>
				<LoginGroup onInputChange={changeInputValue}/>
				<ButtonWrapper>
					<Button bsStyle="primary" onClick={this.onButtonClick}>
						Enter &#8658;
					</Button>
				</ButtonWrapper>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);
