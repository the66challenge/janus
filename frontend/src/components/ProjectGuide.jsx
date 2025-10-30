export function ProjectGuide() {
  return (
    <div className="space-y-6">
      
      {/* Project Overview */}
      <div className="card border-2 border-mclaren-orange/30">
        <h1 className="text-2xl font-bold text-mclaren-orange mb-4">
          🏎️ Project Janus - F1 MEV Defense Ecosystem
        </h1>
        <div className="space-y-3 text-gray-300">
          <p>
            <strong className="text-white">What is Project Janus?</strong> A comprehensive F1-themed DeFi ecosystem 
            built on Neon EVM that protects users from MEV (Maximum Extractable Value) attacks while trading 
            F1 team tokens and dynamic NFTs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-blue-900/20 rounded border border-blue-500/30">
              <h3 className="font-bold text-blue-300">🛡️ MEV Protection</h3>
              <p className="text-sm text-gray-400">All transactions use atomic bundles to prevent frontrunning</p>
            </div>
            <div className="p-3 bg-green-900/20 rounded border border-green-500/30">
              <h3 className="font-bold text-green-300">🏁 F1 Integration</h3>
              <p className="text-sm text-gray-400">Live F1 data updates dynamic NFT values and predictions</p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Guide */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-ferrari-red">
          📖 Complete Usage Guide
        </h2>
        
        <div className="space-y-6">
          
          {/* Step 1: Setup */}
          <div className="border-l-4 border-mclaren-orange pl-4">
            <h3 className="font-bold text-lg text-mclaren-orange">Step 1: Wallet Setup 🔗</h3>
            <div className="mt-2 space-y-2 text-sm text-gray-300">
              <p><strong>1.1 Install MetaMask:</strong> Download from metamask.io if you haven't already</p>
              <p><strong>1.2 Add Localhost Network:</strong></p>
              <div className="bg-gray-800 p-3 rounded font-mono text-xs">
                <div>• Network Name: <span className="text-green-400">Localhost</span></div>
                <div>• RPC URL: <span className="text-green-400">http://127.0.0.1:8545</span></div>
                <div>• Chain ID: <span className="text-green-400">31337</span></div>
                <div>• Currency: <span className="text-green-400">ETH</span></div>
              </div>
              <p><strong>1.3 Import Test Account:</strong> Use private key: <code className="text-green-400 bg-gray-800 px-1 rounded">0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80</code></p>
              <p className="text-yellow-400">⚠️ This gives you 10,000 test ETH for development</p>
            </div>
          </div>

          {/* Step 2: Navigation */}
          <div className="border-l-4 border-ferrari-red pl-4">
            <h3 className="font-bold text-lg text-ferrari-red">Step 2: Navigation 🧭</h3>
            <div className="mt-2 space-y-2 text-sm text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-gray-800/50 rounded">
                  <h4 className="font-bold text-blue-300">🏠 Dashboard</h4>
                  <p>• Live F1 race countdown</p>
                  <p>• Your portfolio overview</p>
                  <p>• MEV protection status</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded">
                  <h4 className="font-bold text-mclaren-orange">💱 Swap</h4>
                  <p>• Trade ETH ↔ F1 Team Tokens</p>
                  <p>• View liquidity pools</p>
                  <p>• MEV-protected transactions</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded">
                  <h4 className="font-bold text-ferrari-red">🖼️ Marketplace</h4>
                  <p>• Buy/sell dynamic F1 NFTs</p>
                  <p>• Values change with race results</p>
                  <p>• Team performance tracking</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded">
                  <h4 className="font-bold text-mercedes-teal">🛡️ Security</h4>
                  <p>• MEV attack monitoring</p>
                  <p>• Transaction protection stats</p>
                  <p>• Audit reports</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Swapping */}
          <div className="border-l-4 border-mercedes-teal pl-4">
            <h3 className="font-bold text-lg text-mercedes-teal">Step 3: How to Swap 💱</h3>
            <div className="mt-2 space-y-3 text-sm text-gray-300">
              <div>
                <strong className="text-white">3.1 Check Your Balances:</strong>
                <p>• Blue "Your Wallet" section shows your ETH and MCLAREN token balances</p>
                <p>• Pool section shows available liquidity for trading</p>
              </div>
              <div>
                <strong className="text-white">3.2 Enter Swap Amount:</strong>
                <p>• Type amount of ETH you want to swap</p>
                <p>• Click "MAX" to use maximum available ETH (minus gas fees)</p>
                <p>• See estimated MCLAREN tokens you'll receive</p>
              </div>
              <div>
                <strong className="text-white">3.3 Execute Swap:</strong>
                <p>• Button will show "🏎️ Swap X ETH → Y MCLAREN" when ready</p>
                <p>• Transaction is automatically protected from MEV attacks</p>
                <p>• MetaMask will ask for confirmation</p>
              </div>
            </div>
          </div>

          {/* Step 4: Understanding */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-lg text-purple-400">Step 4: Understanding the Tech 🔬</h3>
            <div className="mt-2 space-y-2 text-sm text-gray-300">
              <div>
                <strong className="text-white">Smart Contracts:</strong>
                <div className="bg-gray-800 p-3 rounded font-mono text-xs mt-1">
                  <div>• JanusSwap: <span className="text-green-400">AMM for token trading</span></div>
                  <div>• JanuPolis: <span className="text-blue-400">NFT marketplace</span></div>
                  <div>• McLaren Token: <span className="text-orange-400">ERC-20 team token</span></div>
                  <div>• JanusAugur: <span className="text-purple-400">Prediction markets</span></div>
                </div>
              </div>
              <div>
                <strong className="text-white">MEV Protection:</strong>
                <p>• Uses Flashbots-style atomic bundles</p>
                <p>• Prevents sandwich attacks and frontrunning</p>
                <p>• Ensures fair pricing for all users</p>
              </div>
              <div>
                <strong className="text-white">F1 Data Integration:</strong>
                <p>• Ergast API provides live race data</p>
                <p>• NFT values fluctuate with team performance</p>
                <p>• Prediction markets for race outcomes</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Current Features */}
      <div className="card border border-green-500/30">
        <h2 className="text-xl font-bold mb-4 text-green-400">
          ✅ Currently Working Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>MetaMask wallet connection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Multi-page F1-themed UI</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>ETH ↔ MCLAREN token swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Real-time balance updates</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Smart contract integration</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Pure ethers.js (no viem)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Input validation & error handling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>F1 motorsport design system</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card border border-yellow-500/30">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">
          🚧 Next Development Steps
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⏳</span>
            <span>Add liquidity provision functionality</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⏳</span>
            <span>Implement NFT marketplace trading</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⏳</span>
            <span>Connect live F1 API data</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⏳</span>
            <span>Deploy to Neon EVM mainnet</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-400">🔴</span>
            <span><strong>Required:</strong> SecureDApp audit integration</span>
          </div>
        </div>
      </div>

    </div>
  );
}