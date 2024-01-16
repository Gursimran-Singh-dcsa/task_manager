import { Row, Col, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { priorityMenuItems } from '../constant';
import { LinkButton } from '../styles/common';
import _ from 'lodash';
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
					onChange={_.debounce((e) => {
						setFilters((prev: any) => {
							return {
								...prev,
								keyword: e.target.value,
							};
						});
					}, 400)}
					placeholder="Search by name"
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
						setFilters((prev: any) => ({ ...prev, priority: value?.toLowerCase() }));
					}}
				/>
			</Col>
			<Col xs={12} lg={6}>
				<DatePicker
					allowClear
					value={filters.createdOn}
					style={{ width: '100%', maxWidth: '240px' }}
					placeholder="Due Date"
					disabledDate={(current) => {
						return current < dayjs().endOf('day');
					}}
					onChange={(date) =>
						setFilters((prev: any) => ({ ...prev, dueDate: date?.format('YYYY-MM-DD') }))
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
