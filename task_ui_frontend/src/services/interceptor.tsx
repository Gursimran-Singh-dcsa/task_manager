import axios from 'axios';
declare const window: any;

export const interceptor = () => {
	axios.interceptors.response.use(undefined, (error: any) => {
		if (error?.response?.status === 403) {
			window.intercepted = true;
			window.location.href =
				window.location.protocol + '//' + window.location.host + '/login';
		}
		return Promise.reject({ ...error, intercepted: true });
	});
};
