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
	position: null,
	marker:null,
	clearIntVal:0,
	infoWindow:null,

	initialize: function() {
		var me = this;/*
		var infoWindowOptions = {
                 content: "sf"
                ,disableAutoPan: false
                ,maxWidth: 0
                ,pixelOffset: new google.maps.Size(-140, 0)
                ,zIndex: null
                ,boxStyle: { 
                  background: "url('tipbox.gif') no-repeat"
                  ,opacity: 0.75
                  ,width: "280px"
                 }
                ,closeBoxMargin: "10px 2px 2px 2px"
                ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
        };*/
		//var position = new google.maps.LatLng(app.app.mapCenter[0], app.app.mapCenter[1]),
		var position = new google.maps.LatLng('40.7128243', '-74.0081761'),
			infoWindow = new google.maps.InfoWindow({
				content: "sdf",
				title: "your momo"
			}),
			map, geo, marker, clearIntVal;
		var markersArray = [];
		this.markersArray = markersArray;
		this.clearIntVal = clearIntVal;
		this.infoWindow = infoWindow;
		window.infoWindow = this.infoWindow;
		this.callParent();

	    google.maps.event.addListener(infoWindow, 'closeclick', function() {
	    	console.log('here');
	    })

		map = this.add({
			xtype: 'map',
			mapOptions: {
				center: position,
				zoom: 15,
		        mapTypeId: google.maps.MapTypeId.ROADMAP,
		        mapTypeControl: false,
		        panControl: false,
		        streetViewControl: false,
		        zoomControl: false
			},
			listeners: {
				maprender: function(comp, map) {
					var me = this;
					google.maps.event.addListener(map, 'center_changed', function() {
				    	console.log('center changed');
					    // 3 seconds after the center of the map has changed, pan back to the
					    // marker.
					    clearInterval(me.clearIntVal);
					    me.clearIntVal = setTimeout(function() {
					    	console.log('move to center '+me.clearIntVal);
					      	map.panTo(marker.getPosition());
					    }, 3000);
					  });
				}
			}
		});
		this.map = map;

		marker = new google.maps.Marker({
	        position: position,
	        map: map.getMap(),
	        visible: true
	    });
		this.marker = marker;

		geo = Ext.create('Ext.util.Geolocation', {
		    autoUpdate: true,
		    listeners: {
		        locationupdate: function(geo) {
		        	this.autoUpdate = false;
		            console.log('lat: '+ geo.getLatitude() + ' long: '+geo.getLongitude());
		            position = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
		            me.addUserMarker(position, "touch/resources/images/blue_dot_circle.png");
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
		this.position = position;
		geo.updateLocation();

	    setTimeout(function() {
            map.getMap().panTo(position);
        }, 1000);

	    setTimeout(function() {
        	me.refreshHates();
        }, 5000);

        setInterval(function() {
        	me.refreshHates();
        }, 15000);
	},
	addUserMarker: function(location, icon) {
		console.log('add marker');
		var map = this.map;
		if(this.marker == null) {
	        marker = new google.maps.Marker({
	            position: location,
	            map: map.getMap(),
	            icon: icon
	        });
	        this.marker = marker;
	    } else {
	    	this.marker.setIcon("touch/resources/images/blue_dot_circle.png");
	    	this.marker.setPosition(location);
	    }
        //position = marker;
    },
    addHateMarker: function(location, icon, obj) {
		console.log('add marker');
		var me = this;
		var map = this.map;
		var markersArray = this.markersArray;
        var marker = new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
            map: map.getMap(),
            icon: icon
        });
        google.maps.event.addListener(marker, 'click', function() {
        	// show the info box with thumbnail
        	me.infoWindow.setContent('<div style="overflow:hidden; padding-bottom:20px"><div style="width:320px"><b>'+obj.desc+'</b></div><br/><img style="width:'+window.innerWidth/3+'px" src="'+obj.url+'" /></div>');
        	me.infoWindow.open(marker.getMap(), marker);

        	google.maps.event.addListener(me.infoWindow, 'closeclick', function() {
	    		me.infoWindow.close();
	    	})
        });

        markersArray.push(marker);
    },

    // Removes the overlays from the map, but keeps them in the array
    clearOverlays: function() {
		var markersArray = this.markersArray;
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
		var markersArray = this.markersArray;
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
    	var arr = [];
		var tlat=40.714269,tlong=-74.004972;
		for(i=0; i<300; i++) {
			arr[i] = {id:i, lat:tlat+'',long:tlong+'',weight:(Math.random()*10),url:'http',desc:'Hate Tag Hate',address:''};
			//console.log('lat: '+tlat+' long: '+tlong);
			if(i%2 == 0) tlat += Math.random() / 1000;
			else tlat -= Math.random() / 1000;

			if(i%2 == 0) tlong -= Math.random() / 1000;
			else tlong += Math.random() / 1000;
		}
		var rec = Ext.getStore('Hates');
		arr = rec.data.all;
		//console.log(rec);
    	
    	me.deleteOverlays();

    	for(i in arr) {
    		//console.log(arr[i].data);
    		var position = new google.maps.LatLng(arr[i].data.lat, arr[i].data.long);
    		var icon = "touch/resources/images/hate-unit.png";
    		if(arr[i].weight < 3) icon = "touch/resources/images/hate-unit.png";
    		else if(arr[i].weight < 6 && arr[i].weight >= 3) icon = "touch/resources/images/hate-unit.png";
    		else if(arr[i].weight < 9 && arr[i].weight >= 6) icon = "touch/resources/images/hate-unit-max2.png";
    		me.addHateMarker( position, icon,  arr[i].data);
    	}
    }
});
