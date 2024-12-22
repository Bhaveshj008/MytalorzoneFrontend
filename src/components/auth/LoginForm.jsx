// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { InputField } from './InputField';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm = ({ onSuccess, onSignupClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
    const { login, error, loading } = useAuth();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData);
        if (success) {
            onSuccess();
            window.location.reload();
        }
    };

    // Check if user is already logged in from localStorage
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            // Redirect or change UI if user is already logged in
            onSuccess(); // or redirect to another page
        }
    }, [onSuccess]);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600 mb-8">Enter your credentials to access your account</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    icon={Mail}
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                />

                <div className="relative">
                    <InputField
                        icon={Lock}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                        />
                        <span className="text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-red-500 hover:text-red-600 transition-colors">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-red-500 text-white py-3 rounded-lg font-semibold
                        hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                        transition-all duration-300 transform hover:shadow-lg
                        ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={onSignupClick}
                        className="text-red-500 hover:text-red-600 font-semibold transition-colors"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};
