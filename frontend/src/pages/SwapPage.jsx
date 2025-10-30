import { SwapComponent } from '../components/SwapComponent';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Shield, Gauge, Target, Trophy } from 'lucide-react';
import GradientText from '../components/GradientText';

export function SwapPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* F1 Racing Background Elements */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-16 bg-gradient-to-b from-orange-500/60 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
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
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
          
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.span 
                className="text-6xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                💱
              </motion.span>
              <div>
                <GradientText
                  colors={['#FF8700', '#DC0000', '#FF8700']}
                  animationSpeed={4}
                  className="text-5xl md:text-6xl font-black font-racing"
                >
                  JANUS SWAP
                </GradientText>
                <p className="text-xl text-white font-f1 mt-2 drop-shadow-lg">
                  Lightning-Fast F1 Token Exchange
                </p>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-200 leading-relaxed backdrop-blur-sm bg-black/20 rounded-lg p-4 border border-white/10">
                Trade ETH for exclusive <span className="text-orange-400 font-bold">F1 Team Tokens</span> with 
                millisecond execution speeds. Every swap is <span className="text-cyan-400 font-bold">MEV protected</span> using 
                our revolutionary atomic bundle technology.
              </p>
            </div>
          </div>
        </motion.div>

        {/* MEV Protection Banner */}
        <motion.div 
          className="relative backdrop-blur-lg bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-cyan-500/10 border border-cyan-400/30 rounded-2xl p-6 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 animate-pulse"></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <Shield className="w-10 h-10 text-black" />
              </div>
            </motion.div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-cyan-300 mb-3 font-racing">
                🛡️ MEV SHIELD ACTIVE
              </h3>
              <p className="text-gray-200 text-base leading-relaxed">
                <span className="text-cyan-400 font-bold">Atomic Bundle Protection</span> ensures your swaps execute at fair prices. 
                No sandwich attacks, no front-running - guaranteed F1-speed execution.
              </p>
            </div>
            
            <div className="flex-shrink-0 text-right">
              <div className="space-y-2">
                <div className="text-sm text-gray-400 font-f1">Success Rate</div>
                <GradientText
                  colors={['#00FF00', '#40FF00', '#00FF00']}
                  className="text-3xl font-black font-racing"
                >
                  99.9%
                </GradientText>
                <div className="text-xs text-gray-400">Protected Swaps</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Swap Interface */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Swap Component */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-black/25 via-black/15 to-black/5 border border-white/15 rounded-2xl p-6 shadow-2xl">
              {/* Racing accents */}
              <div className="absolute top-0 left-8 w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              
              <SwapComponent />
            </div>
          </motion.div>

          {/* Side Panel */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            
            {/* Market Stats with F1 Styling */}
            <div className="relative backdrop-blur-lg bg-gradient-to-br from-black/20 via-black/10 to-black/5 border border-white/15 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-racing">
                <Gauge className="w-6 h-6 text-orange-400" />
                <GradientText
                  colors={['#FF8700', '#DC0000']}
                  className="text-lg font-bold"
                >
                  Market Stats
                </GradientText>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm font-f1">24h Volume</span>
                    <span className="font-bold text-orange-400">$847K</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2 border border-white/10">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-3/4 shadow-lg shadow-orange-500/30"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm font-f1">Liquidity</span>
                    <span className="font-bold text-cyan-400">$2.4M</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2 border border-white/10">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full w-5/6 shadow-lg shadow-cyan-500/30"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm font-f1">Fee Tier</span>
                    <span className="font-bold text-green-400">0.3%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* F1 Team Tokens */}
            <div className="relative backdrop-blur-lg bg-gradient-to-br from-black/20 via-black/10 to-black/5 border border-white/15 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-racing">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <GradientText
                  colors={['#FFD700', '#FF8700']}
                  className="text-lg font-bold"
                >
                  F1 Tokens
                </GradientText>
              </h3>
              
              <div className="space-y-3">
                {[
                  { name: 'McLaren', symbol: '$MCLAREN', price: '$0.84', change: '+12.4%', color: 'from-orange-500 to-orange-600' },
                  { name: 'Ferrari', symbol: '$FERRARI', price: '$1.23', change: '+8.7%', color: 'from-red-500 to-red-600' },
                  { name: 'Mercedes', symbol: '$MERC', price: '$0.97', change: '+5.2%', color: 'from-cyan-400 to-cyan-500' }
                ].map((token, i) => (
                  <motion.div 
                    key={token.symbol}
                    className="flex items-center justify-between p-3 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 hover:border-orange-400/30 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${token.color} rounded-full flex items-center justify-center text-xs font-bold text-black`}>
                        {token.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{token.symbol}</div>
                        <div className="text-xs text-gray-400">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white text-sm">{token.price}</div>
                      <div className="text-xs text-green-400">{token.change}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}