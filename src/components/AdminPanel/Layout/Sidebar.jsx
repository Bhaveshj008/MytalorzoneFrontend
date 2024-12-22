import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = ['overview', 'orders', 'inventory', 'products'];

  return (
    <div className="fixed w-64 h-full bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Mytalorzone Admin</h1>
      </div>
      <nav className="mt-4">
        <div className="px-4 space-y-2">
          {navItems.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;