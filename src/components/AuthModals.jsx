import React, { useState } from 'react';
import { Mail, Lock, X, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import api from '../api';

const AuthModals = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const openLogin = () => {
        setIsLoginOpen(true);
        setIsSignupOpen(false);
    };

    const openSignup = () => {
        setIsSignupOpen(true);
        setIsLoginOpen(false);
    };

    const closeModals = () => {
        setIsLoginOpen(false);
        setIsSignupOpen(false);
    };

    // Common input field component
    const InputField = ({ icon: Icon, type, placeholder, value, onChange, name, required = true }) => (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon size={20} />
            </div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            />
        </div>
    );

    // Login Modal Component
    const LoginModal = () => {
        const [showPassword, setShowPassword] = useState(false);
        const [formData, setFormData] = useState({
            email: "",
            password: "",
            rememberMe: false
        });
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);

        const handleInputChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        };

        const handleLogin = async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);

            try {
                const response = await api.post("/auth/login", {
                    email: formData.email,
                    password: formData.password
                });
                
                console.log("Login successful", response.data);
                 setSuccess("Login successful! Starting your session...");
                startSession(response.data.user, response.data.token);
                
                // Close modal after 2 seconds
                setTimeout(() => {
                    closeModals();
                    // Refresh page or redirect to dashboard
                    window.location.href = '/dashboard';
                }, 2000);
                closeModals();
                // Handle successful login (e.g., store token, redirect, etc.)
                
            } catch (err) {
                console.error("Login failed", err.response?.data || err.message);
                setError(err.response?.data?.error || "Invalid email or password");
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${isLoginOpen ? '' : 'pointer-events-none'}`}>
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 ${
                        isLoginOpen ? "opacity-100" : "opacity-0"
                    } transition-opacity`}
                    onClick={closeModals}
                />

                <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md relative transition-all duration-500 ease-out
                    ${isLoginOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
                    
                    <button
                        onClick={closeModals}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                        <p className="text-gray-600 mb-8">Enter your credentials to access your account</p>

                        <form onSubmit={handleLogin} className="space-y-6">
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
                                    onClick={openSignup}
                                    className="text-red-500 hover:text-red-600 font-semibold transition-colors"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Signup Modal Component
    const SignupModal = () => {
        const [showPassword, setShowPassword] = useState(false);
        const [formData, setFormData] = useState({
            fullName: "",
            email: "",
            password: "",
            agreeToTerms: false
        });
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);

        const handleInputChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        };

        const handleSignup = async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);

            if (!formData.agreeToTerms) {
                setError("Please agree to the Terms of Service and Privacy Policy");
                setLoading(false);
                return;
            }

            try {
                const response = await api.post("/auth/signup", {
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password
                });
                
                console.log("Signup successful", response.data);
                closeModals();
                                
            } catch (err) {
                console.error("Signup failed", err.response?.data || err.error);
                setError(err.response?.data?.error || "An error occurred during signup");
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${isSignupOpen ? '' : 'pointer-events-none'}`}>
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 ${
                        isSignupOpen ? "opacity-100" : "opacity-0"
                    } transition-opacity`}
                    onClick={closeModals}
                />
                
                <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md relative transition-all duration-500 ease-out
                    ${isSignupOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
                    
                    <button
                        onClick={closeModals}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600 mb-8">Join us! Please enter your details</p>

                        <form onSubmit={handleSignup} className="space-y-6">
                            <InputField
                                icon={User}
                                type="text"
                                name="fullName"
                                placeholder="Full name"
                                value={formData.fullName}
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

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <label className="flex items-center gap-2 cursor-pointer text-sm">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                                />
                                <span className="text-gray-600">I agree to the Terms of Service and Privacy Policy</span>
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
                                    onClick={openLogin}
                                    className="text-red-500 hover:text-red-600 font-semibold transition-colors"
                                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <button
                onClick={openLogin}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg
                hover:shadow-lg transition-all duration-300"
            >
                <User className="w-4 h-4" />
                <span>Sign In</span>
            </button>

            {/* Render both modals */}
            <LoginModal />
            <SignupModal />
        </>
    );
};

export default AuthModals;