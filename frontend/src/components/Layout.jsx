import { NavLink, Outlet } from 'react-router-dom';
import { ConnectButton } from './ConnectButton';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-f1-black via-f1-dark to-track text-white">
      {/* Header */}
      <header className="border-b border-f1-gray bg-f1-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="relative">
                <span className="text-4xl">🏎️</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-f1-red rounded-full animate-pulse-fast"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-f1-red to-mclaren-orange bg-clip-text text-transparent">
                  Janus Pit Wall
                </h1>
                <p className="text-xs text-gray-400 font-racing">
                  MEV Defense • F1 Powered
                </p>
              </div>
            </NavLink>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `font-f1 font-semibold transition-all duration-200 hover:text-f1-red ${
                    isActive ? 'text-f1-red border-b-2 border-f1-red pb-1' : 'text-gray-300'
                  }`
                }
              >
                🏁 Dashboard
              </NavLink>
              <NavLink 
                to="/swap" 
                className={({ isActive }) => 
                  `font-f1 font-semibold transition-all duration-200 hover:text-mclaren-orange ${
                    isActive ? 'text-mclaren-orange border-b-2 border-mclaren-orange pb-1' : 'text-gray-300'
                  }`
                }
              >
                💱 Swap
              </NavLink>
              <NavLink 
                to="/marketplace" 
                className={({ isActive }) => 
                  `font-f1 font-semibold transition-all duration-200 hover:text-ferrari-red ${
                    isActive ? 'text-ferrari-red border-b-2 border-ferrari-red pb-1' : 'text-gray-300'
                  }`
                }
              >
                🖼️ Market
              </NavLink>
              <NavLink 
                to="/security" 
                className={({ isActive }) => 
                  `font-f1 font-semibold transition-all duration-200 hover:text-neon ${
                    isActive ? 'text-neon border-b-2 border-neon pb-1' : 'text-gray-300'
                  }`
                }
              >
                🛡️ Security
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
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