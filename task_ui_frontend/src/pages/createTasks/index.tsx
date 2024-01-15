import { Modal, Row, Input, DatePicker, Col, Dropdown, Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BACKEND_API_DATE_FORMAT, priorityMenuItems } from '../../constant';
import { ThemedButton } from '../../styles/common';
import { ErrorMessageWrapper } from '../../styles/createTasks';
import { DownOutlined } from '@ant-design/icons';
import { createTask, isValidData, validator } from '../../helper/createTask';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

const CreateTasks = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { state = null } = location;
	const [taskData, setTaskData] = useState<any>({
		data: state?.isEdit
			? { ...state?.data, dueDate: dayjs(state?.data?.dueDate) }
			: {
					name: '',
					description: '',
					dueDate: null,
					priority: '',
					isComplete: false,
			  },
		error: {
			name: '',
			description: '',
			dueDate: '',
			priority: '',
		},
	});
	return (
		<Modal
			open={true}
			closable
			onCancel={() => navigate(-1)}
			title={
				<div
					style={{
						color: 'black',
						fontWeight: 500,
						fontSize: '20px',
						boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, 0.04)',
						marginBottom: '20px',
						paddingBottom: '10px',
					}}
				>
					{state?.isEdit ? 'Edit Task' : 'Create Task'}
				</div>
			}
			footer={() => (
				<div
					style={{
						display: 'flex',
						padding: '10px 0px',
						justifyContent: 'flex-end',
						alignItems: 'center',
						gap: '8px',
						boxShadow: '0px 1px 0px 0px #F0F0F0 inset',
					}}
				>
					<div
						style={{
							display: 'flex',
							padding: '10px 16px',
							justifyContent: 'flex-end',
							alignItems: 'center',
							gap: '8px',
							alignSelf: 'stretch',
						}}
					>
						<ThemedButton $type="neutral" onClick={() => navigate(-1)}>
							Cancel
						</ThemedButton>
						<ThemedButton
							$disabled={!isValidData(taskData)}
							$type="primary"
							onClick={async () => {
								if (!isValidData(taskData)) return;
								else
									createTask(
										{
											...taskData.data,
											dueDate: taskData?.data?.dueDate?.format(
												BACKEND_API_DATE_FORMAT
											),
											priority: taskData?.data?.priority?.toLowerCase(),
										},
										state?.isEdit
									).finally(async () => {
										// await mutate('/task/getTask')
										navigate('/task-list', {
											state: {
												mutate: true,
											},
										});
									});
							}}
						>
							{state?.isEdit ? 'Edit' : 'Create'}
						</ThemedButton>
					</div>
				</div>
			)}
		>
			<div style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
				<Row>
					<Input
						defaultValue={state?.isEdit ? state?.data?.name : ''}
						placeholder="Ex: Complete MERN Assignment"
						onChange={(e) => {
							validator('name', e.target.value, setTaskData);
						}}
					/>
					{taskData.error.name ? (
						<ErrorMessageWrapper>{taskData.error.name}</ErrorMessageWrapper>
					) : null}
				</Row>
				<Row>
					<Input.TextArea
						defaultValue={state?.isEdit ? state?.data?.description : ''}
						rows={4}
						style={{ width: '100%' }}
						placeholder="Ex: Task Assigned To Assess MERN Skills"
						onChange={(e) => {
							validator('description', e.target.value, setTaskData);
						}}
					/>
					{taskData.error.description ? (
						<ErrorMessageWrapper>
							{taskData.error.description}
						</ErrorMessageWrapper>
					) : null}
				</Row>
				<Row>
					<Col xs={12}>
						<DatePicker
							allowClear
							style={{ width: '100%', maxWidth: '240px' }}
							placeholder="Due Date"
							disabledDate={(current) => {
								return current < dayjs().endOf('day');
							}}
							value={taskData.data.dueDate ? taskData.data.dueDate : null}
							onChange={(date) => {
								validator('dueDate', date, setTaskData);
							}}
						/>
						{taskData.error.dueDate ? (
							<ErrorMessageWrapper>
								{taskData.error.dueDate}
							</ErrorMessageWrapper>
						) : null}
					</Col>
					<Col
						xs={12}
						style={{ display: 'flex', justifyContent: 'space-around' }}
					>
						<Dropdown
							menu={{
								items: priorityMenuItems,
								onClick: (e: any) =>
									setTaskData((prev: any) => ({
										...prev,
										data: { ...prev.data, priority: e.key },
									})),
							}}
						>
							<Button
								style={{
									padding: '5px 5px',
									marginLeft: 'auto',
									width: '150px',
								}}
							>
								{priorityMenuItems?.find(
									(item: any) => item?.key === taskData.data.priority
								)?.label ?? (
									<>
										Select Priority <DownOutlined />{' '}
									</>
								)}
							</Button>
						</Dropdown>
						{taskData.error.priority ? (
							<ErrorMessageWrapper>
								{taskData.error.priority}
							</ErrorMessageWrapper>
						) : null}
					</Col>
				</Row>
				{state?.isEdit ? (
					<Row>
						<input
							type="checkbox"
							defaultChecked={taskData?.data?.isComplete}
							onChange={(e) =>
								validator('isComplete', e.target.checked, setTaskData)
							}
						/>{' '}
						Completed
					</Row>
				) : null}
			</div>
		</Modal>
	);
};

export default CreateTasks;
