const losAngeles = {
    lat: 34.0522,
    lng: -118.2437
};
const austinTexas = {
    lat: 30.2672,
    lng: -97.7431
};
const miamiFlorida = {
    lat: 25.7617,
    lng: -80.1918
};

function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

function getClosestCity(latitude, longitude) {
    const laDistance = getDistance(latitude, longitude, losAngeles.lat, losAngeles.lng);
    const atxDistance = getDistance(latitude, longitude, austinTexas.lat, austinTexas.lng);
    const mfDistance = getDistance(latitude, longitude, miamiFlorida.lat, miamiFlorida.lng);

    let closestCity = "";
    let closestDistance = Infinity;

    if (laDistance < closestDistance) {
        closestCity = "Los Angeles, California";
        closestDistance = laDistance;
    }
    if (atxDistance < closestDistance) {
        closestCity = "Austin, Texas";
        closestDistance = atxDistance;
    }
    if (mfDistance < closestDistance) {
        closestCity = "Miami, Florida";
        closestDistance = mfDistance;
    }

    return closestCity;
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const closestCity = getClosestCity(
            position.coords.latitude,
            position.coords.longitude
        );
        document.getElementById("output").innerHTML =
            "You are closest to the " + closestCity + " store.";
        if (closestCity === "Los Angeles, California") {
            document.querySelector(".Austin").style.display = "none";
            document.querySelector(".Miami").style.display = "none";
        } else if (closestCity === "Austin, Texas") {
            document.querySelector(".LA").style.display = "none";
            document.querySelector(".Miami").style.display = "none";
        } else if (closestCity === "Miami, Florida") {
            document.querySelector(".LA").style.display = "none";
            document.querySelector(".Austin").style.display = "none";
        }
    });
} else {
    document.getElementById("output").innerHTML =
        "Geolocation is not supported by your browser.";
}

// block-vendor:tapcart
// block-type:geolocation-store-locator