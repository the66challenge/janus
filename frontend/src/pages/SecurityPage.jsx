import { MEVDetection } from '../components/MEVDetection';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Eye } from 'lucide-react';
import GradientText from '../components/GradientText';

export function SecurityPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* F1 Racing Background Elements */}
      <div className="fixed inset-0 opacity-15 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-red-500/60 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
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
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🛡️
              </motion.span>
              <div>
                <GradientText
                  colors={['#DC0000', '#FF8700', '#DC0000', '#FFD700']}
                  animationSpeed={5}
                  className="text-5xl md:text-6xl font-black font-racing"
                >
                  F1 SECURITY
                </GradientText>
                <p className="text-xl text-white font-f1 mt-2 drop-shadow-lg">
                  Advanced MEV Protection & Real-time Monitoring
                </p>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-200 leading-relaxed backdrop-blur-sm bg-black/20 rounded-lg p-4 border border-white/10">
                Monitor network security in <span className="text-red-400 font-bold">real-time</span> and protect your transactions from MEV attacks. 
                Our <span className="text-yellow-400 font-bold">race-grade protection</span> provides 24/7 monitoring with atomic bundle security.
              </p>
            </div>
          </div>
        </motion.div>

        {/* F1 Security Status Banner with Glass Morphism */}
        <motion.div 
          className="relative backdrop-blur-lg bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-green-500/20 border border-green-400/30 rounded-xl p-6 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Racing accent */}
          <div className="absolute top-0 left-8 w-32 h-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.3)',
                    '0 0 30px rgba(34, 197, 94, 0.6)',
                    '0 0 20px rgba(34, 197, 94, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl text-black">✅</span>
              </motion.div>
              <div>
                <GradientText
                  colors={['#22C55E', '#06B6D4', '#22C55E']}
                  className="text-2xl font-bold font-racing mb-1"
                >
                  NETWORK STATUS: SECURE
                </GradientText>
                <p className="text-gray-200 font-f1">All systems operational • MEV protection active</p>
              </div>
            </div>
            <div className="text-right backdrop-blur-sm bg-black/20 rounded-lg p-3">
              <div className="text-sm text-gray-400 font-f1">Uptime</div>
              <GradientText
                colors={['#22C55E', '#FFD700', '#22C55E']}
                className="text-3xl font-bold font-racing"
              >
                99.9%
              </GradientText>
            </div>
          </div>
        </motion.div>

        {/* F1 Security Features Grid with Glass Morphism */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "⚛️",
              title: "Atomic Bundles",
              color: "from-cyan-500/20 to-blue-500/20",
              borderColor: "border-cyan-400/30",
              textColor: "text-cyan-400",
              features: ["Transaction bundling", "Private mempool routing", "MEV immunity", "Guaranteed execution"]
            },
            {
              icon: "📊", 
              title: "Live Monitoring",
              color: "from-orange-500/20 to-red-500/20",
              borderColor: "border-orange-400/30", 
              textColor: "text-orange-400",
              features: ["Mempool scanning", "Attack pattern detection", "Risk assessment", "Instant alerts"]
            },
            {
              icon: "🔒",
              title: "Contract Security", 
              color: "from-red-500/20 to-pink-500/20",
              borderColor: "border-red-400/30",
              textColor: "text-red-400",
              features: ["SecureDApp audited", "Reentrancy protection", "Access control", "Slippage protection"]
            }
          ].map((feature, i) => (
            <motion.div 
              key={feature.title}
              className={`relative backdrop-blur-lg bg-gradient-to-br ${feature.color} border ${feature.borderColor} rounded-xl p-6 shadow-xl text-center group hover:scale-105 transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Feature glow effect */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${feature.color}`}></div>
              
              <div className="relative z-10">
                <div className="text-center mb-4">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color.replace('/20', '/40')} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg border ${feature.borderColor}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-2xl">{feature.icon}</span>
                  </motion.div>
                  <GradientText
                    colors={[feature.textColor.replace('text-', '#'), '#FFFFFF', feature.textColor.replace('text-', '#')]}
                    className="text-xl font-bold font-racing"
                  >
                    {feature.title}
                  </GradientText>
                </div>
                <div className="space-y-3 text-sm">
                  {feature.features.map((feat, j) => (
                    <motion.div 
                      key={j}
                      className="flex items-center gap-2 backdrop-blur-sm bg-black/20 rounded-lg p-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.1 + j * 0.05 }}
                    >
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-200 font-f1">{feat}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Corner accent */}
              <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${feature.borderColor} rounded-tr-lg opacity-50`}></div>
            </motion.div>
          ))}
        </div>

        {/* MEV Detection Component with F1 Glass Design */}
        <motion.div 
          className="relative backdrop-blur-xl bg-gradient-to-br from-black/20 via-black/10 to-black/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Racing accent */}
          <div className="absolute top-0 left-8 w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
          
          <MEVDetection />
        </motion.div>

      {/* Attack Scenarios */}
      <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
        <h3 className="text-2xl font-bold mb-6 text-center">Protected Attack Scenarios</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Sandwich Attack */}
          <div className="bg-f1-black/40 rounded-lg p-6 border border-f1-gray/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-flag-red to-ferrari-red rounded-full flex items-center justify-center">
                <span className="text-xl">🥪</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-flag-red">Sandwich Attack</h4>
                <p className="text-sm text-gray-400">Price manipulation via front/back-running</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-track rounded">
                <span className="text-gray-400">Attack Vector:</span>
                <span className="text-flag-red">Swap front-running</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-track rounded">
                <span className="text-gray-400">Target:</span>
                <span className="text-white">JanusSwap AMM</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-track rounded">
                <span className="text-gray-400">Protection:</span>
                <span className="text-flag-green">Private mempool</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-track rounded">
                <span className="text-gray-400">Success Rate:</span>
                <span className="text-flag-green">100% blocked</span>
              </div>
            </div>
          </div>

          {/* Front-running Attack */}
          <div className="bg-f1-black/40 rounded-lg p-6 border border-f1-gray/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-flag-red to-mclaren-orange rounded-full flex items-center justify-center">
                <span className="text-xl">🏃</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-mclaren-orange">Front-running</h4>
                <p className="text-sm text-gray-400">Transaction copying with higher gas</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-track rounded">
                <span className="text-gray-400">Attack Vector:</span>
                <span className="text-mclaren-orange">NFT purchase racing</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-track rounded">
                <span className="text-gray-400">Target:</span>
                <span className="text-white">JanuPolis Market</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-track rounded">
                <span className="text-gray-400">Protection:</span>
                <span className="text-flag-green">Atomic bundles</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-track rounded">
                <span className="text-gray-400">Success Rate:</span>
                <span className="text-flag-green">100% blocked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray text-center">
          <div className="text-3xl font-bold text-neon font-racing mb-2">1,247</div>
          <div className="text-sm text-gray-400">Attacks Blocked</div>
          <div className="text-xs text-flag-green mt-1">+12 today</div>
        </div>
        
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray text-center">
          <div className="text-3xl font-bold text-mclaren-orange font-racing mb-2">$84K</div>
          <div className="text-sm text-gray-400">Value Protected</div>
          <div className="text-xs text-flag-green mt-1">+$2.1K today</div>
        </div>
        
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray text-center">
          <div className="text-3xl font-bold text-ferrari-red font-racing mb-2">847</div>
          <div className="text-sm text-gray-400">Protected Users</div>
          <div className="text-xs text-flag-green mt-1">+23 today</div>
        </div>
        
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray text-center">
          <div className="text-3xl font-bold text-flag-green font-racing mb-2">99.8%</div>
          <div className="text-sm text-gray-400">Success Rate</div>
          <div className="text-xs text-neon mt-1">All time</div>
        </div>
      </div>

      {/* How Protection Works */}
      <div className="bg-gradient-to-br from-track to-pit rounded-xl p-8 border border-f1-gray">
        <h3 className="text-2xl font-bold mb-6 text-center">How Janus Protection Works</h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-f1-red to-ferrari-red rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">👀</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-f1-red">Detection</h4>
            <p className="text-gray-400 text-sm">
              Real-time mempool monitoring detects suspicious patterns and potential MEV attacks before they execute.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-mclaren-orange to-ferrari-red rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-mclaren-orange">Bundling</h4>
            <p className="text-gray-400 text-sm">
              Multiple transactions are bundled together into atomic packages that execute as a single unit.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-neon to-electric rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-f1-black">🔒</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-neon">Private Routing</h4>
            <p className="text-gray-400 text-sm">
              Bundles are sent through private mempools, invisible to MEV bots and other attackers.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-flag-green to-neon rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-f1-black">✅</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-flag-green">Execution</h4>
            <p className="text-gray-400 text-sm">
              Atomic execution ensures all transactions in the bundle succeed together or fail together.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}