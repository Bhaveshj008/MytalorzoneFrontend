import React from 'react';

const AnalyticsCard = ({ title, value, Icon, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default AnalyticsCard;