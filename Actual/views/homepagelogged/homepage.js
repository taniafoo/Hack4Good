//update events into html based on changes in search bar, filter & data in events.js
function updateProgs() {
    let progsHTML = "";
    events.forEach((event) => {
        audience.forEach((ta) => {

            //search bar functionality
            let canSearch = true;
            const eventLow = event.name.toLowerCase();
            if (!eventLow.includes(document.querySelector('.searchbar').value.toLowerCase())) {
                canSearch = false;
            }
            
            let checked = document.querySelector(`input[type="checkbox"][id=${ta.id}]`).checked;
            
            if (checked && ta.id === event.beneficiaries && canSearch) {
                let date = "";
                let location = "";
                if (event.date.length > 1) {
                    date = "Various days"
                }
                else {
                    date = `${event.date[0].dayName} ${event.date[0].fullDate}, ${event.date[0].time}`;
                }
    
                if (event.place.length > 1) {
                    location = "Various locations";
                }
                else {
                    location = event.place;
                }
                
                progsHTML += `
                    <div class="events">
                    <a href="/apply">
                        <div class="poster">                        
                            <img src="${event.image}">
                        </div>
                        <div class="eventDetails">
                            <p class = "event-name">${event.name}</p>
                            <p class = "date">${date}</p>
                            <p class = "location">${location}</p>
                            <p class = "event-price">$${event.price} per pax</p>
                        </div>
                        </a>
                    </div>
                `
            }
        });
    });

    if (progsHTML === "") {
        progsHTML = "No results found."
    }
    document.querySelector('.activities').innerHTML = progsHTML;
}

//update filter options from beneficiariesGrp into html
function updateFilter() {
    let filterHTML = "";

    audience.forEach((ta) => {
        filterHTML += `
            <input type="checkbox" id=${ta.id} checked>
            <label for="${ta.id}">${ta.label}</label><br>
        `
    })
    document.querySelector('.beneficiaryCats').innerHTML = filterHTML;
}
updateFilter();
updateProgs();

/*add event listeners for filter checkbox so that when user click 
it will be checked/unchecked respectively */
document.querySelectorAll('input[type="checkbox"]')
    .forEach((filter) => {
        filter.addEventListener('change', () => {
            if (this.checked) {
                this.checked = false;
            }
            else {
                this.checked = true;
            }
            updateProgs();
        });
    });

document.querySelector('.searchbar')
    .addEventListener('keyup', () => {
        updateProgs();
    });