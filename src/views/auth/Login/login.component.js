import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContainer, Button, Form, Input } from '../auth.styles';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Authentication logic here (e.g., make an API call to validate the user)
        // On success:
        navigate('/home'); // or wherever your main app view is located
    };

    return (
        <AuthContainer>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Log In</Button>
            </Form>
        </AuthContainer>
    );
};

export default Login;