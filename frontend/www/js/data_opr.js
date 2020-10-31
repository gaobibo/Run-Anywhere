/*
function include(filename)
{
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    
    head.appendChild(script);
}

include("https://www.gstatic.com/firebasejs/5.9.4/firebase.js");
include("https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js");
include("https://www.gstatic.com/firebasejs/7.3.0/firebase-analytics.js");
include("https://www.gstatic.com/firebasejs/6.1.1/firebase-auth.js");
include("https://www.gstatic.com/firebasejs/6.1.1/firebase-database.js");
*/

/*
document.write('<script src="myscript.js" type="text/javascript"></script>');


// Firebase 
document.head.write('<script src="https://www.gstatic.com/firebasejs/5.9.4/firebase.js"></script>' );

//The core Firebase JS SDK is always required and must be listed first -->
document.head.write('<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js"></script>' );

//TODO: Add SDKs for Firebase products that you want to use
//    https://firebase.google.com/docs/web/setup#available-libraries
document.head.write('<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-analytics.js"></script>' );
//Add Firebase products that you want to use -->
document.head.write('<script src="https://www.gstatic.com/firebasejs/6.1.1/firebase-auth.js"></script>' );

document.head.write('<script src="https://www.gstatic.com/firebasejs/6.1.1/firebase-database.js"></script>' );
*/
/*
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase.js");
importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-analytics.js");
importScripts("https://www.gstatic.com/firebasejs/6.1.1/firebase-auth.js");
importScripts("https://www.gstatic.com/firebasejs/6.1.1/firebase-database.js");
*/

var firebaseConfig = {
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
  
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();



// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    //var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    
    //var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);
    /*
    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }else if(userSurname === ""){
        return checkUserSurname();
    }else if(checkUserEmailValid == null){
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserPassword();
    }else*/{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            /*
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: userFullName,
                userSurname: userSurname,
                userEmail: userEmail,
                userPassword: userPassword,
                userFb: "https://www.facebook.com/",
                userTw: "https://twitter.com/",
                userGp: "https://plus.google.com/",
                userBio: "User biography",
            }
            firebaseRef.child(uid).set(userData);*/
            alert("success signup")
            setTimeout(function(){
                window.location.replace("../races/race_map.html");
            }, 1000);
            
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }
}

// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
    console.log("bibi2");
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    console.log(userSIEmail);
    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);
/*
    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else*/{
        console.log("bibi");
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
        alert("Succesfully signed in");
        
        setTimeout(function(){
            window.location.replace("../races/addrace.html");
        }, 1000);
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
           
            alert(errorMessage);
        });
    }
/*
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            alert("xxxxxxxxxxx");
            document.location = "/races/addrace.html";
        });        
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
*/

}


// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert("Signed Out");
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        alert( errorMessage);
    });
}


function addRace()
{
    let raceName = document.getElementById("raceName").value;
    let raceDescription = document.getElementById("raceDescription").value;
    let imagePath = document.getElementById("imagePath").value;
    let eventday = document.getElementById("eventday").value;
    let startdttm = document.getElementById("startdttm").value;
    let capactity = document.getElementById("capactity").value;
    let distance = document.getElementById("distance").value;
    let startLatLng = document.getElementById("startLatLng").value;
    let gpxFile = document.getElementById("gpxFile");
    console.log( raceName );
    
    let user = firebase.auth().currentUser;
    let uid ="";
    if(user != null){
        uid = user.uid;
        console.log(uid);
    }
    let isOpen=true;
    var raceData = {
        raceName:raceName,
        raceDescription:raceDescription,
        imagePath:imagePath,
        eventday:eventday,
        startdttm:startdttm,
        capactity:capactity,
        distance:distance,
        startLatLng:startLatLng,
        gpxFile: gpxFile,
        uid:uid, 
        isOpen:isOpen
    };
    
    // Get a key for a new race.
    var firebaseRef2 = firebase.database().ref();
    var newRaceKey2 = firebaseRef2.child('races').push().key;
    //alert(newRaceKey2);
    var updates2 = {};
    updates2['/races/' + newRaceKey2] = raceData;
    firebaseRef2.update(updates2);
      
    setTimeout(function(){
        window.location.replace("../races/races.html");
    }, 1000);

  }
  
  

  function getRacesForList()
  {
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        console.log(uid);
    }
    console.log(uid);
    var query = firebase.database().ref("races");
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          addItem( childSnapshot.key ,childSnapshot.val() );

      });
    });
    
  }

  function getRacesForMap()
  {
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        console.log(uid);
    }
    console.log(uid);
    var query = firebase.database().ref("races");
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            setRacesMarker( childSnapshot.key ,childSnapshot.val());
      });
    });
  }

  function loadRaces()
  {
    getRacesForList();
    //getRacesForMap();
    document.getElementById("defaultOpen").click();
  }

  function getRace(raceID)
  {
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
    }
    var query = firebase.database().ref("races/" + raceID);
    query.once("value")
      .then(function(snapshot) {
          console.log(snapshot.val());
          setContent(snapshot.val());
      });
  }



  function queryRaceName( raceName )
  {
    console.log(raceName);
    var query = firebase.database().ref("races");
    query.orderByChild('raceName').startAt(raceName).on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            setDropList( childSnapshot.key ,childSnapshot.val());
      });
    });
  }

  function addRegistear(raceId)
    {
        let user = firebase.auth().currentUser;
        let uid ="";
        if(user != null){
            uid = user.uid;
            console.log(uid);
        }
        var registerData = {
            raceId:raceId,
            uid:uid
        };
        console.log(raceId);
        // Get a key for a new race.
        var firebaseRef = firebase.database().ref();
        var newKey = firebaseRef.child('registers').push().key;
        console.log(newKey);
        var updates = {};
        updates['/registers/' + newKey] = registerData;
        firebaseRef.update(updates);
    

    }

    function inviteRace(raceId, followId)
    {
        let user = firebase.auth().currentUser;
        let uid ="";
        if(user != null){
            uid = user.uid;
            console.log(uid);
        }
        var inviteData = {
            raceId:raceId,
            uid:uid,
            followId: followId,
            isAccept: false
        };
        
        // Get a key for a new race.
        var firebaseRef = firebase.database().ref();
        var newKey = firebaseRef.child('invites').push().key;
        var updates = {};
        updates['/invites/' + newKey] = inviteData;
        firebaseRef.update(updates);
    

    }
