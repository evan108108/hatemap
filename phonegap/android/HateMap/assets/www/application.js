function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;	
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
	alert("location success, latitude: " + position.coords.latitude + ", longitude: " + position.coords.longitude);
}

function geolocationError(error) {
	alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}

function uploadPhoto(imageURI) {
	$('#photo_thumbnail').attr("src", imageURI).show();
	
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, "http://10.69.11.61:8008/api/99/hate/image", win, fail, options);
}

function win(r) {
	alert(JSON.stringify(r));
    alert("Code = " + r.responseCode);
    alert("Response = " + r.response);
    alert("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " = error.code);
}
