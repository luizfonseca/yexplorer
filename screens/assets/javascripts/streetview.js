const {ipcRenderer} = require('electron');


window.StreetView = {
	initialize: function(){
		this.setupPanorama('52.3598431', '4.8852837');
	},

	setupPanorama: function(msg_lat, msg_lng) {
		$('#streetview').append('<div id="street-view-embed"></div>');
		
		var pano = new google.maps.StreetViewPanorama(
			document.getElementById('street-view-embed'), {
      position: { lat: parseFloat(msg_lat) , lng: parseFloat(msg_lng) },
      pov: { heading: 0, pitch: 0},
      disableDefaultUI: false,
      linksControl: true,
      panControl: true,
      addressControl: false,
      enableCloseButton: false,
      zoomControl: false,
      fullScreenControl: false,
      enableCloseButton: false,
      addressControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER
      }

    });
		pano.addListener('tiles', function(evt) {
			console.log('loaded');
			jQuery("#street-view-embed").children().children().first().children().trigger('click');

		});
		
		google.maps.event.trigger(pano, 'tiles');


		$('#street-view-embed').css({opacity: 0}).delay(500).animate({opacity: 1});

		return pano;


	},

	toggleStreetView: function() {
		$('#street-view-embed').fadeOut();
		$('#street-view-embed').remove();
	},



};

