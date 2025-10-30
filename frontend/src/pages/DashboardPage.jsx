import { SwapComponent } from '../components/SwapComponent';
import { NFTMarketplace } from '../components/NFTMarketplace';
import { LiveF1Feed } from '../components/LiveF1Feed';
import { MEVDetection } from '../components/MEVDetection';
import { ProjectGuide } from '../components/ProjectGuide';

export function DashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-f1-red/20 via-mclaren-orange/20 to-ferrari-red/20 border border-f1-gray p-8">
        <div className="absolute inset-0 bg-black/10 opacity-20"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">🏁</span>
            <div>
              <h1 className="text-4xl font-bold font-f1 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Welcome to Janus Pit Wall
              </h1>
              <p className="text-xl text-gray-300 mt-2 font-racing">
                Secure F1 dNFT Trading with MEV Protection
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-f1-black/60 rounded-lg p-4 border border-f1-gray backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <div className="font-bold text-neon">MEV Protected</div>
                  <div className="text-sm text-gray-400">Atomic Bundle Technology</div>
                </div>
              </div>
            </div>
            
            <div className="bg-f1-black/60 rounded-lg p-4 border border-f1-gray backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="font-bold text-mclaren-orange">Real-time Updates</div>
                  <div className="text-sm text-gray-400">Live F1 Race Data</div>
                </div>
              </div>
            </div>
            
            <div className="bg-f1-black/60 rounded-lg p-4 border border-f1-gray backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="font-bold text-ferrari-red">Dynamic NFTs</div>
                  <div className="text-sm text-gray-400">Racing Collectibles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Live F1 Feed - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <LiveF1Feed />
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          
          {/* Protocol Stats */}
          <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Protocol Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Volume</span>
                <span className="font-bold text-neon">$2.4M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active dNFTs</span>
                <span className="font-bold text-mclaren-orange">147</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">MEV Blocks</span>
                <span className="font-bold text-flag-green">1,203</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Avg. Protection</span>
                <span className="font-bold text-ferrari-red">98.7%</span>
              </div>
            </div>
          </div>

          {/* Live MEV Status */}
          <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl animate-pulse-fast">🚨</span>
              MEV Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-flag-green/20 border border-flag-green/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-flag-green rounded-full animate-pulse-fast"></div>
                  <span className="text-sm font-racing">Network Status</span>
                </div>
                <span className="text-flag-green font-bold">SAFE</span>
              </div>
              
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Last Attack:</span>
                  <span>2h ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Blocks Protected:</span>
                  <span>47 / 47</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="text-flag-green">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-gradient-to-r from-mclaren-orange to-ferrari-red text-white rounded-lg hover:from-mclaren-orange/80 hover:to-ferrari-red/80 transition-all duration-200 font-f1 font-semibold">
                🛡️ Protected Swap
              </button>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-f1-red to-ferrari-red text-white rounded-lg hover:from-f1-red/80 hover:to-ferrari-red/80 transition-all duration-200 font-f1 font-semibold">
                🖼️ Browse NFTs
              </button>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-neon to-electric text-f1-black rounded-lg hover:from-neon/80 hover:to-electric/80 transition-all duration-200 font-f1 font-semibold">
                📈 View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          Recent Activity
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-f1-black/40 rounded-lg border border-f1-gray/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-mclaren-orange to-ferrari-red rounded-full flex items-center justify-center text-sm font-bold">
                🏎️
              </div>
              <div>
                <div className="font-semibold">Protected NFT Purchase</div>
                <div className="text-sm text-gray-400">Lando Norris Helmet • 0x1234...5678</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-flag-green">✓ Success</div>
              <div className="text-xs text-gray-400">2 min ago</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-f1-black/40 rounded-lg border border-f1-gray/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-neon to-electric rounded-full flex items-center justify-center text-sm font-bold text-f1-black">
                🛡️
              </div>
              <div>
                <div className="font-semibold">MEV Attack Blocked</div>
                <div className="text-sm text-gray-400">Sandwich attempt on JanusSwap</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-flag-green">✓ Blocked</div>
              <div className="text-xs text-gray-400">5 min ago</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-f1-black/40 rounded-lg border border-f1-gray/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-ferrari-red to-f1-red rounded-full flex items-center justify-center text-sm font-bold">
                💱
              </div>
              <div>
                <div className="font-semibold">Token Swap Completed</div>
                <div className="text-sm text-gray-400">0.5 ETH → 1,247 MCLAREN</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-flag-green">✓ Success</div>
              <div className="text-xs text-gray-400">12 min ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Guide */}
      <div className="mt-12">
        <ProjectGuide />
      </div>
    </div>
  );
}