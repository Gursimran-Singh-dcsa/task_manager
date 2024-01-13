import { ThemedButton } from '../styles/common';
import { BLACK_0_45, BLACK_0_85 } from '../styles/constants';
import { PageSubHeader } from '../styles/PageSubHeader';
import { FilterOutlined } from '@ant-design/icons';

const SubHeader = ({
	onFilterClick,
	onCreateNew,
	createNewText,
	text,
	subText,
}: {
	onFilterClick: Function;
	onCreateNew: Function;
	createNewText: string;
	text: string;
	subText?: string;
}) => {
	return (
		<PageSubHeader >
			<span style={{ color: BLACK_0_85, fontWeight: 500, fontSize: '20px' }}>
				{text}
			</span>
			{subText ? (
				<span
					style={{
						marginLeft: '16px',
						color: BLACK_0_45,
						fontSize: '14px',
						borderLeft: `1px solid ${BLACK_0_45}`,
						paddingLeft: '8px',
						lineHeight: '22px',
					}}
				>
					{subText}
				</span>
			) : null}
			<div className="buttonContainter">
				<ThemedButton $type="neutral" onClick={() => onFilterClick()}>
					Filter <FilterOutlined />
				</ThemedButton>
				<ThemedButton onClick={() => onCreateNew()} $type="primary">
					{createNewText}
				</ThemedButton>
			</div>
		</PageSubHeader>
	);
};
export default SubHeader;
