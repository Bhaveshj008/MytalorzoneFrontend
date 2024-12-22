import React, { useState } from 'react';
import Sidebar from './Layout/Sidebar';
import Overview from './Dashboard/Overview';
import OrdersTable from './Tables/OrdersTable';
import InventoryTable from './Tables/InventoryTable';
import ProductsManager from './Products/ProductsManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - replace with your backend data
  const analyticsData = {
    totalOrders: 156,
    totalRevenue: 15600,
    activeUsers: 234,
    lowStockItems: 5
  };

  const recentOrders = [
    { id: 1, customer: 'John Doe', items: 3, total: 150, status: 'Pending' },
    { id: 2, customer: 'Jane Smith', items: 2, total: 120, status: 'Delivered' },
  ];

  const inventory = [
    { id: 1, name: 'Classic Suit', stock: 25, price: 299 },
    { id: 2, name: 'Wedding Dress', stock: 10, price: 599 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview analyticsData={analyticsData} />;
      case 'orders':
        return <OrdersTable orders={recentOrders} />;
      case 'inventory':
        return <InventoryTable inventory={inventory} />;
      case 'products':
        return <ProductsManager />;
      default:
        return <Overview analyticsData={analyticsData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="ml-64 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
