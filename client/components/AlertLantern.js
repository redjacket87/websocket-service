import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import styled from 'styled-components';
import {StyledParagraph} from './';

const AlertLanternWrapper = styled.div`
	visibility: ${({visibility}) => visibility ? '' : 'hidden'};
`;

const AlertLantern = ({style, text, visibility, textSize, textColor, align}) => (
	<AlertLanternWrapper visibility={visibility}>
		<Alert bsStyle={style}>
			<StyledParagraph size={textSize} color={textColor} align={align}>{text}</StyledParagraph>
		</Alert>
	</AlertLanternWrapper>
);

export default  AlertLantern;