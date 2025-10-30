import { NFTMarketplace } from '../components/NFTMarketplace';

export function MarketplacePage() {
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-6xl">🖼️</span>
          <div>
            <h1 className="text-4xl font-bold font-f1 bg-gradient-to-r from-ferrari-red to-f1-red bg-clip-text text-transparent">
              Janus Market
            </h1>
            <p className="text-xl text-gray-300 mt-2 font-racing">
              Dynamic F1 Collectibles with Live Race Data
            </p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-400 leading-relaxed">
            Trade exclusive F1 dNFTs that evolve based on real race results. Each collectible 
            updates automatically when drivers achieve milestones, making them truly dynamic assets.
          </p>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray text-center">
          <div className="text-3xl font-bold text-ferrari-red font-racing">147</div>
          <div className="text-sm text-gray-400 mt-1">Total NFTs</div>
        </div>
        
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray text-center">
          <div className="text-3xl font-bold text-mclaren-orange font-racing">89</div>
          <div className="text-sm text-gray-400 mt-1">Active Listings</div>
        </div>
        
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray text-center">
          <div className="text-3xl font-bold text-neon font-racing">2.4K</div>
          <div className="text-sm text-gray-400 mt-1">Volume (MCLAREN)</div>
        </div>
        
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray text-center">
          <div className="text-3xl font-bold text-flag-green font-racing">342</div>
          <div className="text-sm text-gray-400 mt-1">Collectors</div>
        </div>
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

      {/* Main NFT Marketplace */}
      <NFTMarketplace />

      {/* Live Updates */}
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
  );
}