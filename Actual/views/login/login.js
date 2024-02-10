const INITIAL = 0;
const INVALID = 1;

function validateForm() {
    let name = document.forms["myForm"]["username"].value;
    let password = document.forms["myForm"]["password"].value;

    if (document.querySelector("#state").value == INITIAL){
        return true;
    }
    
    return true;
}

