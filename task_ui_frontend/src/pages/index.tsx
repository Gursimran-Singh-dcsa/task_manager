import { Layout } from 'antd';
import { Outlet } from 'react-router';
import { LogoText, StyledHeader } from '../styles/styledHeader';
const { Content } = Layout;
export const Homepage = () => {
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
