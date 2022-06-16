import styled, { css } from 'styled-components';

import { light, negativeLight, negativeLightest, primary, primaryAlternate, primaryLight } from '@/core/colors';

export const Name = styled.div`
	color: ${primary};
	font-size: 1.1rem;
	font-weight: 700;
`;

export const LastUpdated = styled.div`
	color: ${negativeLightest};
	font-size: 0.85rem;
	font-weight: 700;
`;

export const Preview = styled.div`
	color: ${negativeLightest};
	font-size: 0.85rem;
	margin: 0.25rem 0;
`;

export const NoteItem = styled.div<{ active: boolean }>`
	background: ${props => props.active ? primaryAlternate : "transparent"};
	padding: 0.7rem 1.5rem;
	transition: 0.1s all ease-in-out;
	cursor: pointer;

	&:hover {
		background: ${primaryLight};
	}

	${props => props.active && css`
		${Name}, ${LastUpdated}, ${Preview} {
			color: ${light};
		}
	`}

	&:hover ${Name}, &:hover ${LastUpdated}, &:hover ${Preview} {
		color: ${light};
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
