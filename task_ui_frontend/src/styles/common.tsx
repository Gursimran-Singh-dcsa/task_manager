import { css, styled } from 'styled-components';
import { PRIMARY_6_BLUE, PRIMARY_BLUE } from './constants';

export const ThemedButton = styled.button<{
	$type: 'neutral' | 'primary';
	$disabled?: boolean;
}>`
	display: flex;
	padding: 6.4px 15px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	height: 32px;
	border-radius: 2px;
	box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
	cursor: pointer;
	flex-grow: 1;
	${(props: { $type: 'neutral' | 'primary'; $disabled?: boolean }) => css`
		${!props.$disabled
			? `
    border: ${
			props.$type === 'primary'
				? `1px solid  ${PRIMARY_6_BLUE}`
				: `1px solid ${PRIMARY_BLUE}`
		};
    background: ${
			props.$type === 'primary' ? PRIMARY_6_BLUE : 'var(--Neutral-1, #FFF)'
		};
    color: ${props.$type === 'primary' ? 'white' : 'black'};
    `
			: `
    border: 1px solid #D9D9D9;
    background: #F5F5F5;
    color: rgba(0, 0, 0, 0.25);
    `}
	`}
`;
