function updateDistanceInput(val){
    document.getElementById('distanceRange').innerHTML = val + " miles";
}

function updateAgeInput(id){
    var minVal = document.getElementById('minRange');
    var maxVal = document.getElementById('maxRange');

    if ((id.localeCompare("minRange") === 0) && (parseInt(minVal.value) > parseInt(maxVal.value) )){
        maxVal.value = minVal.value
    } else if (id.localeCompare("maxRange") === 0 && parseInt(minVal.value) > parseInt(maxVal.value) ){
        minVal.value = maxVal.value
    }

    document.getElementById('ageRange').innerHTML = minVal.value + "-" + maxVal.value;
}