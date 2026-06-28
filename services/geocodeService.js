const axios = require('axios');

async function getAddress(lat, lon) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'absensi-karyawan-app'
            }
        });

        return response.data.display_name || '-';
    } catch (error) {
        return '-';
    }
}

module.exports = { getAddress };
