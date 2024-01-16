import { Row, Col, Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { postAxios } from '../../services/HttpService';
import { useNavigate } from 'react-router';
declare const window: any;
const LoginForm = () => {
	const navigate = useNavigate();
	const onFinish = async (values: any, navigate: any) => {
		postAxios('/user/login', { ...values })
			.then((res: any) => {
				if (!res.isError) {
					window.localStorage.setItem('token', res?.data?.token);
					window.localStorage.setItem('userName', res?.data?.userName);
				}
			})
			.finally(() => {
				navigate('/task-list');
			});
	};

	return (
		<Card title="Sign In">
			<Form
				name="loginForm"
				initialValues={{
					remember: true,
				}}
				onFinish={(values) => onFinish(values, navigate)}
				layout="vertical"
				requiredMark={false}
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							type: 'email',
							message: 'Please enter valid email!',
						},
					]}
				>
					<Input prefix={<UserOutlined />} placeholder="Email" />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please enter your password!',
						},
					]}
				>
					<Input.Password prefix={<LockOutlined />} placeholder="Password" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block>
						Sign In
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

const LoginScreen = () => {
	return (
		<Row
			justify="center"
			align="middle"
			style={{
				minHeight: '100vh',
				width: '100vw',
				background: '#002538',
			}}
		>
			<Col xs={24} sm={24} md={9} lg={6}></Col>
			<Col xs={24} sm={24} md={9} lg={6}>
				<div>
					<LoginForm />
				</div>
			</Col>
		</Row>
	);
};

export default LoginScreen;
