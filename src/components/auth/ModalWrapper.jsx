import React from 'react';
import { X } from 'lucide-react';

export const ModalWrapper = ({ isOpen, onClose, children }) => (
    <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${isOpen ? '' : 'pointer-events-none'}`}>
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 ${
                isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity`}
            onClick={onClose}
        />
        <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md relative transition-all duration-500 ease-out
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
            <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X size={20} />
            </button>
            {children}
        </div>
    </div>
);