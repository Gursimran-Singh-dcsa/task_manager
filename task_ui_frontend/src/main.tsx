import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages';
import CreateTasks from './pages/createTasks';
import LoginScreen from './pages/Login';
import TaskList from './pages/TaskList';
import { interceptor } from './services/interceptor';
declare const window: any;

const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
		children: [
			{
				path: 'task-list',
				element: <TaskList />,
				children: [
					{
						path: 'create-tasks',
						element:  <CreateTasks />,
					},
				],
			},
		],
	},
	{
		path: '/login',
		element: <LoginScreen />,
	},
]);
window.intercepted ? null : interceptor();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
