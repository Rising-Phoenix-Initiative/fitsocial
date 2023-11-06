import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Hero from './components/hero.component';
import Features from './components/features.component';
import Testimonials from './components/testimonials.component';
import FAQ from './components/faq.component';
import Footer from './components/footer.component';
import Header from './components/header/header.component';
import Login from './components/auth/login.component';
import Signup from './components/auth/signup.component';
import { SafeArea } from '../dashboard/dashboard.styles';

const Landing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        // Check the URL path when the component mounts or when the path changes
        if (location.pathname === '/login' || location.pathname === '/signup') {
            setOpenModal(true);
        } else {
            setOpenModal(false);
        }
    }, [location]);

    const handleClose = () => {
        setOpenModal(false);
        navigate('/');
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Header />
            <Hero />
            <SafeArea sx={{ display: 'flex', flexDirection: 'column', p: '20px 20%' }}>
                <Features />
                <Testimonials />
                <FAQ />
                <Footer />
            </SafeArea>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="login-modal-title"
                aria-describedby="login-modal-description"
            >
                <Box sx={modalStyle}>
                    {location.pathname === '/login' ? <Login /> : <Signup />}
                </Box>
            </Modal>
        </>
    );
};

export default Landing;
