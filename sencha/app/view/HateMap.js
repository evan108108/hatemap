Ext.define('app.view.HateMap', {

	extend: 'Ext.Container',
	xtype: 'hateMap',

	config: {

		title: 'HateMap',
		iconCls: 'locate',

		layout: 'fit',

		/*items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				title: 'Location'
			}
		]*/
	},

	initialize: function() {

		var position = new google.maps.LatLng(app.app.mapCenter[0], app.app.mapCenter[1]),
			infoWindow = new google.maps.InfoWindow({ content: app.app.mapText }),
			map, marker;

		this.callParent();

		map = this.add({
			xtype: 'map',
			mapOptions: {
				center: position,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		});

		marker = new google.maps.Marker({
	        position: position,
	        map: map.getMap(),
	        visible: true
	    });

	    google.maps.event.addListener(marker, 'click', function() {
	        infoWindow.open(map, marker);
	    });

	    setTimeout(function() {
            map.getMap().panTo(position);
        }, 1000);
	},
});
