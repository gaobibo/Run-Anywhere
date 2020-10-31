
function openPage(pageName, elmnt) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    elmnt.style.backgroundColor = 'green';
}
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

function handleClickEvent()
{
    
}

function setDropList(raceId, raceData )
{
    div = document.getElementById("myDropdown");

    var a = document.createElement("a");
    a.appendChild(document.createTextNode(raceData.raceName));
    a.setAttribute("href", "race_detail.html?id=" + raceId);
    div.appendChild(a);
}

function filterFunction() {
    div = document.getElementById("myDropdown");
    div.innerHTML = "";
    div.classList.toggle("show");
    
    var input, filter, ul, li, a, i;
    input = document.getElementById("listSearch");
    filter = input.value;//.toUpperCase(); 
    queryRaceName(filter);
    
  }




function addItem(raceId, raceData){
    console.log(raceData);
    var ul = document.getElementById("dynamic-list");
    
    var li = document.createElement("li");
    console.log(raceId);
    li.setAttribute("id", raceId);
    

    var img = document.createElement("img");
    img.setAttribute('src',raceData.imagePath);
    var name = document.createElement("h3");
    name.appendChild(document.createTextNode(raceData.raceName));
    var event = document.createElement("p");
    event.appendChild(document.createTextNode(raceData.eventday));

    li.addEventListener('click', function () {
        var id = li.getAttribute("id");
        console.log(id);
        
        setTimeout(function(){
            window.location.replace("race_detail.html?id=" + id);
        }, 1000);
    });

    li.appendChild(img);
    li.appendChild(name);
    li.appendChild(event);
    ul.appendChild(li);
}

function removeItem(){
    /*
    var ul = document.getElementById("dynamic-list");
    
    var item = document.getElementById(li.value);
    ul.removeChild(item);*/
}