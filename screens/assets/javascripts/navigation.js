const {ipcRenderer} = require('electron');

window.Navigation = {
	currentScreen: 1,
	
	initialize: function() {
		this.sendMessage(null, "App Start");
		this.bindDirection();
	},

	goToScreen: function(scr) {
		var curr = $('.screen[data-screen="' +  scr + '"]');

		if (scr == 1) {
			$('.screen').removeClass('content-bg')
			$('body').removeClass('show-home');
		} else {
			curr.addClass('content-bg');
			$('body').addClass('show-home');
		}

		$('.screen').removeClass('active'); 
		curr.addClass('active');

		this.currentScreen = scr;
	},
	sendMessage: function(type, data) {
		ipcRenderer.send('screenView', { type: type, data: data} );
	},

	bindDirection: function(){
		var self = this;
		$('a[data-direction]').on('click', function() {
			var direction = $(this).attr('data-direction');	
			self.sendMessage('direction', direction);
		});
	}

}


window.Navigation.initialize();
