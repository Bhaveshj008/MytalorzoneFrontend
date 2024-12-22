// src/hooks/useAuth.js
import { useState } from 'react';
import api from '../api';

export const useAuth = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const login = async (credentials) => {
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const response = await api.post("/auth/login", credentials);
            setLoading(false);
            setSuccess("Login successful! Redirecting...");

       
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(response.data)); 
            return true;
        } catch (err) {
            setError(err.response?.data?.error || "Invalid email or password");
            setLoading(false);
            return false;
        }
    };

    const signup = async (userData) => {
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const response = await api.post("/auth/signup", userData);
            setLoading(false);
            setSuccess("Account created successfully! Please log in.");
            return true;
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred during signup");
            setLoading(false);
            return false;
        }
    };

    return { login, signup, error, success, loading };
};
