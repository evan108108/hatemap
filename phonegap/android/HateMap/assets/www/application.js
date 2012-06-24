
function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
	alert("onDeviceReady called");
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    device_uid = device.uuid;
    getGeolocation();
    
    //
    app.mainLaunch();
}

function getPhoto(source) {
    navigator.camera.getPicture(uploadPhoto, photoFailed, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: source });
}

function capturePhoto(){
	navigator.camera.getPicture(uploadPhoto, photoFailed, { quality: 50, destinationType: Camera.DestinationType.FILE_URI }); 
}

function photoFailed(message){
	alert("photoFailed: " + message);
}

function getGeolocation() {
	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, { maximumAge: 25000, timeout: 25000, enableHighAccuracy: true });
}

function geolocationSuccess(position) {
	alert("geolocationSuccess called");
	current_lat = position.coords.latitude;
	current_long = position.coords.longitude;
	Hate.current_lat = current_lat;
	Hate.current_long = current_long;
//	$("#hate_lat").val(current_lat);
//	$("#hate_long").val(current_long);
}

function geolocationError(error) {
	alert('We could not find your GPS location. Make sure to turn on GPS.');
}

function uploadPhoto(imageURI) {
	$('#photo_thumbnail').attr("src", imageURI).show();
	
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = new Object();
    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, "http://10.0.2.51:8008/api/" + device_uid +"/hate/image", win, fail, options);
}

function win(r) {
//	alert(JSON.stringify(r));
//    alert("Code = " + r.responseCode);
//    alert("Response = " + r.response);
//    alert("Sent = " + r.bytesSent);
    var json_response = JSON.parse(r.response);
    
    if(json_response["success"] == false) {
    	alert(json_response["message"]);
    }
    else {
    	uploaded_image_url = json_response["data"]["url"];	
    	$("#hate_url").val(uploaded_image_url);
    }
}

function fail(error) {
    alert("An error has occurred: Code = " = error.code);
}

function getMyHates() {	
	$.get("http://10.0.2.51:8008/api/" + device_uid +"/hate/me", function(data){
		alert("successful get my hates: " + JSON.stringify(data));
	});
}

function getAllHates() {
	$.get("http://10.0.2.51:8008/api/" + device_uid +"/hate", function(data){
		alert("successful get all hates: " + JSON.stringify(data));
	});
}

function postMyHate() {
	alert($("#new_hate_form").serialize());
//	$.post("http://10.0.2.51:8008/api/" + device_uid +"/hate", $("#new_hate_form").serialize(), function(data) {
//		alert("successful post returned: " + JSON.stringify(data));
//	});
	$.ajax({
		  type: 'POST',
		  url: "http://10.0.2.51:8008/api/" + device_uid +"/hate",
		  data: $("#new_hate_form").serialize(),
		  success: function(data){
			  alert("successful post returned: " + JSON.stringify(data));
		  },
		  error: function(error){
			  alert(JSON.stringify(error));
		  },
		  dataType: "json"
		});
}