const express = require('express')
const router = express.Router()
const fs = require('fs');
const INITIAL = 0;
const INVALID = 1;

router.get('/', (req, res) => {
    res.render("login/login", { state: INITIAL })
})

router.post('/', (req, res) => {
    let name = req.body.username
    let password = req.body.password

    if (checkValidAdmin(name,password)){
        res.redirect(`/admin/activity/completed`)
    }
    if (checkValid(name, password)) {
        res.redirect(`/home/${name}`)
    } else {
        res.render("login/login", { state: INVALID })
    }
})


//FUNCTIONS/////////////////////////////////////
function checkValid(name, password) {

    let data = JSON.parse(fs.readFileSync('views/data/userDetails.json', 'utf8'));

    for (const x in data){
        if (data[x]["name"] == name && data[x]["password"] == password){
            return true;
        }
    }
    return false;
}

function checkValidAdmin(name,password) {
    
    let data = JSON.parse(fs.readFileSync('views/data/adminDetails.json', 'utf8'));
    for (const x in data){
        if (data[x]["name"] == name && data[x]["password"] == password){
            return true;
        }
    }
    return false;
}

module.exports = router