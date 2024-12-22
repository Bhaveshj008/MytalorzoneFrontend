import React from 'react';

export const InputField = ({ icon: Icon, type, placeholder, value, onChange, name, required = true }) => (
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
