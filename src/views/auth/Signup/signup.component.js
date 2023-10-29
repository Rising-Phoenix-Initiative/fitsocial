import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContainer, Button, Form, Input } from '../auth.styles';

const Signup = () => {
    const [userInfo, setUserInfo] = useState({ email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Sign-up logic here (e.g., make an API call to create a new user)
        // You should also handle possible errors and provide feedback to the user.
        // On success:
        navigate('/home'); // or wherever your main app view is located
    };

    return (
        <AuthContainer>
            <h2>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userInfo.password}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={userInfo.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Sign Up</Button>
            </Form>
        </AuthContainer>
    );
};

export default Signup;