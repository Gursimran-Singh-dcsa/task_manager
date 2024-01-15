import { postAxios, putAxios } from '../services/HttpService';

export const validator = (
	type: 'name' | 'description' | 'dueDate' | 'priority' | 'isComplete',
	value: any,
	setTaskData: Function
) => {
	let error = '';
	let valueToSet: any = value;
	if (type === 'name') {
		if (!value?.trim()) {
			error = 'Please Enter Task Name';
		} else {
			if (value.trim().length < 3) {
				error = 'Task Name must be 3 characters atleast';
			}
			if (value.trim().length > 30) {
				error = 'Too Long Task name';
			}
		}
		valueToSet = value?.trim();
	}
	if (type === 'description') {
		if (!value?.trim()) {
			error = 'Please Enter Description';
		} else {
			if (value.trim().length < 20) {
				error = 'description must be 20 characters atleast';
			}
			if (value.trim().length > 300) {
				error = 'Too Long Description';
			}
		}
		valueToSet = value?.trim();
	}
	if (type === 'dueDate') {
		if (!value) {
			error = 'Please Choose Due Date';
		}
	}
	if (type === 'priority') {
		if (!value) {
			error = 'Please Choose Priority';
		}
	}
	if (type === 'isComplete') {
		valueToSet = value;
	}
	if (error) {
		setTaskData((prev: any) => ({
			...prev,
			error: { ...prev.error, [type]: error },
		}));
	} else {
		setTaskData((prev: any) => ({
			...prev,
			data: { ...prev.data, [type]: valueToSet },
			error: { ...prev.error, [type]: '' },
		}));
	}
};

export const isValidData = (taskData: any) => {
	const data = taskData.data;
	const errors = taskData.error;
	let isValid: any = true;
	isValid =
		isValid && data.name && data.description && data.dueDate && data.priority;

	isValid =
		isValid &&
		!errors.name &&
		!errors.description &&
		!errors.dueDate &&
		!errors.priority;
	return isValid;
};

export const createTask = async (data: any, isEdit: boolean) => {
	if (isEdit) {
		const idToDelete = data._id;
		const dataToSend = {
			name: data.name,
			description: data.description,
			isComplete: data.isComplete,
			priority: data.priority,
			dueDate: data.dueDate,
		};
		return putAxios(`/task/updateTask/${idToDelete}`, { ...dataToSend });
	}
	return postAxios('/task/create', { ...data });
};
