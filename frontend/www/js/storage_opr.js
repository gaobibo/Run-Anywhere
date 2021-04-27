
/*var firebaseConfig = {
    apiKey: "AIzaSyCBGaRnSWZYSthvaDcyjJDWIYyncaEhB7c",
    authDomain: "runanywhere-4441e.firebaseapp.com",
    databaseURL: "https://runanywhere-4441e.firebaseio.com",
    projectId: "runanywhere-4441e",
    storageBucket: "runanywhere-4441e.appspot.com",
    messagingSenderId: "41229694585",
    appId: "1:41229694585:web:89287ad59749273aa706a8",
    measurementId: "G-33FQCTYJ01"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);*/

  function handleUploadImgProcess( platformId, filePath, file, cb ){

    //var uploadTask;
    if( platformId == "browser" ){
        var uploadTask = firebase.storage().ref(filePath).putString( file, firebase.storage.StringFormat.DATA_URL);
        uploadTask.on('state_changed', function(snapshot){
        
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, function(error) {
            // Handle unsuccessful uploads
            //default url
            cb( "fail");
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              cb(downloadURL);
            });
          });
    }else{
        var uploadTask;
        window.resolveLocalFileSystemURL(file, function (fileEntry) {
            fileEntry.file(function (f) {
                var reader = new FileReader();
                reader.onloadend = function () {
                         // This blob object can be saved to firebase
                         var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });                  
                         uploadTask = firebase.storage().ref(filePath).put(blob);
                };
                reader.readAsArrayBuffer(f);
             });
         }, function (error) {
            cb( "fail");
         });
         uploadTask.on('state_changed', function(snapshot){
        
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, function(error) {
            // Handle unsuccessful uploads
            //default url
            cb( "fail");
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              cb(downloadURL);
            });
          });
    }
    
}

/*
function handleUploadGpxProcess( platformId, filePath, file, cb ){

    var uploadTask;
    if( platformId == "browser" ){
        alert( file);
        uploadTask = firebase.storage().ref(filePath).put(file);
    }else{
        window.resolveLocalFileSystemURL(file, function (fileEntry) {
            fileEntry.file(function (f) {
                var reader = new FileReader();
                reader.onloadend = function () {
                         // This blob object can be saved to firebase
                         var blob = new Blob([new Uint8Array(this.result)], { type: "xml" });                  
                         uploadTask = firebase.storage().ref(filePath).put(blob);
                };
                reader.readAsArrayBuffer(f);
             });
         }, function (error) {
            cb( "fail");
         });
    }
    
   
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(error) {
        // Handle unsuccessful uploads
        //default url
        cb( "fail");
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          cb(downloadURL);
        });
      });
}

*/

function handleDownloadProcess( filePath ){

    var storageRef = firebase.storage().ref();
    storageRef.child(filePath).getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
    
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
        var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    return url;
    
    
    }).catch(function(error) {
    // Handle any errors
    });

}


function uploadProfilePicture(platformId, profileId, file,  cb){
    
    handleUploadImgProcess(platformId, 'profiles_pic/' + profileId + '.jpg', file, cb);

}

function uploadRaceLogo(platformId, raceId, file, cb){
    handleUploadImgProcess(platformId, 'races_logo/' + raceId + '.jpg', file, cb);

}

function uploadRaceKML(platformId, platformId, raceId, file, cb){

   // handleUploadGpxProcess(platformId, 'races_kml/' + raceId + '.kml', file, cb);

}

function uploadRacePictures(platformId, raceId, files, cb){

    var index = 0;
    files.forEach( file => {
        index += 1;
        handleUploadProcess(platformId, 'races_pics/' + raceId + '/' + index + '.jpg', file, cb );
    });
    

}

function downloadProfilePicture( profileId ){

    handleDownloadProcess('profiles_pic/' + profileId + '.jpg');
}

function downloadRaceLogo(raceId){
    handleDownloadProcess('races_logo/' + raceId + '.jpg');

}

function downloadRaceKML(){
    handleDownloadProcess('races_kml/' + raceId + '.jpg');

}


function downloadRacePictures(){


}


