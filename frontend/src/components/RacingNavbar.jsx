import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Zap, 
  TrendingUp, 
  ShoppingBag, 
  Shield, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';

const RacingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: BarChart3 },
    { name: 'Swap', path: '/app/swap', icon: Zap },
    { name: 'Marketplace', path: '/app/marketplace', icon: ShoppingBag },
    { name: 'Security', path: '/app/security', icon: Shield },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isScrolled ? 0 : -100, 
          opacity: isScrolled ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Glass Racing Navbar */}
        <div className="mx-4 mt-4">
          <div className="bg-black/20 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="text-2xl font-black"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                      JANUS
                    </span>
                  </motion.div>
                  <div className="hidden md:block">
                    <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link key={item.name} to={item.path}>
                        <motion.div
                          whileHover={{ 
                            y: -2,
                            backgroundColor: "rgba(255, 135, 0, 0.1)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-orange-500/20 text-orange-400' 
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          
                          {/* Racing stripe for active item */}
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                              initial={false}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                {/* Connect Wallet Button */}
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255, 135, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:block bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Connect Wallet
                </motion.button>

                {/* Mobile Menu Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="md:hidden p-2 rounded-lg bg-gray-800/50 text-white"
                >
                  {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            {/* Racing border animation */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden"
          >
            <div className="bg-black/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
              <div className="space-y-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center space-x-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-orange-500/10 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
                
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-medium">
                  Connect Wallet
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RacingNavbar;