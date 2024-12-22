import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { InputField } from './InputField';
import { useAuth } from '../../hooks/useAuth';

export const SignupForm = ({ onSuccess, onLoginClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { signup, error, success, loading } = useAuth();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreeToTerms) {
            setError("Please agree to the Terms of Service and Privacy Policy");
            return;
        }
        const signupSuccess = await signup(formData);
        if (signupSuccess) {
            onSuccess();
            onLoginClick();
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600 mb-8">Join us! Please enter your details</p>

            {/* Display success message */}
            {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    icon={User}
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleInputChange}
                />

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

                {/* Display error message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-gray-600">
                        I agree to the Terms of Service and Privacy Policy
                    </span>
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-red-500 text-white py-3 rounded-lg font-semibold
                        hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                        transition-all duration-300 transform hover:shadow-lg
                        flex items-center justify-center gap-2
                        ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Creating Account..." : "Create Account"}
                    <ArrowRight className="w-5 h-5" />
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={onLoginClick}
                        className="text-red-500 hover:text-red-600 font-semibold transition-colors"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
};
