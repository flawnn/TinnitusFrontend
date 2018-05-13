
var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
      });

      var range_all_sliders = {
        'min': [     0 ],
        '25%': [6],
        '50%': [12],
        '75%': [18],
        'max': [24]
    };
    

      var slider = document.getElementById('range-field');
      noUiSlider.create(slider, {
       range: range_all_sliders,
       start: [14],
       step: 2,
       orientation: 'horizontal', // 'horizontal' or 'vertical'
       range: {
         'min': 0,
         'max': 24
       },
       format: wNumb({
         decimals: 0
       }),
       pips: {
        values: 5,
		mode: 'count',
		density: (8.37)
	    }
      });



slider.noUiSlider.on('change.one', function(){
    var x = slider.noUiSlider.get();
    if(x == 24){
        retrieveMapData(0);
    } else {
        retrieveMapData(Math.floor(x));
    }
    
});
