var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 3
});

console.log("hello")
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(
    function (data) {
        console.log(data)

        function donaldColor(x) {
            switch (true) {
                case x > 90:
                    return "red"
                case x > 70:
                    return "orangered"
                case x > 50:
                    return "orange"
                case x > 30:
                    return "yellow"
                case x > 10:
                    return "yellowgreen"
                default:
                    return "green";
            }

        }
        function donaldRadius(x) {
            if (x == 0) {
                return 1;
            }
            return x * 3
        }
        L.geoJSON(data, {
            pointToLayer: function (feature, latlon) {
                return L.circleMarker(latlon);
            },
            style: function (feature) {
                return {
                    color: "black",
                    fillColor: donaldColor(feature.geometry.coordinates[2]),
                    fillOpacity: 0.7,
                    radius: donaldRadius(feature.properties.mag),
                    weight: 0.5

                };
            }
        }).bindPopup(function (layer) {
            return layer.feature.properties.description;
        }).addTo(map);


        
    }

);