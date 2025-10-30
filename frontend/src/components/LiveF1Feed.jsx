import { useState, useEffect } from 'react';

export function LiveF1Feed() {
  const [raceData, setRaceData] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch next race from Ergast API
    const fetchRaceData = async () => {
      try {
        const response = await fetch('https://ergast.com/api/f1/current/next.json');
        const data = await response.json();
        
        if (data.MRData.RaceTable.Races.length > 0) {
          const nextRace = data.MRData.RaceTable.Races[0];
          setRaceData(nextRace);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch race data:', error);
        // Fallback to mock data
        setRaceData({
          raceName: "São Paulo Grand Prix",
          Circuit: {
            circuitName: "Interlagos",
            Location: {
              locality: "São Paulo",
              country: "Brazil"
            }
          },
          date: "2024-11-03",
          time: "18:00:00Z"
        });
        setLoading(false);
      }
    };

    fetchRaceData();
  }, []);

  useEffect(() => {
    if (!raceData) return;

    const updateCountdown = () => {
      const now = new Date();
      const raceDateTime = new Date(`${raceData.date}T${raceData.time || '14:00:00Z'}`);
      const difference = raceDateTime.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setCountdown('Race in progress or finished');
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    return () => clearInterval(interval);
  }, [raceData]);

  if (loading) {
    return (
      <div className="card lg:col-span-2">
        <h2 className="text-xl font-bold mb-4 text-mclaren-orange">
          🏁 Live F1 Feed
        </h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card lg:col-span-2">
      <h2 className="text-xl font-bold mb-4 text-mclaren-orange">
        🏁 Live F1 Feed
      </h2>
      
      {raceData && (
        <div className="space-y-4">
          {/* Next Race Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Next Race: {raceData.raceName}
              </h3>
              <div className="text-gray-400 space-y-1">
                <p>📍 {raceData.Circuit.circuitName}</p>
                <p>🌍 {raceData.Circuit.Location.locality}, {raceData.Circuit.Location.country}</p>
                <p>📅 {new Date(raceData.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-sm text-gray-400 mb-1">Time Until Race:</div>
              <div className="text-2xl font-bold text-white font-mono">
                {countdown}
              </div>
            </div>
          </div>

          {/* Race Status & dNFT Updates */}
          <div className="border-t border-gray-700 pt-4">
            <h4 className="font-semibold mb-2 text-green-400">🔄 dNFT Live Updates</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-gray-800/50 rounded">
                <span>Lando Norris Helmet dNFT</span>
                <span className="text-blue-400">Awaiting Race Data...</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-800/50 rounded">
                <span>Oscar Piastri Gloves dNFT</span>
                <span className="text-blue-400">Awaiting Race Data...</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                * dNFTs will update automatically when race events occur
              </div>
            </div>
          </div>

          {/* Championship Standings (Mock) */}
          <div className="border-t border-gray-700 pt-4">
            <h4 className="font-semibold mb-2 text-yellow-400">🏆 Driver Standings</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>1. Max Verstappen</span>
                <span className="font-mono">393 pts</span>
              </div>
              <div className="flex justify-between text-mclaren-orange">
                <span>2. Lando Norris</span>
                <span className="font-mono">331 pts</span>
              </div>
              <div className="flex justify-between">
                <span>3. Charles Leclerc</span>
                <span className="font-mono">307 pts</span>
              </div>
              <div className="flex justify-between text-mclaren-orange">
                <span>4. Oscar Piastri</span>
                <span className="font-mono">262 pts</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}