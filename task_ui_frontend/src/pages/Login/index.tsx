import { Row, Col, Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
	const onFinish = (values: any) => {
		console.log('Received values:', values);
		// Handle login logic here
	};

	return (
		<Card title="Sign In">
			<Form
				name="loginForm"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				layout="vertical"
				requiredMark={false}
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: 'Please enter your email!',
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
