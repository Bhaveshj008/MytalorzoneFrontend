import React from 'react';
import { ShoppingBag, DollarSign, Users, Package } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

const Overview = ({ analyticsData }) => {
  const cards = [
    {
      title: 'Total Orders',
      value: analyticsData.totalOrders,
      Icon: ShoppingBag,
      iconColor: 'text-blue-500'
    },
    {
      title: 'Revenue',
      value: `$${analyticsData.totalRevenue}`,
      Icon: DollarSign,
      iconColor: 'text-green-500'
    },
    {
      title: 'Active Users',
      value: analyticsData.activeUsers,
      Icon: Users,
      iconColor: 'text-purple-500'
    },
    {
      title: 'Low Stock Items',
      value: analyticsData.lowStockItems,
      Icon: Package,
      iconColor: 'text-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <AnalyticsCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Overview;