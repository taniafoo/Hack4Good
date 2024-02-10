function validateForm() {
    let name = document.forms["myForm"]["username"].value;
    let email = document.forms["myForm"]["email"].value;
    let password1 = document.forms["myForm"]["password"].value;
    let password2 = document.forms["myForm"]["passwordAgain"].value;

    let checkName = false;
    let checkEmail = false;
    let checkPassword = false;
    let checkPasswordAgain = false;

    if (name != "") {
        checkName = true;
        document.querySelector('#username').innerHTML = '';
    } else {
        document.querySelector('#username').innerHTML = 'username required';
    }

    if (email != "") {
        if (ValidateEmail(email)){//
            checkEmail = true;
            document.querySelector('#email').innerHTML = '';
        } else {
            document.querySelector('#email').innerHTML = 'invalid email';
        }
    } else {
        document.querySelector('#email').innerHTML = 'email required';
    }

    if (password1 != "") {
        if (password1.length >= 8) {
            checkPassword = true;
            document.querySelector('#password').innerHTML = '';
        } else {
            document.querySelector('#password').innerHTML = 'password too short';
        }
    } else {
        document.querySelector('#password').innerHTML = 'password required';
    }

    if (password2 != "") {
        if (password1 == password2){
            checkPasswordAgain = true;
            document.querySelector('#passwordAgain').innerHTML = '';
        } else {
            document.querySelector('#passwordAgain').innerHTML = 'passwords do not match';
        }
    } else {
        document.querySelector('#passwordAgain').innerHTML = 'enter password again';
    }

    if (checkName && checkEmail && checkPassword && checkPasswordAgain){
        return true;
    }

    return false;
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}