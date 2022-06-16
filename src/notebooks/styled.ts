import styled from 'styled-components';

import { light, negativeLight, negativeLightest, primary, primaryLight, primaryLightest } from '@/core/colors';

export const Name = styled.div`
	font-size: 1.1rem;
	font-weight: 700;
`;

export const Actions = styled.div`
	display: flex;
	visibility: hidden;
`;

export const Action = styled.div`
	color: ${primaryLightest};
	font-size: 1.1rem;
	margin-right: 0.5rem;
	transition: 0.1s all ease-in-out;

	&:last-child {
		margin-right: 0;
	}

	&:hover {
		color: ${light};
	}
`;

export const NotebookItem = styled.div<{ active: boolean }>`
	background: ${props => props.active ? primary : "transparent"};
	color: ${props => props.active ? light : primary};
	padding: 0.7rem 1.5rem;
	display: flex;
	justify-content: space-between;
	transition: 0.1s all ease-in-out;
	cursor: pointer;

	&:hover {
		background: ${primaryLight};
		color: ${light};
	}

	&:hover ${Actions} {
		visibility: visible;
	}
`;

export const Add = styled.div`
	color: ${negativeLightest};
	padding: 0.7rem 1.5rem;
	margin: 1rem 0 0;
	transition: 0.1s all ease-in-out;
	cursor: pointer;

	&:hover {
		color: ${negativeLight};
	}
`;
