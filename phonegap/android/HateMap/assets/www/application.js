function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;	
}

function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, photoFailed, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: source });
}

function capturePhoto(){
	navigator.camera.getPicture(uploadPhoto, photoFailed, { quality: 50, destinationType: Camera.DestinationType.FILE_URI }); 
}

function photoFailed(message){
	alert("photoFailed: " + message);
}

function uploadPhoto(imageURI){
	$('#photo_thumbnail').attr("src", imageURI).show();
}

function getGeolocation() {
	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, { maximumAge: 9000, timeout: 5000, enableHighAccuracy: true });
}

function geolocationSuccess(position) {
	alert("location success, latitude: " + position.coords.latitude + ", longitude: " + position.coords.longitude);
}

function geolocationError(error) {
	alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}