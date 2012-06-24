<html>
  <head>
    <title>Hatemap</title>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script>
      $(document).ready(function(){
        $('#map_canvas').hide().fadeIn(10000);
      });
      
    </script>
  </head>
  <body style="width:100%;background:black;margin: 0;padding:0; background-image:url(/images/SplashScreenHateMap900.jpg);background-size: 500 px;">
    <center>
    	<div id="map_canvas" style="width:100%; height:100%"></div>

	<script>
	var map = null;
	var position = null;
	var marker = null;
	var clearIntVal = 0;
	var infoWindow = null;
	var results;

	function initialize() {
		var me = this;
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
		//this.callParent();

	    google.maps.event.addListener(infoWindow, 'closeclick', function() {
	    	console.log('here');
	    })
		
		var	mapOptions = {
				center: position,
				zoom: 15,
		        mapTypeId: google.maps.MapTypeId.ROADMAP,
		        mapTypeControl: false,
		        panControl: false,
		        streetViewControl: false,
		        zoomControl: false
			};
		 map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

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
			
		this.map = map;

		marker = new google.maps.Marker({
	        position: position,
	        map: map,
	        visible: true
	    });
		this.marker = marker;

		
		this.position = position;

	    setTimeout(function() {
            map.panTo(position);
        }, 1000);

	    setTimeout(function() {
        	//me.refreshHates();
        }, 5000);

        setInterval(function() {
        	//me.refreshHates();
        }, 15000);

        $.get("http://10.0.2.51:8008/api/local/hate", function(result){
            console.log(result.data);
            window.results = result.data;
            me.refreshHates();
            setInterval(function() {
	        	//me.refreshHates();
	        }, 15000);
           // call refreshHates on mapView // TODO::
       });
	}

	function addUserMarker(location, icon) {
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
	    	this.marker.setIcon("/images/map/blue_dot_circle.png");
	    	this.marker.setPosition(location);
	    }
        //position = marker;
    }

    function addHateMarker(location, icon, obj) {
		console.log('add marker '+obj.lat);
		console.log(obj);
		var me = this;
		var map = this.map;
		var markersArray = this.markersArray;
		var pos = new google.maps.LatLng(obj.lat, obj.long);
        var marker = new google.maps.Marker({
            position: pos,
            animation: google.maps.Animation.DROP,
            map: map,
            icon: icon
        });
        var strDesc = obj.desc;
        var strUrl = obj.url;

        google.maps.event.addListener(marker, 'click', function() {
        	// show the info box with thumbnail
        	me.infoWindow.setContent('<div style="overflow:hidden; padding-bottom:20px"><div style="width:320px"><b>'+strDesc+'</b></div><br/><img style="width:'+window.innerWidth/3+'px" src="'+strUrl+'" /></div>');
        	me.infoWindow.open(marker.getMap(), marker);

        	google.maps.event.addListener(me.infoWindow, 'closeclick', function() {
	    		me.infoWindow.close();
	    	})
        });

        markersArray.push(marker);
    }

    // Removes the overlays from the map, but keeps them in the array
    function clearOverlays() {
		var markersArray = this.markersArray;
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(null);
            }
        }
    }

    // Shows any overlays currently in the array
    function showOverlays() {
    	var map = this.map;
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(map);
            }
        }
    }

    // Deletes all markers in the array by removing references to them
    function deleteOverlays() {
		var markersArray = this.markersArray;
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(null);
            }
            markersArray.length = 0;
        }
    }

    function refreshHates() {
    	console.log('refreshHates');
    	var me = this;
    	var arr = [];
    	
    	me.deleteOverlays();
    	me.iterateMe(0);
    }

    function iterateMe(i) {
    	var me = this;
    	var rec = window.results; //Ext.getStore('Hates');
    	console.log(window.results);
		arr = rec;
    	pos = new google.maps.LatLng(arr[i].lat, arr[i].long);
		var icon = "/images/map/hate-unit.png";
		console.log(arr[i].weight);
		if(arr[i].weight < 3) icon = "/images/map/hate-unit.png";
		else if(arr[i].weight < 9 && arr[i].weight >= 3) icon = "/images/map/hate-unit.png";
		else if(arr[i].weight < 11 && arr[i].weight >= 9) icon = "/images/map/hate-unit-max2.png";
		
		me.addHateMarker( pos, icon,  arr[i]);
		pos = new google.maps.LatLng(arr[i].lat, arr[i].long);
		me.addHateMarker( pos, icon,  arr[i+1]);
		pos = new google.maps.LatLng(arr[i].lat, arr[i].long);
		me.addHateMarker( pos, icon,  arr[i+2]);
		pos = new google.maps.LatLng(arr[i].lat, arr[i].long);
		me.addHateMarker( pos, icon,  arr[i+3]);
		pos = new google.maps.LatLng(arr[i].lat, arr[i].long);
		me.addHateMarker( pos, icon,  arr[i+4]);
		i+=5;
    	setTimeout(function() {
    		me.iterateMe(i);
    	}, i*1);
    }

    initialize();
</script>

    <di
</center>
  </body>
</html>
