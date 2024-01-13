import { Badge, Col, Progress, Row, Table, Tooltip } from 'antd';
import React from 'react';
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
const Analytics = () => {
	return (
		<Row style={{ padding: '12px 20px', background: WHITE, height: '350px' }}>
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
				<Tooltip title="">
					<Progress
						percent={
							((data.lowPriority + data.mediumPriority) * 100) /
							data.totalTasksPending
						}
						success={{
							percent: (data.lowPriority * 100) / data.totalTasksPending,
						}}
						trailColor="red"
						strokeColor="orange"
						// showInfo={false}
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
			</Col>
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
			</Col>
		</Row>
	);
};

export default Analytics;
