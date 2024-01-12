import { Layout } from 'antd';
import styled from 'styled-components';
import { THEME_DARK_COLOR, WHITE } from './constants';

export const StyledHeader = styled(Layout.Header)`
	background: ${THEME_DARK_COLOR};
`;

export const LogoText = styled.span`
	color: ${WHITE};
	font-weight: bolder;
	font-size: 1.5rem;
`;
