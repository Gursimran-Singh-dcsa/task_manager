import { message, Space, Table, Tooltip } from 'antd';
import { getAxios } from '../services/HttpService';
import { priorityMenuItems } from '../constant';
import { useEffect, useState } from 'react';
import { LinkButton } from '../styles/common';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useSWR from 'swr';
export const getQueryParams = (filters: any, currentPage: number) => {
	let filterString = `?pageNumber=${currentPage}`;
	Object.keys(filters).forEach((filterItem: string) =>
		filters[filterItem]
			? (filterString = filterString + `&${filterItem}=${filters[filterItem]}`)
			: null
	);
	return filterString;
};
export const taskFetcher = async (queryParams: string) => {
	try {
		return await getAxios(`/task/getTask${queryParams}`);
	} catch (err) {
		message.error('Failed getting Task List please retry');
	}
};

export const taskColumns: any = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Priority',
		dataIndex: 'priority',
		key: 'priority',
		render: (val: string) => {
			return priorityMenuItems.find(
				(item: any) => item.key.toLowerCase() === val.toLowerCase()
			)?.label;
		},
	},
	{
		title: 'Is Complete',
		dataIndex: 'isComplete',
		key: 'isComplete',
		render: (val: boolean) => {
			if (val) return <span style={{ fontSize: '20px' }}>✅</span>;
			else return <span style={{ fontSize: '20px' }}>❌</span>;
		},
	},
	{
		title: 'Action',
		render: (row: any) => {
			return (
				<Space>
					<LinkButton>
						|
						<Tooltip title="delete">
							{' '}
							<DeleteOutlined />
						</Tooltip>{' '}
						|
					</LinkButton>
					<LinkButton>
						<Tooltip title="edit">
							<EditOutlined />{' '}
						</Tooltip>
						|
					</LinkButton>
					{row.isComplete ? null : <LinkButton>Mark Done |</LinkButton>}
				</Space>
			);
		},
	},
];

const TaskListTable = ({ filters }: any) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [queryParams, setQueryParams] = useState(
		getQueryParams(filters, currentPage)
	);
	const { data, isLoading, error }: any = useSWR(
		['/task/getTask', queryParams],
		() => taskFetcher(queryParams)
	);

	useEffect(() => {
		setQueryParams(getQueryParams(filters, currentPage));
	}, [filters]);

	return (
		<Table
			dataSource={isLoading || error ? [] : data?.data?.taskList ?? []}
			columns={taskColumns}
			loading={isLoading}
			rowSelection={{}}
			pagination={{
				total: data?.data?.totalDocs,
				pageSize: 10,
				showLessItems: true,
				onChange: (page: number) => {
					setCurrentPage(page);
					setQueryParams(getQueryParams(filters, page));
				},
			}}
		/>
	);
};

export default TaskListTable;
