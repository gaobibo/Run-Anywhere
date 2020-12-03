 var follows_list = document.getElementById("follows_list");
 var follows_list_html = '';


 function getFollowList()
 {     
     getFollows(  snapshot => {
         var profileData = snapshot.val();
         console.log(profileData);
         follows_list_html += '<div class="item">' +
                             '<div class="left">' +
                             '    <img class="avatar circle" style="width:64px;height:64px;" src="' + profileData.profileImg + '">' +
                             '</div>' +
                             '<h2 class="text-strong"><a class="article-title text-white" href="../people/searchprofile.html?id=' + snapshot.key + '">' + profileData.firstName + ' ' + profileData.lastName + '</a></h2>' +
                             '<p class="text-grey-700 ellipsis">' + profileData.gender + '</p>' +
                             '</div>';
        console.log(follows_list_html);                    
        follows_list.innerHTML = follows_list_html;
        
     });
     
 }

function openActivity(){
    openTab('tabActivitys');
    document.getElementById("tabActivitys").style.display = "block";
    document.getElementById("tabFollows").style.display = "none";
    
}

function openFollows(){
    openTab('tabFollows');
    document.getElementById("tabActivitys").style.display = "none";
    document.getElementById("tabFollows").style.display = "block";
}

 function getFollowsInfo()
 {
    
    getActivityList();  
    getFollowList();

    document.getElementById("tabActivitys").style.display = "block";
    document.getElementById("tabFollows").style.display = "none";
    
 }

 var activities_list = document.getElementById("activities_list");
 var activities_list_html = '';
 var divIndex = 0;
 function getActivityList()
 {
    var isLoading = true; 
    loading('Please wait...');
     getFollowsActivities( function(childSnapshotRace, snapProfile, childSnapshotParticipate){
         var profileData = snapProfile.val();
         var followName = profileData.firstName + ' ' + profileData.lastName ;
         var resultData = childSnapshotParticipate.val();
         //var result = resultData.finisheddistance + 'Miles    Time:' + resultData.finishedtime ;
         var raceData = childSnapshotRace.val();
         divIndex += 1;
         console.log( divIndex);
         var info = '<p class="text-grey">Registered</p>';
         if( resultData.finisheddistance != "" || resultData.finisheddistance != "0" )
         {
             info  = '<p class="text-grey">'+ resultData.finisheddistance + 'Miles </p>' + 
                '<div class="right text-grey text-small">' + resultData.finishedtime + 
                '     <i class="icon ion-android-time"></i>' + 
                '</div>';
         }

         activities_list_html = '<div class="list radius shadow">' + 
                '<div class="item no-border">' + 
                '<div class="left">' + 
                '    <img class="avatar circle" style="width:64px;height:64px;" src="' + profileData.profileImg + '">' +
                '</div>' + 
                '<h2 class="text-strong"><a class="article-title" href="../people/searchprofile.html?id=' + snapProfile.key + '">' + followName + '</a></h2>' +
                info + 
                '</div>' + 

                '<div class="item no-border cover radius" style="background-image:url(' + raceData.imagePath + ')" onclick="document.location=\'../races/race_detail.html?id=' + childSnapshotRace.key + '\'"  >' + 
                '<div class="text-small gradient bottom padding text-white text-light radius">' + 
                '<span class="amber-300 radius padding text-big text-strong">' + raceData.raceName + '</span>' + raceData.eventday +
                '</div>' + 
                '</div>' + 
                /*
                '<div class="item no-border cover radius" id="map-canvas' + divIndex + '">' + 
                '</div>' + */
                '<div class="item no-border row align-center">' + 
                '<div class="col text-red">' + 
                '    <i class="icon ion-heart"></i>' + (Math.floor(Math.random() * 100) + 1) + 
                '</div>' + 
                '<div class="col text-grey">' + 
                '     <i class="icon ion-chatbox"></i> ' + (Math.floor(Math.random() * 40) + 1) + 
                '</div>' + 
                '<div class="col text-grey">' + 
                '    <i class="icon ion-android-share-alt"></i> ' + (Math.floor(Math.random() * 60) + 1) + 
                '</div>' + 
                '</div>' +
                '</div>' + activities_list_html;

                console.log(activities_list_html);
                activities_list.innerHTML = activities_list_html;
                if( isLoading ){
                    closeLoading();
                    isLoading = false;
                   }
               
               // initMapForId("map-canvas" + divIndex, raceData.gpxFile );
     });

     setTimeout( function(){
      if( isLoading ){
        closeLoading();
        isLoading = false;
       }
      }, 3000);
 }

 function setDropList(profileId, profileData )
{
    div = document.getElementById("myDropdown");

    var a = document.createElement("a");
    a.appendChild(document.createTextNode(profileData.firstName + ' ' + profileData.lastName));
    a.setAttribute("href", "../people/searchprofile.html?id=" + profileId);
    div.appendChild(a);
}



function searchName() {
    div = document.getElementById("myDropdown");
    div.innerHTML = "";
    div.style.display = "block";

    //div.classList.toggle("show");
    
    var input, filter;
    input = document.getElementById("nameSearch");
    filter = input.value;//.toUpperCase(); 
    console.log(filter);
    searchPeopleByName(filter, childSnapshot => {
        setDropList( childSnapshot.key ,childSnapshot.val());
    });
    
  }

 