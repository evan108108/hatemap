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
	map:null,
	markersArray: [],
	geo:null,
	initialize: function() {
		var me = this;
		var position = new google.maps.LatLng(app.app.mapCenter[0], app.app.mapCenter[1]),
			infoWindow = new google.maps.InfoWindow({ content: app.app.mapText }),
			map, geo, marker;
		var markersArray = [];
		this.markersArray = markersArray;

		this.callParent();

		map = this.add({
			xtype: 'map',
			mapOptions: {
				center: position,
				zoom: 15,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		});
		this.map = map;

		marker = new google.maps.Marker({
	        position: position,
	        map: map.getMap(),
	        visible: true
	    });

		geo = Ext.create('Ext.util.Geolocation', {
		    autoUpdate: false,
		    listeners: {
		        locationupdate: function(geo) {
		        	this.autoUpdate = false;
		            console.log('lat: '+ geo.getLatitude() + ' long: '+geo.getLongitude());
		            position = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
		            me.addMarker(position);
		        },
		        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
		            if(bTimeout){
		                alert('Location timeout occurred.');
		            } else {
		                alert('Location error occurred.');
		            }
		        }
		    }
		});
		this.geo = geo;
		geo.updateLocation();

	    google.maps.event.addListener(marker, 'click', function() {
	        infoWindow.open(map, marker);
	    });

	    setTimeout(function() {
            map.getMap().panTo(position);
        }, 1000);

        setTimeout(function() {
        	me.refreshHates();
        }, 2000);
	},
	addMarker: function(location, icon) {
		console.log('add marker');
		var map = this.map;
        var marker = new google.maps.Marker({
            position: location,
            map: map.getMap(),
        });
    },
    addHateMarker: function(location, icon) {
		console.log('add marker');
		var me = this;
		var map = this.map;
		var markersArray = this.markersArray;
        var marker = new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
            map: map.getMap(),
            icon: "touch/resources/images/hate-unit.png",
        });
        google.maps.event.addListener(marker, 'click', function() {
        	console.log(marker.getPosition());
        });

        markersArray.push(marker);
    },

    // Removes the overlays from the map, but keeps them in the array
    clearOverlays: function() {
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(null);
            }
        }
    },

    // Shows any overlays currently in the array
    showOverlays: function() {
    	var map = this.map;
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(map);
            }
        }
    },

    // Deletes all markers in the array by removing references to them
    deleteOverlays: function() {
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(null);
            }
            markersArray.length = 0;
        }
    },

    refreshHates: function() {
    	console.log('refreshHates');
    	var me = this;
    	var rec = Ext.getStore('Hates');
    	var arr = [];
		var tlat=40.714269,tlong=-74.004972;
		for(i=0; i<10; i++) {
			arr[i] = {id:i, lat:tlat+'',long:tlong+'',weight:0,url:'http',desc:'Hate Tag Hate',address:''};
			console.log('lat: '+tlat+' long: '+tlong);
			if(i%2 == 0) tlat += Math.random() / 1000;
			else tlat -= Math.random() / 1000;

			if(i%2 == 0) tlong -= Math.random() / 1000;
			else tlong += Math.random() / 1000;
		}
    	
    	for(i in arr) {
    		var position = new google.maps.LatLng(arr[i].lat, arr[i].long);
    		me.addHateMarker( position );
    	}
    },

    markerClicked: function() {
    	// do something
    	alert(str);
    }
});
