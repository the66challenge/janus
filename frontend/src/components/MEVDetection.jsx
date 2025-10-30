import { useState, useEffect } from 'react';
import { createPublicClient, webSocket, parseAbi } from 'viem';
import { hardhat } from 'viem/chains';

export function MEVDetection() {
  const [mevRisk, setMevRisk] = useState('LOW');
  const [recentAttacks, setRecentAttacks] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [potentialVictims, setPotentialVictims] = useState(new Set());

  // Mock WebSocket connection for demo (in production, use real WebSocket to mempool)
  useEffect(() => {
    let interval;
    
    const startMonitoring = () => {
      setIsMonitoring(true);
      
      // Simulate mempool monitoring
      interval = setInterval(() => {
        // Simulate random MEV activity
        const riskLevel = Math.random();
        
        if (riskLevel > 0.8) {
          setMevRisk('HIGH');
          addAttackEvent('Dual-Layer Attack Detected', 'CRITICAL');
        } else if (riskLevel > 0.6) {
          setMevRisk('MEDIUM');
          addAttackEvent('Sandwich Attack Pattern', 'WARNING');
        } else {
          setMevRisk('LOW');
        }
      }, 5000);
    };

    const addAttackEvent = (type, severity) => {
      const newAttack = {
        id: Date.now(),
        timestamp: new Date(),
        type,
        severity,
        txHash: '0x' + Math.random().toString(16).substr(2, 8) + '...',
      };
      
      setRecentAttacks(prev => [newAttack, ...prev.slice(0, 4)]);
    };

    startMonitoring();

    return () => {
      if (interval) clearInterval(interval);
      setIsMonitoring(false);
    };
  }, []);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'HIGH': return 'text-red-400 bg-red-900/20 border-red-500';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500';
      case 'LOW': return 'text-green-400 bg-green-900/20 border-green-500';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'CRITICAL': return '🚨';
      case 'WARNING': return '⚠️';
      case 'INFO': return 'ℹ️';
      default: return '•';
    }
  };

  return (
    <div className="space-y-6">
      {/* MEV Risk Banner */}
      <div className={`p-4 rounded-lg border ${getRiskColor(mevRisk)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {mevRisk === 'HIGH' ? '🚨' : mevRisk === 'MEDIUM' ? '⚠️' : '✅'}
            </span>
            <div>
              <h3 className="font-bold text-lg">
                MEV Risk Level: {mevRisk}
              </h3>
              <p className="text-sm opacity-80">
                {mevRisk === 'HIGH' 
                  ? 'High MEV activity detected! Use Atomic Pit Lane for protection.'
                  : mevRisk === 'MEDIUM'
                  ? 'Moderate MEV activity. Consider using protected transactions.'
                  : 'Low MEV activity. Network conditions are favorable.'
                }
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xs opacity-60">Monitoring Status</div>
            <div className={`flex items-center gap-1 ${isMonitoring ? 'text-green-400' : 'text-red-400'}`}>
              <span className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
              <span className="text-xs">{isMonitoring ? 'ACTIVE' : 'OFFLINE'}</span>
            </div>
          </div>
        </div>

        {/* Protection Recommendation */}
        {mevRisk !== 'LOW' && (
          <div className="mt-3 p-3 bg-black/20 rounded border-l-4 border-blue-500">
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span className="text-sm font-medium">
                Recommendation: Use Atomic Pit Lane for your next NFT purchase to avoid MEV attacks
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Recent MEV Activity */}
      <div className="card">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          📊 Recent MEV Activity
          <span className="text-xs bg-gray-700 px-2 py-1 rounded">LIVE</span>
        </h3>
        
        <div className="space-y-2">
          {recentAttacks.length === 0 ? (
            <div className="text-gray-400 text-center py-4">
              No recent MEV attacks detected
            </div>
          ) : (
            recentAttacks.map((attack) => (
              <div key={attack.id} className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                <div className="flex items-center gap-2">
                  <span>{getSeverityIcon(attack.severity)}</span>
                  <div>
                    <div className="text-sm font-medium">{attack.type}</div>
                    <div className="text-xs text-gray-400">
                      {attack.timestamp.toLocaleTimeString()} • {attack.txHash}
                    </div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded border ${
                  attack.severity === 'CRITICAL' ? 'text-red-400 border-red-500' :
                  attack.severity === 'WARNING' ? 'text-yellow-400 border-yellow-500' :
                  'text-blue-400 border-blue-500'
                }`}>
                  {attack.severity}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Protection Statistics */}
      <div className="card">
        <h3 className="font-bold mb-3">🛡️ Protection Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">47</div>
            <div className="text-xs text-gray-400">Protected Txs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">12</div>
            <div className="text-xs text-gray-400">Blocked Attacks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">$2.4k</div>
            <div className="text-xs text-gray-400">Value Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">98.7%</div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="card">
        <h3 className="font-bold mb-3">🔬 Detection Algorithm</h3>
        <div className="text-sm text-gray-400 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-blue-400">1.</span>
            <span>Monitor mempool for transactions to JanusSwap (ETH → MCLAREN)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400">2.</span>
            <span>Track users who may purchase dNFTs next (potential victims)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400">3.</span>
            <span>Detect when same user attempts dNFT purchase (dual-layer pattern)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400">4.</span>
            <span>Trigger RED FLAG alert and recommend Atomic Pit Lane protection</span>
          </div>
        </div>
      </div>
    </div>
  );
}