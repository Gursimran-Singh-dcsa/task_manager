export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const BACKEND_API_DATE_FORMAT = 'YYYY-MM-DD';
export const priorityMenuItems: any = [
	{
		label: <span style={{ color: 'Red' }}>High</span>,
		key: 'high',
		value: 'high',
	},
	{
		label: <span style={{ color: 'Orange' }}>Medium</span>,
		key: 'Medium',
		value: 'Medium',
	},
	{
		label: <span style={{ color: 'Green' }}>Low</span>,
		key: 'low',
		value: 'low',
	},
];
