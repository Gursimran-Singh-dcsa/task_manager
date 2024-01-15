import { message } from 'antd';
import { deleteAxios, getAxios } from '../services/HttpService';

export const getGreeting = () => {
	const today = new Date();
	const curHr = today.getHours();

	if (curHr < 12) {
		return 'Good Morning';
	} else if (curHr < 18) {
		return 'Good Afternoon';
	} else {
		return 'Good Evening';
	}
};
export const taskFetcher = async (queryParams: string) => {
	try {
		return await getAxios(`/task/getTask${queryParams}`);
	} catch (err) {
		message.error('Failed getting Task List please retry');
	}
};

export const handleDelete = async (ids: string[]) => {
	try {
		return deleteAxios('/task/deleteTasks', {ids});
	} catch (err) {
		message.error('Failed Deleting Tasks, please retry');
	}
};
