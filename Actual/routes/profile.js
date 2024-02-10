const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:profile', (req,res) => {
    res.render('profile/profile', { rows: getEventString(), profile: req.params.profile})
})

router.post('/:profile', (req,res) => {
    updateUserPart(req.body.beneficiary, req.params.profile)
    let url = `/profile/${req.params.profile}`
    res.redirect(url);
})




//////FUNCTION/////////////




















function updateUserPart(beneficiary,name){
    let dataUser = JSON.parse(fs.readFileSync('views/data/userParticipation.json', 'utf8'));

    let input = {eventName: beneficiary, status: "absent", hours: 8};
    for (const user in dataUser){
        if (dataUser[user]["name"] == name){
            dataUser[user]["participated"].push(input);
        }
    }

    fs.writeFileSync('views/data/userParticipation.json', JSON.stringify(dataUser));
}

function getEventString(){
    let dataEvent = JSON.parse(fs.readFileSync('views/data/events.json', 'utf8'));

    let string = "";
    for (const event in dataEvent){
        string += `<option value="${dataEvent[event]["name"]}">${dataEvent[event]["name"]}</option>`
    }
    return string;

}

module.exports = router