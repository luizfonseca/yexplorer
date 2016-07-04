/**
 *
 * This file describes content blocks 
 * We get json from APIs and build them into elements on the DOM
 *
 */

window.ContentBlock = {
	
	getCities: function() {
		return $.getJSON('./data/cities.json', function(){});
	},

	buildCitiesList: function(data) {
		if (typeof data === 'undefined') return false;

		var el;
		var copy = data.pt.cities;
		var block = [];

		for (var index in copy) {
			block[index] = ({ element: '<div/>', cssClass: 'large-3 columns end', children: [] }) 
			block[index].children.push({ 'element': 	'<h2/>', cssClass: 'h2-header', attr: { text: copy[index].header } });	

			for (var itemIndex in copy[index].items) {
				var item = copy[index].items[itemIndex];

				block[index].children.push({ 
					element: 	'<a/>',	 
					cssClass: '', 
					attr: { href: '#/', 
						'data-header': copy[index].header,
						'data-lat': item.lat, 'data-lng': item.lng, 'data-text': item.text,
						'data-name': item.name, 'data-background': item.background
					},
					children: [
						{ element: '<img/>', attr: { src: item.image, alt: '#', width: "420" } },
						{ element: '<span/>', attr: { text: item.name } }
					]
				});	


			}
		}
		return window.ContentBlock.buildBlock(block);
	},


	buildBlock: function(block) {
		var root = [];
		var child; 

		for (var index in block) {

			var item = block[index];
	
			if (typeof item.element != 'undefined') {
				var attr = typeof item.attr != 'undefined' ? item.attr : {};
				root.push($(item.element, attr).addClass(item.cssClass));

				if (item.children && item.children.length > 0) {
					root[index].append(window.ContentBlock.buildBlock(item.children));
				}
			}
		}

		//console.log(root);
		return root;
	},

}


