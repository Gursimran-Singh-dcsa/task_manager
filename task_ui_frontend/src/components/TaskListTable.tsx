import { Col, message, Row, Space, Table, Tooltip } from 'antd';
import { BACKEND_API_DATE_FORMAT, priorityMenuItems } from '../constant';
import { useEffect, useState } from 'react';
import { LinkButton } from '../styles/common';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { handleDelete, taskFetcher } from '../helper/taskList';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router';
import { createTask } from '../helper/createTask';
export const getQueryParams = (filters: any, currentPage: number) => {
	let filterString = `?pageNumber=${currentPage}`;
	Object.keys(filters).forEach((filterItem: string) =>
		filters[filterItem]
			? (filterString = filterString + `&${filterItem}=${filters[filterItem]}`)
			: null
	);
	return filterString;
};

export const getTaskColumns = (mutate: Function, navigate: Function) => [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		width: 100
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		width: 300
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
		width: 80
	},
	{
		title: 'Is Complete',
		dataIndex: 'isComplete',
		key: 'isComplete',
		width: 50,
		render: (val: boolean) => {
			if (val) return <span style={{ fontSize: '20px' }}>✅</span>;
			else return <span style={{ fontSize: '20px' }}>❌</span>;
		},
	},
	{
		title: 'Due Date',
		dataIndex: 'dueDate',
		key: 'dueDate',
		render: (val: string) => {
			return <span>{dayjs(val).format(BACKEND_API_DATE_FORMAT)}</span>;
		},
		width: 100
	},
	{
		title: 'Action',
		width: 300,
		render: (row: any) => {
			return (
				<Space>
					<LinkButton
						onClick={async () =>
							handleDelete([row._id])
								.then(() => {
									mutate('/task/getTask');
								})
								.catch(() => {
									'failed deleting tasks, please try again';
								})
						}
					>
						|
						<Tooltip title="delete">
							{' '}
							<DeleteOutlined />
						</Tooltip>{' '}
						|
					</LinkButton>
					<LinkButton
						onClick={() =>
							navigate('create-tasks', {
								state: {
									isEdit: true,
									data: row,
								},
							})
						}
					>
						<Tooltip title="edit">
							<EditOutlined />{' '}
						</Tooltip>
						|
					</LinkButton>
					{row.isComplete ? null : (
						<LinkButton
							onClick={async () => {
								createTask({ ...row, isComplete: true }, true).then((res) => {
									if (!res.isError) message.success('Task Marked as done');
									mutate('/task/getTask');
								});
							}}
						>
							Mark Done |
						</LinkButton>
					)}
				</Space>
			);
		},
	},
];

const TaskListTable = ({ filters }: any) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { state = null } = location;

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedRows, setSelectedRows] = useState([]);
	const [queryParams, setQueryParams] = useState(
		getQueryParams(filters, currentPage)
	);
	const { data, isLoading, error, mutate }: any = useSWR(
		['/task/getTask', queryParams],
		() => taskFetcher(queryParams)
	);
	useEffect(() => {
		if (state?.mutate) {
			mutate('/task/getTask');
		}
	}, [state]);

	useEffect(() => {
		setQueryParams(getQueryParams(filters, currentPage));
	}, [filters]);

	return (
		<>
			<Row style={{ height: '50px', display: 'flex', alignItems: 'center' }}>
				<Col xs={12} sm={6} lg={4} style={{ fontSize: '20px' }}>
					Total {data?.data?.totalDocs} Tasks
				</Col>
				{selectedRows.length ? (
					<Col>
						<LinkButton
							onClick={async () =>
								handleDelete(selectedRows)
									.then((res) => {
										if (!res?.isError)
											message.success('Selected Tasks are deleted!!');
										mutate('/task/getTask');
									})
									.catch(() => {
										'failed deleting tasks, please try again';
									})
									.finally(() => {
										setSelectedRows([]);
									})
							}
						>
							Delete Selected
						</LinkButton>
					</Col>
				) : null}
			</Row>
			<Table
				style={{ overflowX: 'auto', minWidth: '800px' }}
				dataSource={
					error
						? []
						: data?.data?.taskList.map((list: any) => ({
								...list,
								key: list._id,
						  })) ?? []
				}
				columns={getTaskColumns(mutate, navigate)}
				loading={isLoading}
				rowSelection={{
					type: 'checkbox',
					selectedRowKeys: selectedRows,
					onChange: (newKeys: any) => setSelectedRows(newKeys),
				}}
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
		</>
	);
};

export default TaskListTable;
