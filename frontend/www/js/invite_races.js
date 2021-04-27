 var invites_list = document.getElementById("invites_list");
 var invites_list_html = '';
 var divIndex = 0;

 var activities_list = document.getElementById("activities_list");
 var activities_list_html = '';

 function getInvitesInfo()
 {
    var isLoading = true; 
    loading('Please wait...');
    getInviteRaces( function(snapRace, snapProfile) {
         var profileData = snapProfile.val();
         var followName = profileData.firstName + ' ' + profileData.lastName ;
         
         var raceData = snapRace.val();
         divIndex += 1;
         console.log( divIndex);

         invites_list_html += '<div class="list radius shadow" id="invite' + divIndex + '">'  +
                '<div class="item no-border">' + 
                '<div class="left">' + 
                '    <img class="avatar circle" style="width:64px;height:64px;" src="' + profileData.profileImg + '">' +
                '</div>' + 
                '<h2 class="text-strong"><a class="article-title" href="../people/searchprofile.html?id=' + snapProfile.key + '">' + followName + '</a></h2>' +
                '<p class="text-grey">Invite you</p>' + 
                '</div>' + 

                '<div class="item no-border cover radius" style="background-image:url(' + raceData.imagePath + ')" onclick="document.location=\'../races/race_detail.html?id=' + snapRace.key + '\'"  >' + 
                '<div class="text-small gradient bottom padding text-white text-light radius">' + 
                '<span class="amber-300 radius padding text-big text-strong">' + raceData.raceName + '</span>' + raceData.eventday +
                '</div>' + 
                '</div>' + 
                '<div class="item no-border row align-center">' + 
                '<div class="col " id="delete'+ divIndex + '" onClick="onDelete( \'' + divIndex + '\',\'' + snapProfile.key + '\')">' +
                '   <button class="blue small radius">Remove</button>' + 
                '</div>' + 
                '<div class="col text-red" id="register'+ divIndex + '" onClick="onRegister( \'' + divIndex + '\',\'' + snapRace.key  + '\',\'' + snapProfile.key + '\')">' +
                '    <button class="blue small radius">Register</button> ' + 
                '</div>' + 
                '</div>' +
                '</div>';

              
                invites_list.innerHTML = invites_list_html;
                if( isLoading ){
                    closeLoading();
                    isLoading = false;
                   }
               
     });
     setTimeout( function(){
      if( isLoading ){
        closeLoading();
        isLoading = false;
       }
      }, 3000);
 }


 function onRegister( index, raceId , peopleId){
    addRegister( raceId );
    removeInvite( peopleId );

    /* var status = document.getElementById('register' + index);
    status.innerHTML = '<div class="right" id="status'+ index + '" >' +
                        '   Registered' +
                        '</div>' ; */
    document.getElementById('invite' + index).innerHTML = "";

}

function onDelete( index, peopleId ){
    removeInvite( peopleId );
   /*  var status = document.getElementById('delete' + index);
    status.innerHTML = '<div class="right" id="delete'+ index + '" >' +
                        '   Removed' +
                        '</div>' ; */
    document.getElementById('invite' + index).innerHTML = "";

}
