var heatmap;
var heatmapData;

var minZoom = 13;
var maxZoom = 20;

var map;

function loaded() {
  heatmapData = new google.maps.MVCArray();
  initMap();
  retrieveMapData(14);
}

function retrieveMapData(time) {
  heatmapData.clear();
  var answer;

  var request = new XMLHttpRequest();
  request.open("GET", "http://10.23.40.77:8081/nw/geojson?stime=" + time, false);
  request.addEventListener('load', function(event) {
    answer = request.responseText;
    if (request.status < 200 || request.status >= 300) {
      console.warn(request.statusText, request.responseText);
    }

    var sensors = JSON.parse(answer).points;
    for (var i = 0; i < sensors.length; i++) {
      var sensor = sensors[i];
      heatmapData.push({location: new google.maps.LatLng(sensor.lat, sensor.lng), weight: sensor.vol});
    }
  });
  request.send();
}

function initMap() {
  var koeln = new google.maps.LatLng(50.9468308,6.9531882);
  map = new google.maps.Map(document.getElementById('map'), {
    center: koeln,
    zoom: minZoom,
    mapTypeId: 'roadmap'
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: true,
    map:map,
    radius : calcRadius(minZoom)
  });

  google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.getZoom() < minZoom) map.setZoom(minZoom);
    if (map.getZoom() > maxZoom) map.setZoom(maxZoom);
    heatmap.set('radius', (calcRadius(map.getZoom())));
  });
}

function calcRadius(zoom) {
  return (Math.pow(3, zoom) / 1500000);
}
