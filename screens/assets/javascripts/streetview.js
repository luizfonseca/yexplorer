const {ipcRenderer} = require('electron');


ipcRenderer.on('screenView-reply', function(event, data){
	if (data.type == 'rendering') 
		window.StreetView.setupPanorama(data.data.lat, data.data.lng);
	if (data.type == 'homeClick')
		window.StreetView.toggleStreetView();
});


window.StreetView = {
	initialize: function(){
		//this.setupPanorama('52.3598431', '4.8852837');
	},

	setupPanorama: function(msg_lat, msg_lng) {
		$('#street-view-embed').fadeOut('fast').remove();
		$('#streetview').append('<div id="street-view-embed" style="opacity: 0"></div>');
		
		var pano = new google.maps.StreetViewPanorama(
			document.getElementById('street-view-embed'), {
      position: { lat: parseFloat(msg_lat) , lng: parseFloat(msg_lng) },
      pov: { heading: 0, pitch: -20},
			visible: true,
			addressControl: false,
			disableDefaultUI: false,
			fullscreenControl: false,
			zoom: 1

    });


		setTimeout(function(){
			console.log('loaded');
			$("#street-view-embed").children().children().first().children().children().trigger('click');
			$('#street-view-embed').show().css({opacity: 0}).delay(500).animate({opacity: 1});
		}
		, 1500);
		



		return pano;


	},

	toggleStreetView: function() {
		$('#street-view-embed').fadeOut();
		$('#street-view-embed').remove();
	},



};

