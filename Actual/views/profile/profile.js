displayProf();
displayEvents();

function profChange(change) {
    const id = change.dataset.id;
        if (change.innerHTML === "Change") {
            change.innerHTML = "Save";
            document.getElementById(`${id}`).innerHTML = 
            `${id}: <input class="${id}">`;
        }
        else {
            const input = document.querySelector(`.${id}`).value;
            change.innerHTML = "Change";
            let prof = JSON.parse(localStorage.getItem('profile'));
            if (input !== "") {
                if (id === "Name") {
                    prof.name = `${input}`;
                }
                else if (id === "Email") {
                    prof.email = `${input}`;
                }
                else if (id === "Number") {
                    prof.hp = `${input}`;
                }
                else {
                    const skillsArr = input.split(",");
                    prof.skills = skillsArr;
                }
            }
            localStorage.setItem('profile', JSON.stringify(prof));
            displayProf();
        }
}
function displayProf() {
    const userprofile = JSON.parse(localStorage.getItem('profile')) || profile;
    let profHTML = `
        <img src="${userprofile.img}">
        <p>${userprofile.name}</p>
        <p>${userprofile.email}</p>
        <p>${userprofile.age}</p>
        <p>Total hours served: ${userprofile.totalServed}</p>`;

    let detailtabHTML = `
        <div class="amend"> 
            <div class="display" id="Name">Name: ${userprofile.name}</div>
            <button class="change" data-id="Name">Change</button>
        </div>
        <div class="amend"> 
            <div class="display" id="Email">Email: ${userprofile.email}</div>
            <button class="change" data-id="Email">Change</button>
        </div>
        <div class="amend">
            <div class="display" id="Number">Number: ${userprofile.hp}</div>
            <button class="change" data-id="Number"hp">Change</button>
        </div>
        <div class="amend">
            <div class="display" id="Skills">Your Skills:${userprofile.skills}</div>
            <button class="change" data-id="Skills">Change</button>
        </div>`


    document.querySelector('.priInfo').innerHTML = profHTML;
    document.getElementById('details').innerHTML = detailtabHTML;
    document.querySelectorAll('.change')
    .forEach((change) => {
        change.addEventListener('click', () => {
            profChange(change);
        });
    });
}

// XX
function checkIfPast(eventDate) {
    let eventDay = new Date(eventDate);
    let dateNow = new Date();
    return eventDay.getTime() - dateNow.getTime() < 0;
}

//
function displayEvents() {
    const signedEv = JSON.parse(localStorage.getItem('signedEvent')) || signedUpEvents;
    let upcomingHTML = "";
    let completedHTML = "";
    events.forEach((allEvents) => {
        signedEv.forEach((signedEvents) => {
            if (allEvents.id === signedEvents.id) {
                if (checkIfPast(signedEvents.date)) {
                    if (signedEvents.attendance === 1) {
                        completedHTML +=`
                            <div class="display">
                                <div class="poster">                        
                                    <img src="${allEvents.image}">
                                </div>
                                <div class="eventDetails">
                                    <p class = "event-name">${allEvents.name}</p>
                                    <p class = "date">Date: ${signedEvents.date}</p>
                                    <p class = "hours">${signedEvents.hours} hours served</p>
                                </div>
                            </div>`;
                    }
                }
                else {
                    upcomingHTML += `
                        <div class="display">
                            <div class="poster">                        
                                <img src="${allEvents.image}">
                            </div>
                            <div class="eventDetails">
                                <p class = "event-name">${allEvents.name}</p>
                                <p class = "date">Date: ${signedEvents.date}</p>
                                <button class="attendance att${signedEvents.id}" data-id="${signedEvents.id}">Confirm Attendance</button>
                                <div>
                                    <input class="hrsIn" placeholder="Log in hours">
                                    <button class="hrsCfm" data-id="${signedEvents.id}">Confirm</button>
                                </div>
                            </div>
                        </div>`;
                }
            }
        });
        
    })
    if (upcomingHTML === "") {
        upcomingHTML = "No Events"
    }
    if (completedHTML === "") {
        completedHTML = "No Events"
    }
    document.getElementById('upcoming').innerHTML = upcomingHTML;
    document.getElementById('completed').innerHTML = completedHTML;
    displaySignUps();
    document.querySelectorAll('.attendance')
        .forEach((attBut) => {
            attBut.addEventListener('click', () => {
                const butId = attBut.dataset.id;
                let signedEv = JSON.parse(localStorage.getItem('signedEvent'))|| signedUpEvents;
                    for (i = 0; i < signedEv.length; i++) {
                        if (signedEv[i].id === butId) {
                            if (!checkIfPast(signedEv[i].date)) {
                                alert('Event has not begun, cannot confirm attendance');
                            }
                            else {
                                signedEv[i].attendance = 1;
                                document.querySelector(`.att${butId}`).innerHTML = "Confirmed";
                                localStorage.setItem('signedEvent', JSON.stringify(signedEv));
                                displayEvents();
                            }
                        }
                    }
            });
        });

        document.querySelectorAll('.hrsCfm')
            .forEach((cfmBut) => {
                cfmBut.addEventListener('click', () => {
                    const butId = cfmBut.dataset.id;
                    let signedEv = JSON.parse(localStorage.getItem('signedEvent'))|| signedUpEvents;
                        for (i = 0; i < signedEv.length; i++) {
                            if (signedEv[i].id === butId) {
                                if (!checkIfPast(signedEv[i].date)) {
                                    alert('Event has not begun, cannot log volunteer hours');
                                }
                                else {
                                    const input = document.querySelector('.hrsIn').value;
                                    signedEv[i].hours = Number(input);
                                    cfmBut.innerHTML = "Confirmed";
                                    localStorage.setItem('signedEvent', JSON.stringify(signedEv));
                                    displayEvents();
                                }
                            }
                        }
                });
        });
}

//XX
function tabs(evt, id) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    let profTab = document.getElementsByClassName("profTab");
    for (i = 0; i < profTab.length; i++) {
        profTab[i].className = profTab[i].className.replace(" active", "");
    }   
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}