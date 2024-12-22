import React, { useState } from 'react';
import { User } from 'lucide-react';
import { ModalWrapper } from './ModalWrapper';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

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

            <ModalWrapper isOpen={isLoginOpen} onClose={closeModals}>
                <LoginForm onSuccess={closeModals} onSignupClick={openSignup} />
            </ModalWrapper>

            <ModalWrapper isOpen={isSignupOpen} onClose={closeModals}>
                <SignupForm onSuccess={closeModals} onLoginClick={openLogin} />
            </ModalWrapper>
        </>
    );
};

export default AuthModals;