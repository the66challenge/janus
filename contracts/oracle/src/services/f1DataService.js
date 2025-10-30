import axios from 'axios';

export class F1DataService {
    constructor() {
        this.openF1Base = 'https://api.openf1.org/v1';
        this.ergastBase = 'https://ergast.com/api/f1';
    }

    /**
     * Get latest session (race/qualifying)
     */
    async getLatestSession() {
        const response = await axios.get(`${this.openF1Base}/sessions?session_type=Race&year=2024`);
        return response.data[response.data.length - 1];
    }

    /**
     * Get driver positions for a session
     */
    async getDriverPositions(sessionKey) {
        const response = await axios.get(
            `${this.openF1Base}/position?session_key=${sessionKey}`
        );
        return response.data;
    }

    /**
     * Check if driver achieved podium (P1/P2/P3)
     */
    isPodiumFinish(position) {
        return position >= 1 && position <= 3;
    }

    /**
     * Get next race info from Ergast
     */
    async getNextRace() {
        const response = await axios.get(`${this.ergastBase}/current/next.json`);
        return response.data.MRData.RaceTable.Races[0];
    }

    /**
     * Get driver information by driver number
     */
    getDriverInfo(driverNumber) {
        const drivers = {
            4: { name: 'Lando Norris', team: 'McLaren', country: 'GBR' },
            44: { name: 'Lewis Hamilton', team: 'Mercedes', country: 'GBR' },
            81: { name: 'Oscar Piastri', team: 'McLaren', country: 'AUS' },
            1: { name: 'Max Verstappen', team: 'Red Bull Racing', country: 'NLD' },
            16: { name: 'Charles Leclerc', team: 'Ferrari', country: 'MCO' },
            55: { name: 'Carlos Sainz', team: 'Ferrari', country: 'ESP' },
            11: { name: 'Sergio Perez', team: 'Red Bull Racing', country: 'MEX' },
            63: { name: 'George Russell', team: 'Mercedes', country: 'GBR' },
            14: { name: 'Fernando Alonso', team: 'Aston Martin', country: 'ESP' },
            18: { name: 'Lance Stroll', team: 'Aston Martin', country: 'CAN' },
        };
        return drivers[driverNumber] || { name: `Driver #${driverNumber}`, team: 'Unknown', country: 'UNK' };
    }
}