import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-3000"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          animation: 'subtle-zoom 20s infinite alternate'
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-center h-full max-w-2xl space-y-8 py-20">
          {/* Animated Subtitle */}
          <p className="text-red-400 font-medium tracking-wider uppercase animate-fade-in-up">
            New Collection 2024
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white space-y-4">
            <span className="block transform transition-all duration-700 animate-fade-in-up delay-100">
              Elevate Your Style
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl text-gray-200 mt-2 transform transition-all duration-700 animate-fade-in-up delay-200">
              With Timeless Elegance
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-xl animate-fade-in-up delay-300">
            Discover our curated collection of sophisticated designs that blend contemporary trends with classic sophistication.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 animate-fade-in-up delay-400">
            <Link to="/collections">
              <button className="group relative px-8 py-4 bg-red-500 text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-red-600 hover:shadow-xl transform hover:-translate-y-1">
                <span className="relative z-10">Shop Collection</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </Link>

            <button className="px-8 py-4 border-2 border-white text-white rounded-full transition-all duration-300 hover:bg-white hover:text-black transform hover:-translate-y-1">
              View Lookbook
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-8 mt-12 text-white/80 text-xl font-bold animate-fade-in-up delay-500">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20">✨</span>
              Premium Quality
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20">🌍</span>
              Worldwide Shipping
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20">⚡️</span>
              Express Delivery
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  );
};

export default Hero;

