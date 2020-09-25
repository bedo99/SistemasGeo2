let map = L.map('map').setView([37.8, -96], 4);
map.doubleClickZoom.disable();

var totMarks = 0;
changeIcon = false;

const tilesP = {
    t0: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    t1: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
    t2: 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png',
    t3: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    t4: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    t5: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
};

L.tileLayer(tilesP.t0, {
  maxZoom: 17,
}).addTo(map);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function mapTileChange() {
    var x = document.getElementById("mySelect").value;
    L.tileLayer(tilesP[x], {
        maxZoom: 17,
    }).addTo(map);
}

var greenIcon = L.icon({
    iconUrl: './img/leaf-green.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


map.on('dblclick', function (e) {
    let latLng = map.mouseEventToLatLng(e.originalEvent);
    console.log(latLng);
    L.marker([latLng.lat, latLng.lng], { icon: greenIcon }).addTo(map);
    totMarks++
    console.log(`Total de marcadores: ${totMarks}`);
    eachThree(totMarks);
});

function eachThree(number) {
    if(number % 3 == 0) {
        changeIcon = !changeIcon;
        console.log(changeIcon);
    }
    if(changeIcon){
        greenIcon.options.iconUrl = "./img/PIN2Local.png";
    } else {
        greenIcon.options.iconUrl = "./img/PINTrebol.png";
    }
}

function resetMap(){
    document.location.reload();
}