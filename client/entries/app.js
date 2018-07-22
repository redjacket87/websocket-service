import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';
import {Provider} from 'react-redux';
import {AlertLantern} from '../components';
import AppContainer from '../containers/app';
import  configureStore  from '../store/app';
import {login} from '../../app-config';

const StyledContainer = styled.div`
	max-width: 1024px;
	min-height: 500px;
	margin: 40px auto;
	border: 3px solid #e0ddd7;
	border-radius: 10px;
	box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
	padding: 10px;
`;

const store = configureStore();
const App = () => (
	<Provider store = {store}>
		<StyledContainer>
			<AlertLantern
				style='success'
				text={`Добро пожаловать, ${login}`}
				visibility={true}
				textSize='25'
				align='center'
			/>
			<AppContainer />
		</StyledContainer>
	</Provider>
);

render(
<App />,
document.getElementById('root')
);
