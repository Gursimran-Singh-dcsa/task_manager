import { Badge, Col, message, Progress, Row, Skeleton, Tooltip } from 'antd';
import React from 'react';
import useSWR from 'swr';
import { getAxios } from '../services/HttpService';
import { BLACK_0_45, WHITE } from '../styles/constants';
import PendingAndTotalTasks from './pendingAndTotalTasks';

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
				sm={12}
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
			<PendingAndTotalTasks />
			
		</Row>
	);
};

export default Analytics;
