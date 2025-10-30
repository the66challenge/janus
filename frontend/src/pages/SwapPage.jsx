import { SwapComponent } from '../components/SwapComponent';

export function SwapPage() {
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-6xl">💱</span>
          <div>
            <h1 className="text-4xl font-bold font-f1 bg-gradient-to-r from-mclaren-orange to-ferrari-red bg-clip-text text-transparent">
              JanusSwap
            </h1>
            <p className="text-xl text-gray-300 mt-2 font-racing">
              High-Performance AMM with MEV Protection
            </p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-400 leading-relaxed">
            Trade ETH for F1 Team Tokens with our advanced AMM. Every swap is protected against 
            sandwich attacks and MEV extraction using atomic bundle technology.
          </p>
        </div>
      </div>

      {/* MEV Protection Banner */}
      <div className="bg-gradient-to-r from-neon/20 to-electric/20 border border-neon/30 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-r from-neon to-electric rounded-full flex items-center justify-center">
              <span className="text-2xl text-f1-black">🛡️</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neon mb-2">MEV Protection Active</h3>
            <p className="text-gray-300 text-sm">
              All swaps are automatically protected against MEV attacks. Your transactions are bundled 
              and sent via private mempools to ensure fair execution.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="text-right">
              <div className="text-sm text-gray-400">Protection Rate</div>
              <div className="text-2xl font-bold text-flag-green font-racing">99.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Swap Interface */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Swap Component - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <SwapComponent />
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          
          {/* Market Stats */}
          <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">📈</span>
              Market Stats
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">24h Volume</span>
                  <span className="font-bold text-mclaren-orange">$847K</span>
                </div>
                <div className="w-full bg-f1-gray rounded-full h-2">
                  <div className="bg-gradient-to-r from-mclaren-orange to-ferrari-red h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Liquidity</span>
                  <span className="font-bold text-neon">$2.4M</span>
                </div>
                <div className="w-full bg-f1-gray rounded-full h-2">
                  <div className="bg-gradient-to-r from-neon to-electric h-2 rounded-full w-5/6"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Fee Tier</span>
                  <span className="font-bold text-flag-green">0.3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Token Info */}
          <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">🏎️</span>
              MCLAREN Token
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Price</span>
                <span className="font-bold text-mclaren-orange font-racing">$0.0047</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">24h Change</span>
                <span className="font-bold text-flag-green">+12.34%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Market Cap</span>
                <span className="font-bold">$4.7M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Holders</span>
                <span className="font-bold">1,247</span>
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">🔄</span>
              Recent Trades
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-gray-400">0.15 ETH</span>
                <span className="text-mclaren-orange">→</span>
                <span className="text-white font-racing">367 MCLAREN</span>
                <span className="text-xs text-gray-500">2m</span>
              </div>
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-gray-400">0.08 ETH</span>
                <span className="text-mclaren-orange">→</span>
                <span className="text-white font-racing">195 MCLAREN</span>
                <span className="text-xs text-gray-500">5m</span>
              </div>
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-gray-400">0.32 ETH</span>
                <span className="text-mclaren-orange">→</span>
                <span className="text-white font-racing">782 MCLAREN</span>
                <span className="text-xs text-gray-500">8m</span>
              </div>
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-gray-400">0.22 ETH</span>
                <span className="text-mclaren-orange">→</span>
                <span className="text-white font-racing">538 MCLAREN</span>
                <span className="text-xs text-gray-500">12m</span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-f1-gray">
              <button className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors">
                View All Trades →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-track to-pit rounded-xl p-8 border border-f1-gray">
        <h3 className="text-2xl font-bold mb-6 text-center">How JanusSwap Works</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-f1-red to-ferrari-red rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-f1-red">Input Amount</h4>
            <p className="text-gray-400 text-sm">
              Enter the amount of ETH you want to swap for MCLAREN tokens. 
              Our smart contracts calculate the optimal rate.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-mclaren-orange to-ferrari-red rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-mclaren-orange">MEV Protection</h4>
            <p className="text-gray-400 text-sm">
              Your transaction is bundled with protective measures and sent 
              via private mempools to prevent sandwich attacks.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-neon to-electric rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-f1-black">3️⃣</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-neon">Instant Settlement</h4>
            <p className="text-gray-400 text-sm">
              Receive your MCLAREN tokens instantly at the guaranteed rate, 
              with full protection against MEV attacks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}