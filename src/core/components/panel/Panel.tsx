import styled from 'styled-components';

export const Panel = styled.div<{ backgroundColor: string; textColor: string; }>`
	background: ${props => props.backgroundColor};
	color: ${props => props.textColor};
	height: 100vh;
	overflow: auto;
`;

export const Title = styled.h2`
	font-size: 1rem;
	font-weight: 700;
	text-transform: uppercase;
	padding: 2rem 1.5rem 1rem;
	margin: 0;
`;
