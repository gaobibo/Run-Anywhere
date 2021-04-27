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

let userLoaded = false;
function getCurrentUser(auth) {
  return new Promise((resolve, reject) => {
     if (userLoaded) {
          resolve(firebase.auth().currentUser);
     }
     const unsubscribe = auth.onAuthStateChanged(user => {
        userLoaded = true;
        unsubscribe();
        resolve(user);
     }, reject);
  });
}


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
            addUpdateProfile();
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
        
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
            console.log(uid);
        }
        alert("Succesfully signed in");
        setTimeout(function(){
            window.location.replace("../races/races_map.html");
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
            document.location = "../races/addrace.html";
        });        
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
*/

}

function redirectToLogIn()
{
    setTimeout(function(){
        window.location.replace("../auth/LoginApp.html");
    });
}

// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        redirectToLogIn();
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        alert( errorMessage);
    });
}


 


function addUpdateRace(raceId, raceName, raceDescription, 
    imagePath, eventday,startdttm,capacity, distance, startLatLng, gpxFile, isOpen )
{
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
        
        // Get a key for a new race.
        var firebaseRef2 = firebase.database().ref();
        var newRaceKey2 = "";
        if(raceId == null ){
            newRaceKey2 = firebaseRef2.child('races').push().key;
        }
        else{
            newRaceKey2 = raceId;
        }

        
            //uploadRaceKML( platformString, newRaceKey2, gpxFile, urlGpx =>{
                
                /*console.log( urlGpx );
                if( urlGpx == "fail" )
                {
                    urlGpx = "https://gaobibo.github.io/2017chickenrun.kml";
                }*/
            
                var raceData = {
                    raceName:raceName,
                    raceDescription:raceDescription,
                    imagePath: imagePath,
                    eventday:eventday,
                    startdttm:startdttm,
                    capactity:capacity,
                    distance:distance,
                    regopendate :'',
                    regclosedate : '',  
                    startLatLng:startLatLng,
                    gpxFile: gpxFile,
                    uid:uid, 
                    isOpen:isOpen
                };
                //alert(newRaceKey2);
                var updates2 = {};
                updates2['/races/' + newRaceKey2] = raceData;
                firebaseRef2.update(updates2);

        //   }); 
        }
        else redirectToLogIn();
    });
    
  }

  function addProfileForTest( profileImg,
    firstName, lastName, email, gender, birthdate, phone ){

    var profileData = {
        profileImg: profileImg,
        firstName:firstName,
        lastName:lastName,
        email:email,
        gender:gender,
        birthdate:birthdate,
        phone:phone,
        address1:'',
        address2:'',
        city: '',
        state:'', 
        zipcode:'',
        organization:'',
        club:'',
        emergName:'',
        emergPhone :''
    };
    
    // Get a key for a new race.
    var firebaseRef = firebase.database().ref();
    newKey = firebaseRef.child('profiles').push().key;
    console.log(newKey);
    var updates = {};
    updates['/profiles/' + newKey] = profileData;
    firebaseRef.update(updates);
  }


  function addUpdateProfile( profileImg,
    firstName, lastName, email, gender, birthdate, phone ){

    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
    
        var profileData = {
            profileImg: profileImg,
            firstName:firstName,
            lastName:lastName,
            email:email,
            gender:gender,
            birthdate:birthdate,
            phone:phone,
            address1:'',
            address2:'',
            city: '',
            state:'', 
            zipcode:'',
            organization:'',
            club:'',
            emergName:'',
            emergPhone :''
        };
        
        // Get a key for a new race.
        var firebaseRef = firebase.database().ref();

        var updates = {};
        updates['/profiles/' + uid] = profileData;
        firebaseRef.update(updates);
        }
        else redirectToLogIn();
    });
  }

  function addFollow( peopleId ){
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
        var fellowData = {
            uid:uid,
            followId:peopleId
        };
        
        // Get a key for a new race.
        var firebaseRef = firebase.database().ref();
        var newKey = firebaseRef.child('follows').push().key;
        console.log(newKey);
        var updates = {};
        updates['/follows/' + newKey] = fellowData;
        firebaseRef.update(updates);
        }
        else redirectToLogIn();
    });
  }


  function addRunnerRegister(uid, raceId) //for test
  {
        var registerData = {
            raceId:raceId,
            uid:uid,
            tshirtsize:'',
            bibnumber:'',
            chipnumber:'',
            finishedtime:'00:00:00',
            finisheddistance:0
        };
        console.log(raceId);
        // Get a key for a new race.
        var firebaseRef = firebase.database().ref();
        var newKey = firebaseRef.child('participates').push().key;
        console.log(newKey);
        var updates = {};
        updates['/participates/' + newKey] = registerData;
        firebaseRef.update(updates);
  }

  function addRegister(raceId)
  {
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;

            var registerData = {
                raceId:raceId,
                uid:uid,
                tshirtsize:'',
                bibnumber:'',
                chipnumber:'',
                finishedtime:'00:00:00',
                finisheddistance:0
            };
            console.log(raceId);
            // Get a key for a new race.
            var firebaseRef = firebase.database().ref();
            var newKey = firebaseRef.child('participates').push().key;
            console.log(newKey);
            var updates = {};
            updates['/participates/' + newKey] = registerData;
            firebaseRef.update(updates); 
        }
        else redirectToLogIn();
    });
  }

  function updatePanticipateInfo(raceId, panticipateId, finishedtime, finisheddistance)
  {
        var PanticipateInfo = {
            raceId:raceId,
            uid:panticipateId,
            tshirtsize:'',
            bibnumber:'',
            chipnumber:'',
            finishedtime:finishedtime,
            finisheddistance:finisheddistance
        };
        console.log(raceId);
        // Get a key for a new race.
        var firebaseRef = firebase.database().ref();
        var participatesRef = firebaseRef.child("participates");


        participatesRef.orderByChild("uid").equalTo(panticipateId).on('child_added', function(snapshot) { 
            if( snapshot.val().raceId == raceId ){
                var updates = {};
                console.log("updatePanticipateInfo" + snapshot.key);
                var distance = parseInt( finisheddistance ) + "Miles";
                if( finisheddistance == "26.2" ){
                    distance ="Marathon";
                }else if ( finisheddistance == "13.1" ){
                    distance ="Half Marathon";
                }else if ( finisheddistance == "3.1" ){
                    distance ="5K";
                }
                
                firebaseRef.child( "profiles/" + panticipateId + "/records/" + distance).once("value", recordInfo =>{
                    
                    if(recordInfo == null || recordInfo > finishedtime ){
                        updates['/profiles/' +  panticipateId + "/records/" + distance] = finishedtime;
                        console.log( finishedtime );
                    }
                    updates['/participates/' + snapshot.key] = PanticipateInfo;
                    firebaseRef.update(updates);
                });
               
            }      
        });
        
        
  }

  function updateMyResultInfo(raceId, finishedtime, finisheddistance)
  {
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
            console.log( raceId + uid + finishedtime + finisheddistance );
            updatePanticipateInfo(raceId, uid, finishedtime, finisheddistance);
        }
        else redirectToLogIn();
        });
    }

  function inviteRace(raceId, peopleId)
  {
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;

        var inviteData = {
            raceId:raceId,
            uid:uid,
            followId: peopleId,
            isAccept: false
        };
        
        // Get a key for a new race.
        var firebaseRef = firebase.database().ref();
        var newKey = firebaseRef.child('invites').push().key;
        var updates = {};
        updates['/invites/' + newKey] = inviteData;
        firebaseRef.update(updates);
    }
    else redirectToLogIn();
    });
   }


  

   function deleteRace(raceId){
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
            var raceRef = firebase.database().ref("races/" + raceId );
            raceRef.remove();
        }
        else redirectToLogIn();
        });
   }

   function cancelRegister(raceId){
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
            var firebaseRef = firebase.database().ref();
            var participatesRef = firebaseRef.child("participates");
            participatesRef.orderByChild("uid").equalTo(uid).once("value", function(snapshot) {
                snapshot.forEach( childSnapshot => {
                    if( childSnapshot.val().raceId == raceId )
                        participatesRef.child("participates/" + childSnapshot.key).remove();
                    });
                }); 
            }
            else redirectToLogIn();
            });
   
   }

   function Unfollow(peopleId){
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
            var firebaseRef = firebase.database().ref();
            var fellowsRef = firebaseRef.child("follows");
            fellowsRef.orderByChild("uid").equalTo(uid).once("value", function(snapshot) {
                snapshot.forEach( childSnapshot => {
                    if( childSnapshot.val().followId == peopleId )
                    fellowsRef.child("follows/" + childSnapshot.key).remove();
                    });
                }); 
            }
            else redirectToLogIn();
            });
   }

   function removeInvite(peopleId){
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
            var firebaseRef = firebase.database().ref();
            var invitesRef = firebaseRef.child("invites");
            invitesRef.orderByChild("followId").equalTo(uid).once("value", function(snapshot) {
                snapshot.forEach( childSnapshot => {
                    if( childSnapshot.val().uid == peopleId )
                    fellowsRef.child("invites/" + childSnapshot.key).remove();
                    });
                }); 
            }
            else redirectToLogIn();
            });
   }


  function getRaces(cb)
  {

    var query = firebase.database().ref("races");
    query.once("value", function(snapshot) {
        snapshot.forEach(cb);
    });
  }

  function getRaces3(cb)
  {
    var query = firebase.database().ref("races");
    query.orderByChild("eventday").once("value", cb);
  }

  function getRacesForShowing3()
  {
    getRaces3( snapshot => {
        snapshot.forEach(function(childSnapshot) {
          addItem( childSnapshot.key ,childSnapshot.val() );
          //setRacesMarker( childSnapshot.key ,childSnapshot.val());

      });
    });
    
  }
  
  function getRacesForShowing2()
  {

    var query = firebase.database().ref("races");
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          addItem( childSnapshot.key ,childSnapshot.val() );
          //setRacesMarker( childSnapshot.key ,childSnapshot.val());

      });
    });
    
  }

  function getRacesForMap()
  {
    var query = firebase.database().ref("races");
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            setRacesMarker( childSnapshot.key ,childSnapshot.val());
      });
    });
  }

 

  function getRace2(raceID)
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

  function getRace(raceID, cb)
  {
    var query = firebase.database().ref("races/" + raceID);
    query.once("value", cb);
  }

  function getProfile(profileId, cb)
  {
    var query = firebase.database().ref("profiles/" + profileId);
    query.once("value", cb);
  }

  function getMyProfile(cb)
  {
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
            //console.log( user );
            
            var query = firebase.database().ref("profiles/" + uid);
            query.once("value", snap => {
                if( snap.val() == null ){
                    
                    var firstName = "anonymous";
                    var lastName = "";
                    var email = "(anonymous)";
                    var photoURL = "../img/default-profile.png";
                    if( user.displayName != null){
                        var name = user.displayName.split(' ');
                        firstName = name[0];
                        lastName = name[1];
                    }
                    if( user.email != null){
                        email = user.email;
                    }
                    if( user.photoURL != null){
                        photoURL = user.photoURL;
                    }
                    addUpdateProfile( photoURL, firstName, lastName, email,"","","" );
                    query.once( "value", cb);
                }
                else{
                    cb( snap );
                }
            });
        }
        else redirectToLogIn();
    });
    
  }


  function getStatInfo( peopleId, cb )
  {
    
    var raceCount = 0;
    var raceDistance = 0;
    var raceTime = "00:00:00"; 
    var seconds = 0 ;
    var minutes = 0;
    var hours = 0 ;
   
    var firebaseRef = firebase.database().ref();
    var participatesRef = firebaseRef.child("participates");
    var profileRef = firebaseRef.child("profiles");
    participatesRef.orderByChild("uid").equalTo(peopleId).once("value", snap => {
        snap.forEach( childSnapshot =>{
            
            var arrTime = childSnapshot.val().finishedtime.split(":");
            if( arrTime.length > 2 ){
                raceCount += 1;
                raceDistance += parseFloat( childSnapshot.val().finisheddistance);
                seconds += parseInt( arrTime[2] ) ;
                minutes += parseInt(  arrTime[1] ) + (( seconds / 60 ) | 0) ;
                hours += parseInt( arrTime[0] ) + (( minutes / 60) |0) ;
                console.log( hours + ":" + minutes + ":" + seconds  );
            }
           
        });

        raceTime = hours + ":" + ( minutes % 60 ) + ":" + ( seconds % 60 );
        profileRef.child( peopleId + "/records" ).once('value', recodesInfo=>{
            console.log( recodesInfo );/*
            var statInfoData = {
                raceCount: raceCount,
                raceDistance: raceDistance,
                raceTime: raceTime,
                records: recodesInfo.val()
            };*/
            cb( raceCount, raceDistance, raceTime, recodesInfo.val() );
        });
        
      });

  }


  function getMyStat(cb)
  {
    getCurrentUser( firebase.auth() ).then(function(user){
        if(user) {
            let uid = user.uid;
            getStatInfo( uid, cb);
        }
        else redirectToLogIn();
        });
  }

  function getRaceByName( raceName, cb )
  {
    console.log(raceName);
    var query = firebase.database().ref("races");
    query.orderByChild('raceName').equalTo(raceName).once("value", function(snapshot) {
        snapshot.forEach(cb);
    });
  }

  

    function getFollows(cb)
    {
        getCurrentUser( firebase.auth() ).then(function(user){
            if(user) {
                let uid = user.uid;
                var query = firebase.database().ref("follows");
                query.orderByChild("uid").equalTo(uid).once("value", snap => {
                    snap.forEach( childSnapshot =>{
                        console.log(childSnapshot.val().followId);
                        firebase.database().ref("profiles/" + childSnapshot.val().followId ).once("value",function(snapshot){
                            console.log( snapshot.val());
                            cb(snapshot);
                        });
                    });
                    
                });
            }
            else redirectToLogIn();
            });

    }


    function getFollowsActivities(cb)
    {
        getCurrentUser( firebase.auth() ).then(function(user){
            if(user) {
                let uid = user.uid;

                firebase.database().ref("races").orderByChild("eventday").once("value", snapshot =>{
                    snapshot.forEach( childSnapshotRace=>{

                        firebase.database().ref("follows").orderByChild("uid").equalTo(uid).once("value", snapFollow => {
                            snapFollow.forEach( childSnapshotFollow =>{
                                firebase.database().ref("participates").orderByChild("raceId").equalTo(childSnapshotRace.key).once("value", snapParticipate => {
                                    snapParticipate.forEach( childSnapshotParticipate =>{
                                        if( childSnapshotFollow.val().followId == childSnapshotParticipate.val().uid )
                                        {
                                            firebase.database().ref("profiles/" + childSnapshotFollow.val().followId ).once("value",function(snapProfile){
                                                
                                                cb(childSnapshotRace, snapProfile, childSnapshotParticipate);
                                            });
                                        }
                                    });
                                });        
                            });
                        });
                    });
                });
            }
            else redirectToLogIn();

        });
    }

    function getInviteRaces( cb )
    {
     getCurrentUser( firebase.auth() ).then(function(user){
         if(user) {
             let uid = user.uid;
             var query = firebase.database().ref("invites");
             var profilesRef = firebase.database().ref("profiles");
             var racesRef = firebase.database().ref("races");
             query.orderByChild("followId").equalTo(uid).once( "value", snap =>{
                snap.forEach(childSnapshot=>{
                    if( !childSnapshot.val().isAccept){
                        racesRef.child( childSnapshot.val().raceId).once( "value", snapRace =>{
                            profilesRef.child( childSnapshot.val().uid).once( "value", snapProfile=>{
                                cb(snapRace, snapProfile );
                            });
                        });
                    }
                });
            });
        }
     else redirectToLogIn();
     });
    }



    function isInvited( raceId, followId, cb){
        getCurrentUser( firebase.auth() ).then(function(user){
            if(user) {
                let uid = user.uid;

                var query = firebase.database().ref("invites");
                var invited = false;
                query.orderByChild("uid").equalTo(uid).once( "value", snap =>{
                    snap.forEach(childSnapshot=>{
                        console.log(childSnapshot.val().followId + ' ' + childSnapshot.val().raceId);
                        if( childSnapshot.val().followId == followId && childSnapshot.val().raceId == raceId ){
                            console.log("invited");
                            invited = true;
                        }
                    });
                    cb(invited);
                });
            }
            else redirectToLogIn();
            });
        
    }

    function isFollowed( followId, cb){
        getCurrentUser( firebase.auth() ).then(function(user){
            if(user) {
                let uid = user.uid;

                var query = firebase.database().ref("follows");
                var followed = false;
                query.orderByChild("uid").equalTo(uid).once( "value", snap =>{
                    snap.forEach(childSnapshot=>{
                        if( childSnapshot.val().followId == followId ){
                            console.log("invited");
                            followed = true;
                        }
                    });
                    cb(followed);
                });
            }
            else redirectToLogIn();
            });
        
    }



    function getUninvitedFollows(raceId, cb)
    {
        getCurrentUser( firebase.auth() ).then(function(user){
            if(user) {
                let uid = user.uid;
                var query = firebase.database().ref("follows");
                var profilesRef = firebase.database().ref("profiles");
                query.orderByChild("uid").equalTo(uid).on("child_added", snap => {
                    if( !isInvited(raceId,snap.val().followId ) ){
                        let profileRef = profilesRef.child( snap.val().followId );
                        profileRef.once("value",cb);
                    }
                    
                });
            }
            else redirectToLogIn();
            });

    }

    function getMyRaces(cb){
        getCurrentUser( firebase.auth() ).then(function(user){
            if(user) {
                let uid = user.uid;
     
                getRegisterRaces(uid, cb);
            }
            else redirectToLogIn();
            });
    }
    
    function getMyRacesByEventday(cb){
        getCurrentUser( firebase.auth() ).then(function(user){
            if(user) {
                let uid = user.uid;
     
                getRegisterRacesByEventDay(uid, cb);
            }
            else redirectToLogIn();
            });
    }


    function getMyCreateRaces(cb){
        getCurrentUser( firebase.auth() ).then(function(user){
            if(user) {
                let uid = user.uid;
                var firebaseRef = firebase.database().ref();
                var racesRef = firebaseRef.child("races");
                racesRef.orderByChild("uid").equalTo(uid).once("value", function(snapshot) {
                    snapshot.forEach( cb );
                });
            }
            else redirectToLogIn();
            });
    }

    function isMyRegisterRace( raceId,cb ){
        getCurrentUser( firebase.auth() ).then(function(user){
            if(user) {
                let uid = user.uid;
            var firebaseRef = firebase.database().ref();
            var participatesRef = firebaseRef.child("participates");
            var isRegister = false;
            var result = "00:00:00";
            participatesRef.orderByChild("uid").equalTo(uid).once("value", snap => {
                snap.forEach( childSnapshot =>{
                    if( raceId == childSnapshot.val().raceId ){
                        isRegister = true;
                        result = childSnapshot.val().finishedtime;
                    }
                });

                cb(isRegister, result);
                
            });
        }
        else redirectToLogIn();
        });
    }

    function getRegisterRacesByEventDay(peopleId, cb){

        console.log(peopleId);
        
        var firebaseRef = firebase.database().ref();
        var participatesRef = firebaseRef.child("participates");
        var racesRef = firebaseRef.child("races");
        racesRef.orderByChild("eventday").once("value", function(snapshot) {
            snapshot.forEach( childSnapshotRace => {
                participatesRef.orderByChild("uid").equalTo(peopleId).once("value", function(snapshot2){
                    snapshot2.forEach( childSnapshotParticipate => {
                        if( childSnapshotRace.key == childSnapshotParticipate.val().raceId )
                            cb(childSnapshotRace,childSnapshotParticipate);
                    })
                    
                });
            });
        });
    }


    function getRegisterRaces(peopleId, cb){
     
        var firebaseRef = firebase.database().ref();
        var participatesRef = firebaseRef.child("participates");
        var racesRef = firebaseRef.child("races");
        participatesRef.orderByChild("uid").equalTo(peopleId).on("child_added", snap => {
            let raceRef = racesRef.child( snap.val().raceId );
            raceRef.once('value',cb);
          });
    }

    function getRaceRegisters(raceId, cb){
        
        var firebaseRef = firebase.database().ref();
        var participatesRef = firebaseRef.child("participates");
        var profilesRef = firebaseRef.child("profiles");
        participatesRef.orderByChild("raceId").equalTo(raceId).on("child_added", snap => {
            let profileRef = profilesRef.child( snap.val().uid );
            profileRef.once('value',cb);
          });
    }


    function getRaceResults(raceId, cb){
        
        var firebaseRef = firebase.database().ref();
        var participatesRef = firebaseRef.child("participates");
        var profilesRef = firebaseRef.child("profiles");
        participatesRef.orderByChild("raceId").equalTo(raceId).once("value", function(snapshot) {
            snapshot.forEach( childSnapshot => {
                profilesRef.child( childSnapshot.val().uid ).once('value', function(participate){
                    
                    cb(childSnapshot, participate);
                });
            });
        });
    }

    function getPeopleResults(peopleId, cb){
        
        var firebaseRef = firebase.database().ref();
        var participatesRef = firebaseRef.child("participates");
        var racesRef = firebaseRef.child("races");
        participatesRef.orderByChild("uid").equalTo(peopleId).once("value", function(snapshot) {
            snapshot.forEach( childSnapshot => {
                racesRef.child( childSnapshot.val().raceId ).once('value', function(racesnap){
                    if( childSnapshot.val().finishedtime != null && childSnapshot.val().finishedtime  != "00:00:00")
                    cb(childSnapshot, racesnap);
                });
            });
        });
    }



    function searchRaceByName( raceName, cb){

        var firebaseRef = firebase.database().ref();
        var racesRef = firebaseRef.child("races");
      

        racesRef.orderByChild("raceName").startAt(raceName.toString().toUpperCase())
            .endAt(raceName.toString().toLowerCase()+"\uf8ff").once("value", function(snapshot) {
                snapshot.forEach( childSnapshot => {
                    if( childSnapshot.val().raceName.toString().toUpperCase().includes(raceName.toString().toUpperCase()) )
                        cb(childSnapshot);
            });
        });   
    }

    function searchRaceByFilter( raceDistanceMin, raceDistanceMax, raceMonthMin, raceMonthMax,cb ){
        var firebaseRef = firebase.database().ref();
        var racesRef = firebaseRef.child("races");
        
        racesRef.orderByChild("distance").startAt(raceDistanceMin).endAt(raceDistanceMax).once("value", function(snapshot) {
            snapshot.forEach(childSnapshot => {
                console.log( childSnapshot.val() );
                var arr = childSnapshot.val().eventday.split("-");
                var month = parseInt(arr[1], 10);
                console.log( month );
                if( month > raceMonthMin && month < raceMonthMax ){
                    
                    cb(childSnapshot);
                }
            });
        });   
    }

    function searchRaceByDistanceDate( raceDistanceMin, raceDistanceMax, raceDateFrom, raceDateTo,cb ){
        var firebaseRef = firebase.database().ref();
        var racesRef = firebaseRef.child("races");
        
        racesRef.orderByChild("distance").startAt(raceDistanceMin).endAt(raceDistanceMax).once("value", function(snapshot) {
            snapshot.forEach(childSnapshot => {
           
                if( childSnapshot.val().eventday > raceDateFrom && raceDateTo > childSnapshot.val().eventday ){
                    
                    cb(childSnapshot);
                }
            });
        });   
    }


    function searchRaceByLocation(raceLocationRangeStart, raceLocationRangeEnd,  cb){

        var firebaseRef = firebase.database().ref();
        var racesRef = firebaseRef.child("races");
        
        racesRef.orderByChild("startLatLng").startAt(raceLocationRangeStart).endAt(raceLocationRangeEnd).once("value", function(snapshot) {
            snapshot.forEach(cb);
        });   

    } 

   

    function searchPeopleByName( peopleName,  cb ){
        var firebaseRef = firebase.database().ref();
        var profilesRef = firebaseRef.child("profiles");
        
        var arr = peopleName.split(' ');
        var firstName = arr[0];
        var lastName = "";
        if(arr.length > 1 ){
            lastName = arr[1];
        }
        
        profilesRef.orderByChild("firstName").startAt(firstName)
            .endAt(firstName+"\uf8ff").on("child_added", snap => {
            if( lastName == "" || snap.val().lastName.includes(lastName) ){
                cb(snap);                
            };           
          });
        
        if( lastName == ""){
            profilesRef.orderByChild("lastName").startAt(firstName)
            .endAt(firstName+"\uf8ff").on("child_added", snap => {
                cb(snap);                         
        });

        }
        
    }

    function searchPeopleByFilter(  peopleGender,  peopleBirthMin, peopleBirthMax, cb ){
        var firebaseRef = firebase.database().ref();
        var profilesRef = firebaseRef.child("profiles");
        
        profilesRef.orderByChild("birthdate").startAt(peopleBirthMin).endAt(peopleBirthMax).on("child_added", snap => {
            if( peopleGender=="" || snap.val().gender == peopleGender){
                cb(snap);   
            };
          });
    }


    function searchPeopleByGenderAge(  gender,  ageMin, ageMax, cb ){

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear() ;

        var peopleBirthMin = yyyy - ageMax + '-' + mm + '-' + dd;
        var peopleBirthMax = yyyy - ageMin + '-' + mm + '-' + dd;
        searchPeopleByFilter( gender, peopleBirthMin, peopleBirthMax, cb );
        
    }

   
    testAPI();

    function testAPI(){
        
        console.log("testAPI");
        /*
        addUpdateRace(null, "Chicago Marathon", "", "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Chicago_Marathon_logo_%28gradient%29.svg/1200px-Chicago_Marathon_logo_%28gradient%29.svg.png",
        "2020-10-14", "08:00 AM", "60000", "26.2", "42.189, -87.93",  "https://gaobibo.github.io/2017chickenrun.kml", true);

     
        addUpdateRace(null, "Kettle Moraine", "", "https://d368g9lw5ileu7.cloudfront.net/races/race85674-social382x200.bElg-6.jpg",
        "2021-06-01", "06:00 AM", "400", "100", "42.191, -87.92",  "https://gaobibo.github.io/2017chickenrun.kml", true);

        addUpdateRace(null, "Indiana100", "", "https://static1.squarespace.com/static/5b8d4be355b02c6a091b6760/t/5bc913418165f53f52c6c553/1598318875267/?format=1500w",
        "2020-10-14", "06:00 AM", "1000", "100", "42.192, -87.91",  "https://gaobibo.github.io/2017chickenrun.kml", true);

        addUpdateRace(null, "Hard Rock 100", "", "https://pbs.twimg.com/profile_images/2419623856/5pnd61mlmf4lspptaudc.gif",
        "2020-10-14", "06:00 AM", "345", "100", "42.188, -87.89",  "https://gaobibo.github.io/2017chickenrun.kml", true);

        addUpdateRace(null, "Western 100", "", "https://upload.wikimedia.org/wikipedia/en/4/42/Western_States_Endurance_Run_patch.png",
        "2020-10-14", "05:00 AM", "234", "100", "42.188, -87.90",  "https://gaobibo.github.io/2017chickenrun.kml", true);

        addUpdateRace(null, "Vermont 100", "", "https://runningoffthebeatenpath.files.wordpress.com/2014/09/vermont-logo.jpg",
        "2020-10-14", "04:00 AM", "2000", "100", "42.189, -87.89",  "https://gaobibo.github.io/2017chickenrun.kml", true);

        addUpdateRace(null, "Boston Marathon", "", "https://raceraves.com/wp-content/uploads/2016/05/Boston-Marathon-logo.jpg",
        "2020-10-14", "08:00 AM", "5000", "26.2", "42.189, -87.88",  "https://gaobibo.github.io/2017chickenrun.kml", true);
*/
/*
        addUpdateProfile("default_profile.png", "Bibo", "Gao", "test3@test.com","F","1999-12-08","1111111111");
        addProfileForTest("default_profile.png","Robert","Jimmy", "test3@test.com","M","1989-04-08","1234567890");
        //getProfile( snap => console.log(snap.val()));
        //addFollow("ML5b7AgahwMozDwOXPn");
        //Unfollow();

        addProfileForTest("default_profile.png","James","Kenny", "test3@test.com","M","1990-08-08","8888888888");
        addProfileForTest("default_profile.png","Mikki","Shao", "test3@test.com","F","1995-08-18","54546556656");
*/
        //getRegisterRaces("hAzCSU3lGVhj5hhGrdPrViIF22l1", snap =>  console.log(snap.val()));
        
        //getMyRaces( snap => console.log(snap.val()));
        //getMyCreateRaces( snap => console.log(snap.val()));
        
        /*
        searchRaceByDistance("5","100", snap => console.log(snap.val()));
        getFollows(snap => console.log(snap.val()));
        searchPeopleByName("Bibo","Gao", snap => console.log(snap.val()));*/
        //inviteRace("MJxxESa1SpS-6mHlv6N","ML5b7AgahwMozDwOXPn");

        /*
        updatePanticipateInfo("-MJxxESa1SpS-6mHlv6N","hAzCSU3lGVhj5hhGrdPrViIF22l1", "3:00:51", "");
        updatePanticipateInfo("-MJynGHzRnh63CuTkrmS","hAzCSU3lGVhj5hhGrdPrViIF22l1", "3:00:51", "");

        getRaceResults("-MJxxESa1SpS-6mHlv6N", (resultsnap, profilesnap ) => {
            console.log(profilesnap);
            console.log(profilesnap.val().firstName + " " + profilesnap.val().lastName);
            console.log(resultsnap.val().finishedtime);
            
        });

        getPeopleResults("hAzCSU3lGVhj5hhGrdPrViIF22l1", (resultsnap, racesnap ) => {
            console.log(racesnap.val().raceName );
            console.log(resultsnap.val().finishedtime);
            
        });*/

/*
        addFollow("-MMT6shfN4bTHRQY42p9");
        addFollow("-MMT6shiFADkhtHjkYTb");
        addFollow("-MMT6shjkrTgYAw7TupK");
        */
/*
        addRunnerRegister("-MMT6shfN4bTHRQY42p9","-MMSfXIm8AQx03QN_8HO");
        addRunnerRegister("-MMT6shfN4bTHRQY42p9","-MMSiyEQo0jxGPUGsumi");
        addRunnerRegister("-MMT6shfN4bTHRQY42p9","-MMSiyETRt1RvCCZ8XZ9");
        addRunnerRegister("-MMT6shfN4bTHRQY42p9","-MMSiyEVveUcmRZYbcYs");
        updatePanticipateInfo("-MMSfXIm8AQx03QN_8HO","-MMT6shfN4bTHRQY42p9", "3:45:10","26.2");
        
        updatePanticipateInfo("-MMSiyETRt1RvCCZ8XZ9","-MMT6shfN4bTHRQY42p9","23:32:23","100");

        
        updatePanticipateInfo("-MMSiyEVveUcmRZYbcYs","-MMT6shfN4bTHRQY42p9","33:43:12","100");
        
        getStatInfo( "-MMT6shfN4bTHRQY42p9", function( count, distance, time, records) {
            console.log( count );
            if(records["Marathon"] != null) //Half Marathon, 5K, 100Miles, 50Miles
            {
                console.log(records["Marathon"] );
            }
        } );
*/

/*
        searchRaceByName("Ke",snap => console.log(snap.val().raceName));

        searchRaceByFilter( 50, 100, 1,12,snap => console.log(snap.val()));

        searchPeopleByName("James",snap => console.log(snap.val()));

        searchPeopleByFilter("F", "1988-1-1", "2004-1-1",snap => console.log(snap.val()));

   */     
        
        
    }


