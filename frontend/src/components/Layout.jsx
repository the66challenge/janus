import { NavLink, Outlet } from 'react-router-dom';
import { ConnectButton } from './ConnectButton';
import { useMemo } from 'react';

export function Layout() {
  // Memoize background animations for better performance
  const backgroundElements = useMemo(() => 
    [...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-20 bg-gradient-to-b from-orange-500/40 to-transparent animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      />
    )), []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* F1 Background Effects */}
      <div className="fixed inset-0 opacity-30">
        {backgroundElements}
      </div>

      {/* Header with Glass Morphism */}
      <header className="backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            
            {/* Logo with F1 Style */}
            <NavLink to="/" className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group">
              <div className="relative">
                <span className="text-4xl group-hover:animate-bounce">🏎️</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black font-racing bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                  JANUS
                </h1>
                <p className="text-xs text-gray-300 font-f1 tracking-wider">
                  F1 × DeFi Racing Platform
                </p>
              </div>
            </NavLink>

            {/* F1 Racing Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink 
                to="/app" 
                className={({ isActive }) => 
                  `relative px-4 py-2 font-f1 font-bold transition-all duration-300 rounded-lg backdrop-blur-md border border-white/20 hover:border-orange-400/60 hover:scale-105 ${
                    isActive ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-400/60 shadow-lg shadow-orange-500/25' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                🏁 Dashboard
              </NavLink>
              <NavLink 
                to="/app/swap" 
                className={({ isActive }) => 
                  `relative px-4 py-2 font-f1 font-bold transition-all duration-300 rounded-lg backdrop-blur-md border border-white/20 hover:border-orange-400/60 hover:scale-105 ${
                    isActive ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-400/60 shadow-lg shadow-orange-500/25' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                💱 Swap
              </NavLink>
              <NavLink 
                to="/app/marketplace" 
                className={({ isActive }) => 
                  `relative px-4 py-2 font-f1 font-bold transition-all duration-300 rounded-lg backdrop-blur-md border border-white/20 hover:border-red-500/60 hover:scale-105 ${
                    isActive ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border-red-400/60 shadow-lg shadow-red-500/25' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                🏁 Marketplace
              </NavLink>
              <NavLink 
                to="/app/security" 
                className={({ isActive }) => 
                  `relative px-4 py-2 font-f1 font-bold transition-all duration-300 rounded-lg backdrop-blur-md border border-white/20 hover:border-cyan-400/60 hover:scale-105 ${
                    isActive ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-400/60 shadow-lg shadow-cyan-500/25' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                🛡️ MEV Shield
              </NavLink>
            </nav>

            {/* Connect Button */}
            <ConnectButton />
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center justify-center gap-6 mt-4 pt-4 border-t border-f1-gray">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-f1 transition-colors ${isActive ? 'text-f1-red' : 'text-gray-400'}`
              }
            >
              🏁 Home
            </NavLink>
            <NavLink 
              to="/swap" 
              className={({ isActive }) => 
                `text-sm font-f1 transition-colors ${isActive ? 'text-mclaren-orange' : 'text-gray-400'}`
              }
            >
              💱 Swap
            </NavLink>
            <NavLink 
              to="/marketplace" 
              className={({ isActive }) => 
                `text-sm font-f1 transition-colors ${isActive ? 'text-ferrari-red' : 'text-gray-400'}`
              }
            >
              🖼️ NFTs
            </NavLink>
            <NavLink 
              to="/security" 
              className={({ isActive }) => 
                `text-sm font-f1 transition-colors ${isActive ? 'text-neon' : 'text-gray-400'}`
              }
            >
              🛡️ MEV
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content with F1 Styling */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Racing stripes decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20"></div>
        
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-f1-gray bg-f1-black/50 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Project Info */}
            <div>
              <h3 className="font-bold text-lg mb-3 text-f1-red">Project Janus</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A secure F1 dNFT marketplace with MEV protection, built for the Neon EVM hackathon. 
                Experience the future of motorsport collectibles.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-bold text-lg mb-3 text-mclaren-orange">Features</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Atomic Bundle Protection</li>
                <li>• Real-time F1 Data</li>
                <li>• Dynamic NFT Metadata</li>
                <li>• MEV Attack Prevention</li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="font-bold text-lg mb-3 text-neon">Powered By</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-pit rounded text-xs">Neon EVM</span>
                <span className="px-2 py-1 bg-pit rounded text-xs">Flashbots</span>
                <span className="px-2 py-1 bg-pit rounded text-xs">SecureDApp</span>
                <span className="px-2 py-1 bg-pit rounded text-xs">React</span>
              </div>
            </div>
          </div>

          <div className="border-t border-f1-gray mt-8 pt-6 text-center">
            <p className="text-gray-500 text-sm font-racing">
              Built for Neon EVM Hackathon 2025 • SecureDApp Audited • Formula 1® Theme
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}