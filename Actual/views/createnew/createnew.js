function validateForm(){

    let beneficiary = document.forms["myForm"]["beneficiary"].value;
    let eventName = document.forms["myForm"]["eventName"].value;
    let location = document.forms["myForm"]["location"].value;
    let date = document.forms["myForm"]["date"].value;
    let startTime = document.forms["myForm"]["startTime"].value;
    let endTime= document.forms["myForm"]["endTime"].value;

    let checkBeneficiary = false;
    let checkEventName = false;
    let checkLocation = false;
    let checkDate = false;
    let checkStartTime = false;
    let checkEndTime = false;

    if (beneficiary != "NIL"){
        checkBeneficiary = true;
        document.querySelector('#errB').innerHTML = "";
    } else {
        document.querySelector('#errB').innerHTML = "Choose an Option";
    }

    if (eventName != ""){
        checkEventName = true;
        document.querySelector("#errEN").innerHTML = "";
    } else{
        document.querySelector("#errEN").innerHTML = "Enter Event Name";
    }

    if (location != ""){
        checkLocation = true;
        document.querySelector("#errL").innerHTML = "";
    } else{
        document.querySelector("#errL").innerHTML = "Enter Location";
    }
    if (date != 0){
        checkDate = true;
        document.querySelector("#errD").innerHTML = "";
    } else{
        document.querySelector("#errD").innerHTML = "Enter Date";
    }
    if (startTime != 0){
        checkStartTime = true;
        document.querySelector("#errST").innerHTML = "";
    } else{
        document.querySelector("#errST").innerHTML = "Enter Start Time";
    }
    if (endTime != 0){
        checkEndTime = true;
        document.querySelector("#errET").innerHTML = "";
    } else{
        document.querySelector("#errET").innerHTML = "Enter End Time";
    }

    if (checkBeneficiary && checkEventName && checkLocation && checkDate && checkStartTime && checkEndTime){
        return true;
    }

    return false;
}