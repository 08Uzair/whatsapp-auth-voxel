import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { initOTPless } from '../utility/otpless';

const Auth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        initOTPless(callback)
    }, [])
    const callback = (otplessUser) => {
        alert(JSON.stringify(otplessUser));
    };
    useEffect(() => {
        const authenticateUser = async (token) => {
            try {
                const response = await axios.post('http://localhost:5000/authenticate', {
                    token,
                });

                const { success, data } = response.data;
                if (success) {
                    localStorage.setItem('user', token);
                    localStorage.setItem('name', data.name);
                    console.log('User data:', data);
                } else {
                    console.error('Authentication failed:', data.error);
                }
                window.location.reload();
            } catch (error) {
                console.error('Error during authentication:', error);
            }
        };
        window.otpless = (otplessUser) => {
            if (otplessUser.token) {
                authenticateUser(otplessUser.token);
            }
            console.log('OTPless user:', otplessUser);
        };

        // Clean up the effect
        return () => {
            delete window.otpless;
        };


    }, [navigate]);

    return (
        <>
            <div className="container mt-[5%]" >
                <div id="otpless-login-page"></div>
            </div>
        </>
    );
};

export default Auth;
