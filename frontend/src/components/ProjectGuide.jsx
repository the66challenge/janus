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

    </div>
  );
}