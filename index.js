$(function() {

  var spredfastLatLng = [30.264570, -97.746485];
  var USLatLng = [39.50, -98.35]

  var map = L.map('map', {
    center: USLatLng,
    zoom: 4
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'biggiesols.522814c9',
      accessToken: 'pk.eyJ1IjoiYmlnZ2llc29scyIsImEiOiJkNzA2MGYxZjI2ZDBjMzIzMTkzYjNmYzM5Y2YzZGQ5MSJ9.MBd4d0CgFV48vRDn0HzeQQ'
  }).addTo(map);


  var circle = L.circle(USLatLng, 400, {
      color: 'tomato',
      fillColor: '#f03',
      fillOpacity: 0,
      weight: 0,
      className: 'square'
  }).addTo(map);

  window.map = map;

  sfCoords = map.latLngToLayerPoint(spredfastLatLng);
  USCoords = map.latLngToLayerPoint(USLatLng);
  var data = [];

  // debugger;
  // window.dataPoints = _.map(function(point) { return map.latLngToLayerPoint(point) });
  dataPoints.slice(0, 10);
  var layerPoints = _.map(window.dataPoints, function(p) { 
    return _.extend({
      latLng: p
    }, map.latLngToLayerPoint(p)) 
  })
  console.log(dataPoints);


  d3.select('svg')
    .selectAll('circle')
    .data(layerPoints)
    .enter()
    .append('circle')

  d3.selectAll('circle')
    .attr({
      class: 'circle',
      fill: function(d) {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      stroke: '#f5f5f5',
      opacity: 0.6,
      r: 0.00001,
      opacity: 0.5,
    })
    .attr('lat', function(d) {
      return d.latLng[0];
    })
    .attr('lng', function(d) {
      return d.latLng[1]
    })
    .attr('cx', function(d) {
      return d.x
    })
    .attr('cy', function(d, i) {
      return d.y
    })
    .transition()
    .duration(function() { 
      return 2000 * Math.random();
     })
    .delay(function(d, i) { return (i * 200) * Math.random(); })
    // .ease('elastic')
    .attr({
      'stroke-width': 3,
      r: 20,
    })
    .transition()
    .ease('elastic')
    .duration(5000)
    .attr({
      'stroke-width': 0,
      opacity: 0.8,
      r: 5
    })

  d3.selectAll('circle').on('click', function() {
    console.log(this);
  })

  window.placeMarkers = function() {
    d3.selectAll('circle')
      .attr('cx', function(p) {
        var layerPoint = map.latLngToLayerPoint(p.latLng);
        return layerPoint.x;
      })
      .attr('cy', function(p) {
        var layerPoint = map.latLngToLayerPoint(p.latLng);
        return layerPoint.y;
      })
  }

  map.on('zoomend', placeMarkers);

});
