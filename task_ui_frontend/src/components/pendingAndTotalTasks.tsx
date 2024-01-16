import { Col, Skeleton, Space } from 'antd';
import useSWR from 'swr';
import { getAxios } from '../services/HttpService';
import { BLACK_0_45, WHITE } from '../styles/constants';
import { Divider } from '../styles/divider';

export const getTotalAndPendingTasksFetcher = async () => {
	return await getAxios('/task/getTotalAndPendingTasks');
};
const PendingAndTotalTasks = () => {
	const { data, isLoading, error }: any = useSWR(
		'/task/getTotalAndPendingTasks',
		() => getTotalAndPendingTasksFetcher()
	);
	return (
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
			<Space
				style={{ color: BLACK_0_45, fontSize: '3rem', textAlign: 'center' }}
			>
				<div>
					<Space direction="vertical">
						<span style={{ fontSize: '2rem' }}>Pending Tasks</span>
						{isLoading || error ? (
							<Skeleton />
						) : (
							<span>{data?.data?.pendingTasks}</span>
						)}
					</Space>
				</div>
				<Divider />
				<div>
					<Space direction="vertical">
						<span style={{ fontSize: '2rem' }}>Total Tasks</span>
						{isLoading || error ? (
							<Skeleton />
						) : (
							<span>{data?.data?.totalTasks}</span>
						)}
					</Space>
				</div>
			</Space>
		</Col>
	);
};
export default PendingAndTotalTasks;
