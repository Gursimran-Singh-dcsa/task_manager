import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { LogoText, StyledHeader } from '../styles/styledHeader';
const { Content } = Layout;
export const Homepage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!window.localStorage.getItem('token')) navigate('/login');
		if (
			window.localStorage.getItem('token') &&
			window.location.pathname === '/'
		)
			navigate('task-list');
	}, []);
	return (
		<Layout>
			<Content style={{ height: '100vh', overflowY: 'auto' }}>
				<StyledHeader>
					<div>
						<div>
							<LogoText>Task Manager</LogoText>
						</div>
					</div>
				</StyledHeader>
				<Layout style={{ padding: '0 24px' }}>
					<Outlet />
				</Layout>
			</Content>
		</Layout>
	);
};
export default Homepage;
