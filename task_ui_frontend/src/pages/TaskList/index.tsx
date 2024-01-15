import { Row } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Analytics from '../../components/analytics';
import FilterSection from '../../components/FilterSection';
import SubHeader from '../../components/PageSubHeader';
import TaskListTable from '../../components/TaskListTable';
import { getGreeting } from '../../helper/taskList';
import { BLACK_0_25, WHITE } from '../../styles/constants';

const TaskList = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState({});
	const navigate = useNavigate();
	return (
		<>
			<SubHeader
				onFilterClick={() => setShowFilters((prev) => !prev)}
				onCreateNew={() => navigate('create-tasks')}
				createNewText="Create New Task"
				text="Task List"
			/>

			<Row
				style={{
					padding: '15px 15px',
					fontSize: '20px',
					fontWeight: 500,
					borderBottom: `3px solid ${BLACK_0_25}`,
					borderTop: `3px solid ${BLACK_0_25}`,
					background: WHITE,
				}}
			>
				<div className="heading">
					{getGreeting()}, {'Guri'}
				</div>
			</Row>
			<Analytics />
			{showFilters ? (
				<FilterSection filters={filters} setFilters={setFilters} />
			) : null}
			<TaskListTable filters={filters} />
			<Outlet />
		</>
	);
};
export default TaskList;
