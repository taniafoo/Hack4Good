const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    res.render("signup/signup")
})

router.post('/', (req, res) => {
    let name = req.body.username
    let password = req.body.password
    let email = req.body.email

    writeIntoFile(name,password,email);
    
    res.redirect(`/home/${name}`)
})

//FUNCTIONS/////////////////////////////////////
function writeIntoFile(name, password, email){
    let data = JSON.parse(fs.readFileSync('views/data/userDetails.json', 'utf8'));
    data.push({ name: name, password: password, email: email});
    fs.writeFileSync('views/data/userDetails.json', JSON.stringify(data));
}

module.exports = router