import { css } from 'styled-components';


export const THEME_DARK_COLOR = '#002538'
export const WHITE = "#FFF"
export const BODY_BG_COLOR = '#FAFAFA'
export const PRIMARY_6_BLUE = 'var(--Primary-6, #1890ff)'
export const PRIMARY_BLUE = '#1890FF'
export const BLACK_0_65 = 'rgba(0, 0, 0, 0.65)'
export const BLACK_0_85 = 'rgba(0, 0, 0, 0.85)'
export const BLACK_0_45 = 'rgba(0, 0, 0, 0.45)'
export const BLACK_0_25 = 'rgba(0, 0, 0, 0.25)'
export const POLAR_GREEN_6 = '#52C41A'
export const SIZES = {
	SMALL_MOBILE: '320px',
	MOBILE: '576px',
	TABLET: '768px',
	LAPTOP: '1024px',
	DESKTOP: '2560px',
};
export const smallMobile = (inner: any) => css`
	@media (max-width: ${SIZES.SMALL_MOBILE}) {
		${inner};
	}
`;
export const mobile = (inner: any) => css`
	@media (max-width: ${SIZES.MOBILE}) {
		${inner};
	}
`;
export const tablet = (inner: any) => css`
	@media (max-width: ${SIZES.TABLET}) {
		${inner};
	}
`;
export const desktop = (inner: any) => css`
	@media (max-width: ${SIZES.DESKTOP}) {
		${inner};
	}
`;
export const laptop = (inner: any) => css`
	@media (max-width: ${SIZES.LAPTOP}) {
		${inner};
	}
`;
