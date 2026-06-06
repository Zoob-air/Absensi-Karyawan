const axios = require("axios");

async function getAddress(lat, lng) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "absensi-app"
            }
        });

        return response.data.display_name || `${lat}, ${lng}`;
    } catch (err) {
        console.log(err);
        return `${lat}, ${lng}`;
    }
}

module.exports = { getAddress };