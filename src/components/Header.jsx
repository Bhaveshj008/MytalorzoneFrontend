import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, Home, Grid, Search, Settings, LogOut, Heart, Package, Bell } from 'lucide-react';
import AuthModals from './auth/AuthModals';
import { Link } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [user, setUser] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home , link: '/'},
    { id: 'collections', label: 'Collections', icon: Grid, link:'/collections' },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, link:'/cart' }
  ];

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setIsLoggedIn(loggedIn);
    setUser(userData);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
    setShowProfileOptions(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowProfileOptions(false);
    setShowLogoutConfirmation(false);
    setUser(null);
  };

  const LogoutConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to log out of your account?</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowLogoutConfirmation(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-64 py-2 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
      {/* User Info Section */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
            {user?.userData?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.userData?.name || 'User Name'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.userData?.email || 'user@example.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <MenuLink icon={User} label="My Profile" />
        <MenuLink icon={Package} label="My Orders" />
        <MenuLink icon={Heart} label="Wishlist" />
        <MenuLink icon={Bell} label="Notifications" />
        <MenuLink icon={Settings} label="Account Settings" />
        
        <div className="border-t border-gray-100 mt-1">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  const MenuLink = ({ icon: Icon, label }) => (
    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <header className=" fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto relative">
        {/* Main Header */}
        <div className="flex items-center justify-between p-4 gap-4">
          {/* Logo and Search Section */}
          <div className="flex items-center gap-6 flex-1">
            {/* Logo */}
            <div className="flex-shrink-0 group cursor-pointer">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                ⚡️ Mytalorzone
                <span className="text-xs text-black font-normal ml-2">by Sophiya</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="sm:flex flex-1 max-w-md relative">
              <div className={`flex items-center w-full bg-gray-100 rounded-lg transition-all duration-300 ${
                isSearchFocused ? 'ring-2 ring-red-500' : ''
              }`}>
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={`${item.link}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative group flex items-center gap-2 px-2 py-1 text-gray-600 transition-all duration-300
                  hover:text-red-500 ${activeTab === item.id ? 'text-red-500' : ''}`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 transform origin-left transition-transform duration-300
                  ${activeTab === item.id ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}></span>
              </Link>
            ))}

            {/* Desktop Sign In / Profile Button */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileOptions(!showProfileOptions)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                    {user?.userData?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium">
                    {user?.userData?.name?.split(' ')[0] || 'Profile'}
                  </span>
                </button>
                {showProfileOptions && <ProfileDropdown />}
              </div>
            ) : (
              <AuthModals />
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100">
            <nav className="flex flex-col">
              {navItems.map(item => (
                <Link
                  key={item.id}
                  to={`${item.link}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-6 py-4 ${
                    activeTab === item.id ? 'text-red-500 bg-red-50' : 'text-gray-600'
                  } hover:text-red-500 hover:bg-red-50 transition-colors`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Profile Section */}
              {isLoggedIn ? (
                <div className="border-t border-gray-100">
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                        {user?.userData?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user?.userData?.name || 'User Name'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.userData?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                    <MenuLink icon={User} label="My Profile" />
                    <MenuLink icon={Package} label="My Orders" />
                    <MenuLink icon={Heart} label="Wishlist" />
                    <MenuLink icon={Bell} label="Notifications" />
                    <MenuLink icon={Settings} label="Account Settings" />
                    <button
                      onClick={handleLogoutClick}
                      className="w-full flex items-center gap-2 px-4 py-2 mt-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-t border-gray-100">
                  <AuthModals />
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirmation && <LogoutConfirmationModal />}
    </header>
  );
};

export default Header;