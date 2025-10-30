import { NFTMarketplace } from '../components/NFTMarketplace';
import { motion } from 'framer-motion';
import { Trophy, Zap, TrendingUp, Users, Star, ShoppingCart } from 'lucide-react';
import GradientText from '../components/GradientText';

export function MarketplacePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* F1 Racing Background Elements */}
      <div className="fixed inset-0 opacity-15 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-red-500/60 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 120 - 60],
              y: [0, Math.random() * 120 - 60],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 6,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-8">
        {/* Hero Header with Glass Morphism */}
        <motion.div 
          className="relative backdrop-blur-xl bg-gradient-to-br from-black/20 via-black/10 to-black/5 border border-white/10 rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Racing stripe accents */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
          
          {/* Corner racing elements */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-400/30 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-orange-400/30 rounded-bl-lg"></div>
          
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.span 
                className="text-6xl"
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🏁
              </motion.span>
              <div>
                <GradientText
                  colors={['#DC0000', '#FF8700', '#DC0000', '#FFD700']}
                  animationSpeed={5}
                  className="text-5xl md:text-6xl font-black font-racing"
                >
                  F1 MARKETPLACE
                </GradientText>
                <p className="text-xl text-white font-f1 mt-2 drop-shadow-lg">
                  Dynamic Racing Collectibles Hub
                </p>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-200 leading-relaxed backdrop-blur-sm bg-black/20 rounded-lg p-4 border border-white/10">
                Trade exclusive <span className="text-red-400 font-bold">F1 dNFTs</span> that evolve with live race data. 
                Each collectible updates automatically when drivers achieve <span className="text-yellow-400 font-bold">podium finishes</span>, 
                making them truly dynamic racing assets.
              </p>
            </div>
          </div>
        </motion.div>

        {/* F1 Market Stats with Glass Morphism */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { 
              icon: <Trophy className="w-8 h-8 text-red-400" />, 
              value: "147", 
              label: "Racing NFTs", 
              color: "from-red-500/20 to-red-600/10",
              textColor: "text-red-400",
              borderColor: "border-red-400/30"
            },
            { 
              icon: <ShoppingCart className="w-8 h-8 text-orange-400" />, 
              value: "89", 
              label: "Active Listings", 
              color: "from-orange-500/20 to-orange-600/10",
              textColor: "text-orange-400",
              borderColor: "border-orange-400/30"
            },
            { 
              icon: <TrendingUp className="w-8 h-8 text-cyan-400" />, 
              value: "2.4K", 
              label: "Volume (MCLAREN)", 
              color: "from-cyan-500/20 to-cyan-600/10",
              textColor: "text-cyan-400",
              borderColor: "border-cyan-400/30"
            },
            { 
              icon: <Users className="w-8 h-8 text-green-400" />, 
              value: "342", 
              label: "F1 Collectors", 
              color: "from-green-500/20 to-green-600/10",
              textColor: "text-green-400",
              borderColor: "border-green-400/30"
            }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              className={`relative backdrop-blur-lg bg-gradient-to-br ${stat.color} border ${stat.borderColor} rounded-xl p-6 shadow-xl text-center group hover:scale-105 transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Stat glow effect */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${stat.color}`}></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <GradientText
                  colors={[stat.textColor.replace('text-', '#'), '#FFFFFF', stat.textColor.replace('text-', '#')]}
                  className="text-3xl font-black font-racing mb-1"
                >
                  {stat.value}
                </GradientText>
                <div className="text-sm text-gray-300 font-f1">{stat.label}</div>
              </div>
              
              {/* Corner accent */}
              <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${stat.borderColor} rounded-tr-lg opacity-50`}></div>
            </motion.div>
          ))}
        </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button className="px-6 py-2 bg-gradient-to-r from-ferrari-red to-f1-red text-white rounded-lg hover:opacity-80 transition-opacity font-f1 font-semibold">
          🏎️ All Items
        </button>
        <button className="px-6 py-2 bg-track text-gray-300 rounded-lg hover:bg-pit transition-colors font-f1">
          🪖 Helmets
        </button>
        <button className="px-6 py-2 bg-track text-gray-300 rounded-lg hover:bg-pit transition-colors font-f1">
          🧤 Gloves
        </button>
        <button className="px-6 py-2 bg-track text-gray-300 rounded-lg hover:bg-pit transition-colors font-f1">
          🏁 Liveries
        </button>
        <button className="px-6 py-2 bg-track text-gray-300 rounded-lg hover:bg-pit transition-colors font-f1">
          🏆 Trophies
        </button>
        <button className="px-6 py-2 bg-track text-gray-300 rounded-lg hover:bg-pit transition-colors font-f1">
          ⚡ Special
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-gradient-to-r from-track to-pit rounded-xl p-4 border border-f1-gray">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select className="bg-f1-black border border-f1-gray rounded px-3 py-1 text-sm text-white">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Recently Listed</option>
              <option>Rarity</option>
              <option>Most Popular</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Team:</span>
            <select className="bg-f1-black border border-f1-gray rounded px-3 py-1 text-sm text-white">
              <option>All Teams</option>
              <option>🧡 McLaren</option>
              <option>❤️ Ferrari</option>
              <option>🩵 Mercedes</option>
              <option>💙 Red Bull</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Price Range:</span>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            className="w-24"
          />
          <span className="text-sm text-white font-racing">0-1000 MCLAREN</span>
        </div>
      </div>

      {/* Featured NFT */}
      <div className="bg-gradient-to-r from-ferrari-red/20 via-mclaren-orange/20 to-f1-red/20 rounded-xl p-6 border border-ferrari-red/30">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl">⭐</span>
          <div>
            <h3 className="text-xl font-bold text-ferrari-red">Featured Collection</h3>
            <p className="text-gray-300">Championship Winner Series - Limited Edition</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-f1-black/60 rounded-lg p-4 border border-f1-gray backdrop-blur-sm">
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-sm text-ferrari-red border border-ferrari-red rounded px-2 py-1 inline-block">
                LEGENDARY
              </div>
            </div>
            <div className="text-sm">
              <div className="font-bold">Max Verstappen Trophy</div>
              <div className="text-gray-400">3x World Champion</div>
              <div className="text-ferrari-red font-racing mt-2">500 MCLAREN</div>
            </div>
          </div>
          
          <div className="bg-f1-black/60 rounded-lg p-4 border border-f1-gray backdrop-blur-sm">
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">🪖</div>
              <div className="text-sm text-mclaren-orange border border-mclaren-orange rounded px-2 py-1 inline-block">
                EPIC
              </div>
            </div>
            <div className="text-sm">
              <div className="font-bold">Lando Norris Helmet</div>
              <div className="text-gray-400">Silverstone Victory</div>
              <div className="text-mclaren-orange font-racing mt-2">150 MCLAREN</div>
            </div>
          </div>
          
          <div className="bg-f1-black/60 rounded-lg p-4 border border-f1-gray backdrop-blur-sm">
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">🏁</div>
              <div className="text-sm text-neon border border-neon rounded px-2 py-1 inline-block">
                RARE
              </div>
            </div>
            <div className="text-sm">
              <div className="font-bold">McLaren Livery 2024</div>
              <div className="text-gray-400">Championship Edition</div>
              <div className="text-neon font-racing mt-2">75 MCLAREN</div>
            </div>
          </div>
        </div>
      </div>

        {/* Main F1 Marketplace with Glass Design */}
        <motion.div 
          className="relative backdrop-blur-xl bg-gradient-to-br from-black/20 via-black/10 to-black/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Racing accent */}
          <div className="absolute top-0 left-8 w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
          
          <NFTMarketplace />
        </motion.div>

        {/* Live F1 Updates */}
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl animate-pulse-fast">🔴</span>
            Live Race Updates
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-f1-black/40 rounded-lg border border-f1-gray/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-mclaren-orange rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <div>
                  <div className="font-semibold">Lando Norris - P3</div>
                  <div className="text-sm text-gray-400">São Paulo GP • Sector 2</div>
                </div>
              </div>
              <div className="text-sm text-mclaren-orange">
                dNFT updating...
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-f1-black/40 rounded-lg border border-f1-gray/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-mclaren-orange rounded-full flex items-center justify-center text-xs font-bold">
                  81
                </div>
                <div>
                  <div className="font-semibold">Oscar Piastri - P7</div>
                  <div className="text-sm text-gray-400">São Paulo GP • Lap 34/71</div>
                </div>
              </div>
              <div className="text-sm text-flag-green">
                Metadata updated
              </div>
            </div>
            
            <div className="text-center pt-3">
              <p className="text-xs text-gray-500">
                dNFT metadata updates automatically based on live race results
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}