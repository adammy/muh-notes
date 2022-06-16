import styled from 'styled-components';

import { border, negativeLight } from '@/core/colors';

export const Wrapper = styled.div`
	padding: 1.5rem 2rem;
`;

export const Text = styled.div`
	font-size: 1.1rem;
	line-height: 1.5;
`;

export const Name = styled.div`
	color: ${negativeLight};
	font-size: 1.6rem;
	font-weight: 300;
	margin: 0.25rem 0 1.25rem;
	padding: 0 0 0.75rem;
	border-bottom: 1px solid ${border};
`;
