// File: src/App.js

import React from 'react';
import './App.css';
import Landingpage from './components/LandingPage/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Collections from './components/Collections/Collections';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/orderCart/Cart';
import InventoryTable from './components/AdminPanel/Tables/InventoryTable';
import OrdersTable from './components/AdminPanel/Tables/OrdersTable';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import ProductsManager from './components/AdminPanel/Products/ProductsManager';
import Overview from './components/AdminPanel/Dashboard/Overview';
import AnalyticsCard from './components/AdminPanel/Dashboard/AnalyticsCard';
import Sidebar from './components/AdminPanel/Layout/Sidebar';
import Login from './components/AdminPanel/auth/Login';
import Signup from './components/AdminPanel/auth/Signup';
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <Sidebar/>
        <Outlet />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Landingpage />,
        },
        {
          path: "/collections",
          element: <Collections />,
        },
        {
          path: "/product/:productId",
          element: <ProductDetail />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <AdminDashboard />,
        },
        {
          path: "/admin/inventory",
          element: <InventoryTable />,
        },
        {
          path: "/admin/orders",
          element: <OrdersTable />,
        },
        {
          path: "/admin/products",
          element: <ProductsManager/>,
        },
        {
          path: "/admin/analytics",
          element: <AnalyticsCard/>,
        },
        {
          path: "/admin/overview",
          element: <Overview/>,
        },
      ],
    },
    {
      path: "/admin/login",
      element: <Login />, 
    },
    {
      path: "/admin/signup",
      element: <Signup />, 
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
