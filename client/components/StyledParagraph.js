import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
	color: ${({color}) => color};
	font-size: ${({size}) => `${size}px`};
	margin-bottom: ${({outdent}) => outdent || 0};
	text-align: ${({align}) => align || 'left'};
	vertical-align: ${({verticalAlign}) => verticalAlign};
	display: ${({display}) => display};
`;

export default StyledParagraph;
