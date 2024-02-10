const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'views/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

///////////////////////////////////

router.get('/activity/completed', (req, res) => {
    res.render("completed/completed", { rows: returnCompletedString()})
})

router.get('/activity/ongoing', (req, res) => {
    res.render('ongoing/ongoing', { rows: returnOngoingString()})
})

router.get('/activity/createnew', (req, res) => {
    res.render('createnew/createnew')
})

router.post(('/activity/createnew'), upload.single('uploaded_file'), (req,res) => {
    recordEvent(req.body.beneficiary, req.body.eventName, req.file, req.body.date, 10, req.body.location)
    res.redirect('/admin/activity/completed')
})

router.get('/activity/upcoming', (req, res) => {
    res.render('upcoming/upcoming', { rows: returnUpcomingString()})
})

///////////////////////////////
router.get('/generate', (req, res) => {
    res.redirect('../generate/age')
})

router.get('/generate/age', (req, res) => {
    res.render("age/age", { rows: returnAgeString()})
})

router.get('/generate/day', (req, res) => {
    res.render('day/day')
})

router.get('/generate/area', (req, res) => {
    res.render('area/area', { rows: returnAreaString()})
})

//FUNCTION//////////////////////
function returnAgeString(){
    let dataUser = JSON.parse(fs.readFileSync('views/data/userParticipation.json', 'utf8'));

    let uNineteenVolun = 0;
    let uNineteenHours = 0;
    let nineteenFourFiveVolun = 0;
    let nineteenFourFiveHours = 0;
    let aFourFiveVolun = 0;
    let aFourFiveHours = 0;

    for (const user in dataUser) {
        if (dataUser[user]["age"] < 19){
            uNineteenVolun++;
            let totalHours = 0;
            for (const event in dataUser[user]["participated"]){
                totalHours += dataUser[user]["participated"][event]["hours"];
            }
            uNineteenHours += totalHours;
        } else if (dataUser[user]["age"] <= 45){
            nineteenFourFiveVolun++;
            let totalHours = 0;
            for (const event in dataUser[user]["participated"]){
                totalHours += dataUser[user]["participated"][event]["hours"];
            }
            nineteenFourFiveHours += totalHours;
        } else {
            aFourFiveVolun++;
            let totalHours = 0;
            for (const event in dataUser[user]["participated"]){
                totalHours += dataUser[user]["participated"][event]["hours"];
            }
            aFourFiveHours += totalHours;
        }
    }
    
    let string = `
        <div class="row">
            <div class="age-group"> under 19 </div>
            <div class="volunteer-no">${uNineteenVolun}</div>
            <div class="volunteer-hour">${uNineteenHours}</div>
        </div>
        <div class="row">
            <div class="age-group"> 19 to 45 </div>
            <div class="volunteer-no">${nineteenFourFiveVolun}</div>
            <div class="volunteer-hour">${nineteenFourFiveHours}</div>
        </div>
        <div class="row">
            <div class="age-group"> above 45 </div>
            <div class="volunteer-no">${aFourFiveVolun}</div>
            <div class="volunteer-hour">${aFourFiveHours}</div>
        </div>
    `
    return string;
    
}

function returnAreaString(){
    let dataUser = JSON.parse(fs.readFileSync('views/data/userParticipation.json', 'utf8'));

    let northV= 0;
    let northH = 0;
    let southV = 0;
    let southH = 0;
    let eastV= 0;
    let eastH = 0;
    let westV= 0;
    let westH = 0;

    for (const user in dataUser) {
        if (dataUser[user]["area"] == "north"){
            northV++;
            let totalHours = 0;
            for (const event in dataUser[user]["participated"]){
                totalHours += dataUser[user]["participated"][event]["hours"];
            }
            northH += totalHours;
        } else if (dataUser[user]["area"] == "south"){
            southV++;
            let totalHours = 0;
            for (const event in dataUser[user]["participated"]){
                totalHours += dataUser[user]["participated"][event]["hours"];
            }
            southH += totalHours;
        } else if (dataUser[user]["area"] == "east"){
            eastV++;
            let totalHours = 0;
            for (const event in dataUser[user]["participated"]){
                totalHours += dataUser[user]["participated"][event]["hours"];
            }
            eastH += totalHours;
        } else {
            westV++;
            let totalHours = 0;
            for (const event in dataUser[user]["participated"]){
                totalHours += dataUser[user]["participated"][event]["hours"];
            }
            westH += totalHours;
        }
    }
    
    let string = `
        <div class="row">
            <div class="area-group"> North </div>
            <div class="volunteer-no">${northV}</div>
            <div class="volunteer-hour">${northH}</div>
        </div>
        <div class="row">
            <div class="area-group"> South </div>
            <div class="volunteer-no">${southV}</div>
            <div class="volunteer-hour">${southH}</div>
        </div>
        <div class="row">
            <div class="area-group"> East </div>
            <div class="volunteer-no">${eastV}</div>
            <div class="volunteer-hour">${eastH}</div>
        </div>
        <div class="row">
            <div class="area-group"> West </div>
            <div class="volunteer-no">${westV}</div>
            <div class="volunteer-hour">${westH}</div>
        </div>
    `
    return string;
    
}














function returnCompletedString() {
    let string = "";
    let dataUser = JSON.parse(fs.readFileSync('views/data/userParticipation.json', 'utf8'));
    let dataEvent = JSON.parse(fs.readFileSync('views/data/events.json', 'utf8'));


    for (const event in dataEvent) {
        let dataDate = new Date(dataEvent[event]["date"]);
        if (dataDate.getTime() < Date.now() && dataDate.getDate() != new Date().getDate()) {
            let eventName = dataEvent[event]["name"]
            let date = `${dataDate.getDate()}/${dataDate.getMonth()}/${dataDate.getFullYear()}`
            let registered = 0;
            let attendees = 0;

            // cycle through user participation and sum it up
            for (const user in dataUser) {
                for (const partEvent in dataUser[user]["participated"]) {
                    if (dataUser[user]["participated"][partEvent]["eventName"] === eventName) {
                        registered++;
                        if (dataUser[user]["participated"][partEvent]["status"] === "attended") {
                            attendees++;
                        }
                    }
                }
            }

            // add event to string
            string += `
            <div class="row">
                <div class="date">${date}</div>
                <div class="name">${eventName}</div>
                <div class="registered">${registered}</div>
                <div class="attendees">${attendees}</div>
            </div>
            `
        }
    }
    return string;
}

function returnUpcomingString() {
    let string = "";
    let dataUser = JSON.parse(fs.readFileSync('views/data/userParticipation.json', 'utf8'));
    let dataEvent = JSON.parse(fs.readFileSync('views/data/events.json', 'utf8'));

    for (const event in dataEvent) {
        let dataDate = new Date(dataEvent[event]["date"]);
        if (dataDate.getTime() > Date.now()) {
            let eventName = dataEvent[event]["name"]
            let date = `${dataDate.getDate()}/${dataDate.getMonth()}/${dataDate.getFullYear()}`
            let registered = 0;

            // cycle through user participation and sum it up
            for (const user in dataUser) {
                for (const partEvent in dataUser[user]["participated"]) {
                    if (dataUser[user]["participated"][partEvent]["eventName"] === eventName) {
                        registered++;
                    }
                }
            }

            // add event to string
            string += `
            <div class="row">
                <div class="date">${date}</div>
                <div class="name">${eventName}</div>
                <div class="registered">${registered}</div>
            </div>
            `
        }
    }
    return string;
}

function returnOngoingString() {
    let string = "";
    let dataUser = JSON.parse(fs.readFileSync('views/data/userParticipation.json', 'utf8'));
    let dataEvent = JSON.parse(fs.readFileSync('views/data/events.json', 'utf8'));

    for (const event in dataEvent) {
        let dataDate = new Date(dataEvent[event]["date"]);
        if (compareSameDate(dataDate, new Date())) {
            let eventName = dataEvent[event]["name"]
            let date = `${dataDate.getDate()}/${dataDate.getMonth()}/${dataDate.getFullYear()}`
            let attendees = 0;
            let registered = 0;

            // cycle through user participation and sum it up
            for (const user in dataUser) {
                for (const partEvent in dataUser[user]["participated"]) {
                    if (dataUser[user]["participated"][partEvent]["eventName"] === eventName) {
                        registered++;
                        if (dataUser[user]["participated"][partEvent]["status"] === "attended") {
                            attendees++;
                        }
                    }
                }
            }

            // add event to string
            string += `
            <div class="row">
                <div class="date">${date}</div>
                <div class="name">${eventName}</div>
                <div class="registered">${registered}</div>
                <div class="attendees">${attendees}</div>
            </div>
            `
        }
    }
    return string;
}

function compareSameDate(first, second){

    if (first.getDate() === second.getDate() && first.getMonth() === second.getMonth() && first.getFullYear() === second.getFullYear()){
        return true;
    }
    return false;
}

function recordEvent(beneficiary, eventName, image, date, time, place){
    let dataEvent = JSON.parse(fs.readFileSync('views/data/events.json', 'utf8'));

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let input = {
        id: dataEvent.length,
        beneficiaries: beneficiary,
        image: "../images/" + image.originalname,
        name: eventName,
        date: months[parseInt(date.substring(5,7))] + " " + date.substring(8,10) + ", " + date.substring(0,4) + " " + time + ":00 GMT+8:00",
        place: place,
        price: 10
    }

    dataEvent.push(input);

    fs.writeFileSync('views/data/events.json', JSON.stringify(dataEvent));

    let processJs = "events = " + JSON.stringify(dataEvent);
    fs.writeFileSync('views/data/events.js', processJs);
}

module.exports = router