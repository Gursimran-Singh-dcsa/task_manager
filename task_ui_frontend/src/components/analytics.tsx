import {
	Badge,
	Col,
	message,
	Progress,
	Row,
	Skeleton,
	Table,
	Tooltip,
} from 'antd';
import React from 'react';
import useSWR from 'swr';
import { getAxios } from '../services/HttpService';
import { BLACK_0_45, WHITE } from '../styles/constants';

const data = {
	totalTasksPending: 10,
	lowPriority: 3,
	highPriority: 5,
	mediumPriority: 2,
	totalTasksTillToday: 30,
	totalTasksCompletedOnTimeTillToday: 25,
	totalTaksCompletedAfterDeadline: 18,
	tasksCompletedYesterday: 3,
	tasksCompletedToday: 5,
	tasksToCompleteByTomorrow: 3,
};

const fetchAnalyticsByPriority = async () => {
	try {
		const data: any = await getAxios('/task/getPendingTaskByPriority');
		const modifiedData: any = {};
		let total = 0;
		data?.data?.forEach((item: any) => {
			total = total + item.count;
			if (item._id === 'medium')
				return (modifiedData.mediumPriority = item.count);
			if (item._id === 'low') return (modifiedData.lowPriority = item.count);
			if (item._id === 'high') return (modifiedData.highPriority = item.count);
		});
		modifiedData.totalTasksPending = total;
		return modifiedData;
	} catch (err) {
		message.error('Failed getting Task List please retry');
	}
};
const Analytics = () => {
	const { data, isLoading, error } = useSWR(
		'/task/getPendingTaskByPriority',
		() => fetchAnalyticsByPriority()
	);
	return (
		<Row
			style={{ padding: '12px 20px', background: WHITE, minHeight: '350px' }}
		>
			<Col
				xs={24}
				sm={8}
				style={{
					background: WHITE,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{isLoading || error ? (
					<Skeleton />
				) : (
					<>
						<Tooltip title="">
							<Progress
								// percent={100}
								percent={
									((data.lowPriority + data.highPriority) * 100) /
									data.totalTasksPending
								}
								success={{
									percent: (data.highPriority * 100) / data.totalTasksPending,
									strokeColor: 'red',
								}}
								trailColor={
									data.totalTasksPending === 1
										? data.lowPriority === 1
											? 'green'
											: data?.mediumPriority === 1
											? 'orange'
											: 'red'
										: data?.mediumPriority === 0
										? 'grey'
										: 'orange'
								}
								strokeColor="green"
								size={310}
								format={() => (
									<React.Fragment>
										<Badge color="red" />{' '}
										<span
											style={{
												color: 'red',
												width: '4px',
												height: '4px',
												borderRadius: 50,
												fontSize: '16px',
											}}
										>
											High - {data.highPriority}
										</span>
										<br />
										<Badge color="orange" />{' '}
										<span
											style={{
												color: 'orange',
												width: '4px',
												height: '4px',
												borderRadius: 50,
												fontSize: '16px',
											}}
										>
											Medium - {data.mediumPriority}
										</span>
										<br />
										<Badge color="green" />{' '}
										<span
											style={{
												color: 'green',
												width: '4px',
												height: '4px',
												borderRadius: 50,
												fontSize: '16px',
											}}
										>
											Low - {data.lowPriority}
										</span>
									</React.Fragment>
								)}
								type="dashboard"
							/>
						</Tooltip>
						<div style={{ color: BLACK_0_45 }}>
							Total Pending Tasks: {data.totalTasksPending}
						</div>
					</>
				)}
			</Col>
			{/* <Col
				xs={24}
				sm={8}
				style={{
					background: WHITE,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{data.totalTasksCompletedOnTimeTillToday / data.totalTasksTillToday <
				0.5 ? (
					<div style={{ fontSize: '15rem', maxHeight: '300px' }}>😥</div>
				) : (
					<div style={{ fontSize: '15rem', maxHeight: '300px' }}>😀</div>
				)}
				<div style={{ color: BLACK_0_45 }}>
					On Time Completion Rate is:{' '}
					{(
						(data.totalTasksCompletedOnTimeTillToday /
							data.totalTasksTillToday) *
						100
					).toFixed(2) + '%'}
				</div>
			</Col>
			<Col
				xs={24}
				sm={8}
				style={{
					background: WHITE,
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<Table
					columns={[
						{
							title: '',
							dataIndex: 'type',
							key: 'type',
						},
						{
							title: '',
							dataIndex: 'value',
							key: 'count',
						},
					]}
					dataSource={[
						{
							type: 'Completed Yesterday',
							value: data.tasksCompletedYesterday,
						},

						{
							type: 'Completed Today',
							value: data.tasksCompletedToday,
						},
						{
							type: 'Pending for Today',
							value: data.tasksCompletedToday,
						},
						{
							type: 'To Complete By tomorrow',
							value: data.tasksToCompleteByTomorrow,
						},
					]}
					showHeader={false}
					pagination={false}
				/>
				<div style={{ color: BLACK_0_45 }}>Tasks Summary</div>
			</Col> */}
		</Row>
	);
};

export default Analytics;
