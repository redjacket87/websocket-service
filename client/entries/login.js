import React from 'react'
import {render} from 'react-dom'
import styled from 'styled-components';
import {default as LoginPageContainer} from '../containers/login';
import {Provider} from 'react-redux'
import  configureStore  from '../store/login';

const StyledContainer = styled.div`
	background-color: #e0ddd7;
	box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
	width: 512px;
	height: 250px;
	margin: 40px auto;
	padding: 10px;
`;

const store = configureStore();
const LoginPage = () => (
	<Provider store = {store}>
		<StyledContainer>
			<LoginPageContainer />
		</StyledContainer>
	</Provider>
);

render(
	<LoginPage />,
	document.getElementById('root')
);