import axios from 'axios';
import { message } from 'antd';
import { API_BASE_URL } from '../constant';

type HttpMethod = 'get' | 'post' | 'delete' | 'put';

interface RequestOptions {
	method: HttpMethod;
	headers?: Record<string, string>;
	body?: string;
}

const BASE_URL = API_BASE_URL; // Replace with your API base URL

interface ApiResponse<T> {
	data?: T;
	error?: string;
	status?: number;
	isError?: Boolean;
	errorMessage?: string;
}

export function getAxios<T>(
	url: string,
	headers?: Record<string, string>
): Promise<ApiResponse<T>> {
	return axiosRequest<T>(url, { method: 'get', headers });
}

export function postAxios<T>(
	url: string,
	body: any,
	headers?: Record<string, string>
): Promise<ApiResponse<T>> {
	return axiosRequest<T>(url, { method: 'post', body, headers });
}

export function deleteAxios<T>(
	url: string,
	body: any,
	headers?: Record<string, string>
): Promise<ApiResponse<T>> {
	return axiosRequest<T>(url, { method: 'delete', body, headers });
}

export function putAxios<T>(
	url: string,
	body: any,
	headers?: Record<string, string>
): Promise<ApiResponse<T>> {
	return axiosRequest<T>(url, { method: 'put', body, headers });
}
async function axiosRequest<T>(
	url: string,
	options: RequestOptions
): Promise<ApiResponse<T>> {
	const token = `Bearer ${localStorage.getItem('token')}`;
	try {
		const res = await axios({
			url: `${BASE_URL}${url}`,
			method: options.method,
			data: options.body,
			headers: {
				Authorization: token,
				...(options.headers || {}),
			},
		});
		return res.data?.data;
	} catch (error: any) {
		error.response.data.message && message.error(error.response.data.message);
		return error.response.data;
	}
}
