import { MEVDetection } from '../components/MEVDetection';

export function SecurityPage() {
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-6xl">🛡️</span>
          <div>
            <h1 className="text-4xl font-bold font-f1 bg-gradient-to-r from-neon to-electric bg-clip-text text-transparent">
              Security Center
            </h1>
            <p className="text-xl text-gray-300 mt-2 font-racing">
              Advanced MEV Protection & Real-time Monitoring
            </p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-400 leading-relaxed">
            Monitor network security in real-time and protect your transactions from MEV attacks. 
            Our advanced detection system provides 24/7 monitoring with atomic bundle protection.
          </p>
        </div>
      </div>

      {/* Security Status Banner */}
      <div className="bg-gradient-to-r from-flag-green/20 to-neon/20 border border-flag-green/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-flag-green to-neon rounded-full flex items-center justify-center">
              <span className="text-2xl text-f1-black">✅</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-flag-green mb-1">Network Status: SECURE</h3>
              <p className="text-gray-300">All systems operational • MEV protection active</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Uptime</div>
            <div className="text-3xl font-bold text-flag-green font-racing">99.9%</div>
          </div>
        </div>
      </div>

      {/* Security Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Atomic Bundle Protection */}
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray hover:border-neon/50 transition-colors">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-neon to-electric rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl text-f1-black">⚛️</span>
            </div>
            <h3 className="text-xl font-bold text-neon">Atomic Bundles</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Transaction bundling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Private mempool routing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>MEV immunity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Guaranteed execution</span>
            </div>
          </div>
        </div>

        {/* Real-time Monitoring */}
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray hover:border-mclaren-orange/50 transition-colors">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-mclaren-orange to-ferrari-red rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-mclaren-orange">Live Monitoring</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Mempool scanning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Attack pattern detection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Risk assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Instant alerts</span>
            </div>
          </div>
        </div>

        {/* Smart Contract Security */}
        <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray hover:border-ferrari-red/50 transition-colors">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-ferrari-red to-f1-red rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-ferrari-red">Contract Security</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>SecureDApp audited</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Reentrancy protection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Access control</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flag-green">✓</span>
              <span>Slippage protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* MEV Detection Component */}
      <div className="bg-gradient-to-br from-track to-pit rounded-xl p-6 border border-f1-gray">
        <MEVDetection />
      </div>

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
  );
}