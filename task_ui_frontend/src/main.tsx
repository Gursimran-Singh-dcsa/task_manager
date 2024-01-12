import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages';
import CreateTasks from './pages/createTasks';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
		children: [
			{
				path: 'create-tasks',
				element: <CreateTasks />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
