import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import styled from 'styled-components';

const LoginGroupWrapper = styled(FormGroup)`
	display: flex;
`;

const onChangeHandler = (event, onInputChange) => {
	const {name, value} = event.target;
	onInputChange(name, value);
};

const LoginGroup = ({onInputChange}) => (
		<LoginGroupWrapper bsSize="large">
			<FormControl type="text" placeholder="Login" name="login" onChange = {(event) => onChangeHandler(
				event, onInputChange
			)}/>
			<FormControl type="password" placeholder="Password" name="password" onChange = {(event) => onChangeHandler(
				event, onInputChange
			)}/>
		</LoginGroupWrapper>
);

export default LoginGroup;