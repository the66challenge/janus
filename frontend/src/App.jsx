import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';
import { ConnectButton } from './components/ConnectButton';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-f1-black text-white">
          {/* Header */}
          <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🏎️</span>
                  <div>
                    <h1 className="text-2xl font-bold text-f1-red">
                      Janus Pit Wall
                    </h1>
                    <p className="text-sm text-gray-400">
                      Secure F1 dNFT Market & MEV Defense
                    </p>
                  </div>
                </div>
                <ConnectButton />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Live F1 Feed */}
              <div className="card lg:col-span-2">
                <h2 className="text-xl font-bold mb-4 text-mclaren-orange">
                  🏁 Live F1 Feed
                </h2>
                <div className="text-gray-400">
                  <p className="mb-2">Next Race: São Paulo Grand Prix</p>
                  <p className="text-2xl font-bold text-white">
                    Countdown: Loading...
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4">📊 Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total dNFTs:</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Markets:</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">MEV Protected:</span>
                    <span className="font-bold text-green-500">✓</span>
                  </div>
                </div>
              </div>

              {/* JanusSwap */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4 text-mclaren-orange">
                  💱 JanusSwap
                </h2>
                <p className="text-gray-400 mb-4">
                  Swap ETH for F1 Team Tokens
                </p>
                <button className="btn-primary w-full" disabled>
                  Coming Soon
                </button>
              </div>

              {/* Janus Market */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4 text-ferrari-red">
                  🖼️ Janus Market
                </h2>
                <p className="text-gray-400 mb-4">
                  Trade Dynamic F1 NFTs
                </p>
                <button className="btn-primary w-full" disabled>
                  Coming Soon
                </button>
              </div>

              {/* Pit Predictor */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4 text-mercedes-teal">
                  🎯 Pit Predictor
                </h2>
                <p className="text-gray-400 mb-4">
                  Predict Race Outcomes
                </p>
                <button className="btn-primary w-full" disabled>
                  Coming Soon
                </button>
              </div>

            </div>

            {/* MEV Protection Banner */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛡️</span>
                <div>
                  <h3 className="text-lg font-bold text-green-400">
                    Atomic Pit Lane Protection Active
                  </h3>
                  <p className="text-gray-400 text-sm">
                    All transactions are protected against MEV attacks using atomic bundles
                  </p>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-800 mt-12 py-6">
            <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
              <p>Project Janus - Built for Neon EVM Hackathon</p>
              <p className="mt-1">SecureDApp Audited • MEV Protected • F1 Powered</p>
            </div>
          </footer>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;