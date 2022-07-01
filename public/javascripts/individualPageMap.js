mapboxgl.accessToken = 'pk.eyJ1IjoieWFubmFuY2FpIiwiYSI6ImNsMmM0djF2dDAwcTAzZHA2eWRmbG90ODkifQ.yo5Vb2ZO16B-TTHm_fsb_w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: coord, // starting position [lng, lat]
    zoom: 13 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(coord)
    .addTo(map)