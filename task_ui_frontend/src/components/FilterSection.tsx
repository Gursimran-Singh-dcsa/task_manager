import { Row, Col, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { priorityMenuItems } from '../constant';
import { LinkButton } from '../styles/common';

const { Search } = Input;

const FilterSection = ({
	filters,
	setFilters,
}: {
	filters: any;
	setFilters: Function;
}) => {
	return (
		<Row style={{ padding: '20px 0px', alignItems: 'center' }}>
			<Col xs={12} lg={6}>
				<Search
					style={{ maxWidth: '240px' }}
					value={filters.keywords}
					onChange={(e) => {
						setFilters((prev: any) => {
							return {
								...prev,
								keywords: e.target.value,
							};
						});
					}}
					placeholder="Search by Comma Separated Keywords"
				/>
			</Col>
			<Col xs={12} lg={6}>
				<Select
					style={{ width: '100%', maxWidth: '240px' }}
					allowClear
					value={filters.createdBy}
					placeholder="Priority"
					options={priorityMenuItems}
					onChange={(value) => {
						console.log('value is', value);
						setFilters((prev: any) => ({ ...prev, priority: value }));
					}}
				/>
			</Col>
			<Col xs={12} lg={6}>
				<DatePicker
					allowClear
					value={filters.createdOn}
					style={{ width: '100%', maxWidth: '240px' }}
					placeholder="Created On"
					disabledDate={(current) => {
						return current > dayjs().endOf('day');
					}}
					onChange={(date) =>
						setFilters((prev: any) => ({ ...prev, createdOn: date }))
					}
				/>
			</Col>
			<Col
				xs={12}
				lg={6}
				style={{ display: 'flex', justifyContent: 'flex-end' }}
			>
				<LinkButton
					onClick={() => {
						setFilters({
							keywords: '',
							createdBy: [],
							createdOn: null,
						});
					}}
				>
					Clear All Filters
				</LinkButton>
			</Col>
		</Row>
	);
};

export default FilterSection;
