const {ipcRenderer} = require('electron');

window.Navigation = {
	currentScreen: 1,
	
	initialize: function() {
		this.sendMessage(null, "App Start");
		this.bindDirection();
		this.bindDetails();
		this.bindClickHome();
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

	bindClickHome: function() { 
		var self = this;
		$('.home-btn a').on('click', function() {
			if (self.currentScreen == 3) {
				self.sendMessage('homeClick', 'back');
			}

			self.goToScreen(self.currentScreen - 1);
		});	
	},


	sendMessage: function(type, data) {
		ipcRenderer.send('screenView', { type: type, data: data} );
	},


	bindDetails: function() {
		var self = this;
		$('.cities-list a').on('click', function(){
			var obj = $(this);
			var lat = obj.attr('data-lat');
			var lng = obj.attr('data-lng');

			self.prepareDetailScreen(lat, lng, obj.children('span').text(), obj.siblings('h2').text());
			self.goToScreen(3);
		});
	},

	prepareDetailScreen: function(lat, lng, name, parent) {
		$('.detail-block h1').html(name);
		$('.detail-block h3').html(parent.split(' ')[0]);
		
		this.sendMessage('rendering', { lat: lat, lng: lng });


	},

	bindDirection: function(){

		var self = this;
		$('a[data-direction]').on('click', function() {
			var direction = $(this).attr('data-direction');	
			self.sendMessage('direction', direction);
			self.sendMessage('direction', direction);
		});


		$('a[data-direction]').on('mousedown', function() {
			var direction = $(this).attr('data-direction');	
			self.sendMessage('direction', direction);
		});

	}

}


window.Navigation.initialize();
