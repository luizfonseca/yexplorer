const {ipcRenderer} = require('electron');

window.Navigation = {
	currentScreen: 1,
	
	initialize: function() {
		this.sendMessage(null, "App Start");
		this.bindDirection();
		this.bindClickHome();

		var content = window.ContentBlock;
		var self		= this;

		content.getCities().done(function(data){
			var cities = content.buildCitiesList(data);	
			$('.cities-list').append(cities);
			self.bindDetails();
		});

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
		$('.cities-list').on('click', 'a', function(){
			var obj = $(this);
			self.prepareDetailScreen(obj);
			self.goToScreen(3);
		});
	},

	prepareDetailScreen: function(obj) {
		$('.detail-block h1').html(obj.data('name'));
		$('.detail-block h3').html(obj.data('header').split(' ')[0]);
		$('.detail-block p').html(obj.data('text'));
		$('#details-screen').delay(500).css({background: 'url('+obj.data('background')+')', backgroundSize: 'cover'});
		
		this.sendMessage('rendering', { lat: obj.data('lat'), lng: obj.data('lng') });

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
