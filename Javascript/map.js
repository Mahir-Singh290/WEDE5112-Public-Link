

//Step 1: Creating the map
//The word map referes to the id of our HTML
//SetView() sets the starting position of the map
//The fist two co-ordinates are the last and long respeectively
//The number  16 is the zoom level
//A lower number means we zoom out futher
//A higher number means we zoom in closer

var map = L.map('map').setView(
    [ -34.1085, 18.4682],
    16
)
//Step 2: Adding the map background

//L.tileLayer() loads the images that make up the background

//The url below gets the map images from OpenStreetMap
//{z} represents zzom levels
//{x} and {y} represent the tile positions

//Leaflet automatically replaces z, x, and y
//Witht ehh correct value when loading the map

//maxZoom to 19 so users can't zoom in further

//attribute gives credit to OpenStreenMap for providing the map data

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap Contributors'
    }
).addTo(map);

//Step 3: Add location marker

//L.marker() creates a marker (pin)

var marker = L.marker(
    [ -34.1085, 18.4682],
).addTo(map);

//Step 4: Add a pop up message
marker.bindPopup(
    "<b> Cape Union Mart </b><br>" +
    "7 Atlantic Road,  <br>" +
    " Cape Town, 7945"
);

//display the popup
//Normally a user must click on a marker before the
//popup becomes visible

//OpenpopUp AUTOMATICALLY OPEN IT
