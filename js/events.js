const container = document.querySelector('div');
// const sessionUser = JSON.parse(sessionStorage.getItem('details'))

let obj;

const getEventPage = () => {

    container.innerHTML = "";

    container.style.cssText = `
        flex-direction: column;
        justify-content: unset;
        align-items: unset;
    `;
    
    const nav = document.createElement('nav');
    nav.innerHTML = `
        <h1>Event Organizee</h1>
        <div class="details">
            <p>${user.name}</p>
            <p>${user.emails[0].email}</p>
        </div>
    `;
    container.appendChild(nav);

    const divEventPage = document.createElement('div');
    divEventPage.setAttribute('class','Contents');
    divEventPage.innerHTML = `
        <div class="events"> 
            <div class="buttons">
                <button id="AllEventsButton">All Events</button>
                <button id="createNewEvent">Create Event</button>
            </div>
            <div class="eventContentsDiv">
                <div class="allEventsHere"></div>
            </div>
        </div>
    `;
    container.appendChild(divEventPage)
    const eventsButton = document.getElementById('AllEventsButton');
    eventsButton.style.cssText = `background-color: #eeeeee`;

    const eventsHere = document.getElementsByClassName('allEventsHere');

    getEvents().then((data)=>{
        
        obj = data;

        if(obj.length>0)
        {
            eventsHere[0].innerHTML = '';
            obj.forEach((event)=>{
                const eventDiv = document.createElement('div');
                eventDiv.setAttribute('class', 'eventTile')
                eventDiv.setAttribute('id', event.id)
                eventDiv.innerHTML = `
                    <div class="calTile">
                        <img src="./assets/cal.png">
                        <h3>${event.name.text}</h3>
                    </div>
                    <p>Start: ${moment.utc(event.start.local).format("DD-M-YYYY, h:mm a")}</p>
                    <p class="endDateEventTile">End: ${moment.utc(event.end.local).format("DD-M-YYYY, h:mm a")}</p>
                `;
                eventsHere[0].appendChild(eventDiv);
            })
            const extraDiv = document.createElement('div');
            extraDiv.setAttribute('class', 'eventTileExtra')
            eventsHere[0].appendChild(extraDiv);
        }
        else
        {
            eventsHere[0].innerHTML = `
                <div class = "noneShown">
                    <h1>NOTHING TO SHOW HERE</h1>
                </div>
            `;
        }

        const eventTilesClick = document.querySelectorAll('div.eventTile');
        eventTilesClick.forEach((tile)=>{
            
            const id = tile.id;
            tile.onclick = () => {
                
                tileClicked(id);
            }

        })

    }).catch((err)=>{

        eventsHere[0].innerHTML = "";
        eventsHere[0].innerHTML = `
            <div class = "noneShown">
                <h1>ERROR FETCHING!!</h1>
            </div>
        `;

    });    

    const newEvent = document.getElementById('createNewEvent');
  
    newEvent.onclick = () => {
        newEvent.style.cssText = `background-color: #eeeeee`;
        eventsButton.style.cssText = `background-color: white`

        getNewEventPage();
    }

}

const tileClicked = (id) => {

    getSingleEvent(id).then((data)=>{
    
        const allEvents = document.getElementById('AllEventsButton');

        allEvents.onclick = () => {
            getEventPage();
        }

        let eventContentsDiv = document.getElementsByClassName('eventContentsDiv');
        eventContentsDiv = eventContentsDiv[0];
        eventContentsDiv.innerHTML = '';

        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'eventSpecificDiv');
        newDiv.innerHTML = `
            <h2>Event Details</h2>
            <ul>
                <li>
                    <div class="headingTitle">
                        <h5>Event Name</h5>
                    </div>
                    <div class="titleDetails">
                        <p class="name">${data.name.text}</p>
                    </div>
                </li>
                <li>
                    <div class="headingTitle">
                        <h5>Event Detail</h5>
                    </div>
                    <div class="titleDetails">
                        <p class="detailing">${data.description.text}</p>
                    </div>
                </li>
                <li>
                    <div class="headingTitle">
                        <h5>Start Date</h5>
                    </div>
                    <div class="titleDetails">
                        <p class="start">${data.start.local}</p>
                    </div>
                </li>
                <li>
                    <div class="headingTitle">
                        <h5>End Date</h5>
                    </div>
                    <div class="titleDetails">
                        <p class="end">${data.end.local}</p>
                    </div>
                </li>
                <li>
                    <div class="headingTitle">
                        <h5>Capacity</h5>
                    </div>
                    <div class="titleDetails">
                        <p class="capacity">${data.capacity}</p>
                    </div>
                </li>
            </ul>
            <div class="eventButtons">
                <button id="update">Update</button>
                <button id="delete">Delete</button>
            </div>
        `;
        eventContentsDiv.appendChild(newDiv);

        const updateClick = document.getElementById('update');
        const deleteEvent = document.getElementById('delete');

        deleteEvent.onclick = () => {

            deleteThisEvent(id,data);

        }

        updateClick.onclick = () => {
            updateHTMLonClick(id,data);
        }

    })

}

const updateHTMLonClick = (id,data) => {

    let eventContentsDiv = document.getElementsByClassName('eventContentsDiv');
    eventContentsDiv = eventContentsDiv[0];
    eventContentsDiv.innerHTML = '';

    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'newEventPage');
    newDiv.innerHTML = `
        <form id="updateEvents">
            <div class="forForm">
                <h2>Update Event</h2>
                <div>
                    <label for="name"> Event Name</label>
                    <input type="text" name="name" required value="${data.name.text}">
                </div>
                <div>
                    <label for="detail"> Event Detail</label>
                    <input type="text" name="detail" required value="${data.description.text}">
                </div>
                <div>
                    <label for="start"> Start Date</label>
                    <input type="text" name="start" disabled required value="${moment.utc(data.start.local).format("DD-M-YYYY, h:mm a")}">
                </div>
                <div>
                    <label for="end"> End Date</label>
                    <input type="text" name="end" disabled required value="${moment.utc(data.end.local).format("DD-M-YYYY, h:mm a")}">
                </div>
                <div>
                    <label for="capacity"> Capacity</label>
                    <input type="number" name="capacity" required value="${data.capacity}">
                </div>
                <div>
                    <button>Update Event</button>
                </div>
            </div>
            
        </form>
    `;
    eventContentsDiv.appendChild(newDiv);

    const newForm = document.querySelector('#updateEvents');

    newForm.onsubmit = (e) => {
        e.preventDefault();
        e.target.elements[5].disabled = true;
        e.target.elements[5].innerText = "Updating..."

        const  body = {
            "event": {
              "name": {
                "html": `<p>${e.target.elements.name.value}</p>`
              },
              "description": {
                "html": `<p>${e.target.elements.detail.value}</p>`
              },
              "capacity": e.target.elements.capacity.value
            }
        };

        updateEvent(id,body).then((data)=>{
            tileClicked(data);
        })

    }

   
}


getNewEventPage = () => {

    const allEvents = document.getElementById('AllEventsButton');

    allEvents.onclick = () => {
        getEventPage();
    }

    let eventContentsDiv = document.getElementsByClassName('eventContentsDiv');
    eventContentsDiv = eventContentsDiv[0];
    eventContentsDiv.innerHTML = '';

    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'newEventPage');

    const date = new Date();
    date.setDate(date.getDate() + 1);

    newDiv.innerHTML = `
        <form id="createNewEvents">
            <div class="forForm">
                <h2>New Event</h2>
                <div>
                    <label for="name"> Event Name</label>
                    <input type="text" name="name" required>
                </div>
                <div>
                    <label for="detail"> Event Detail</label>
                    <input type="text" name="detail" required>
                </div>
                <div>
                    <label for="start"> Start Date</label>
                    <input type="date" name="start" required min=${date.toISOString().split('T')[0]}>
                </div>
                <div>
                    <label for="end"> End Date</label>
                    <input type="date" name="end" required min=${date.toISOString().split('T')[0]}>
                </div>
                <div>
                    <label for="capacity"> Capacity</label>
                    <input type="number" name="capacity" required>
                </div>
                <div>
                    <button>Create Event</button>
                </div>
            </div>
        </form>
    `;
    eventContentsDiv.appendChild(newDiv);

    const newForm = document.querySelector('#createNewEvents');
    newForm.onsubmit = (e) => {
        e.preventDefault();
        e.target.elements[5].disabled = true;
        e.target.elements[5].innerText = "Loading..."

        const  body = {
            "event": {
              "name": {
                "html": `<p>${e.target.elements.name.value}</p>`
              },
              "description": {
                "html": `<p>${e.target.elements.detail.value}</p>`
              },
              "start": {
                "timezone": "UTC",
                "utc": `${moment(e.target.elements.start.value).utc().format()}`
              },
              "end": {
                "timezone": "UTC",
                "utc": `${moment(e.target.elements.end.value).utc().format()}`
              },
              "currency": "USD",
              "capacity": e.target.elements.capacity.value
            }
        };

        const newObj = {
            id: obj.length,
            event: e.target.elements.name.value,
            start: e.target.elements.start.value,
            end: e.target.elements.end.value,
            capacity: e.target.elements.capacity.value,
            details: e.target.elements.detail.value
        }

        postNewEvent(body).then((data)=>{
            getEventPage();
        })
        
    }


}



deleteThisEvent = (id,data) => {

    let eventContentsDiv = document.getElementsByClassName('eventContentsDiv');
    eventContentsDiv = eventContentsDiv[0];
    eventContentsDiv.innerHTML = '';

    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'deleteEventMsg');
    newDiv.innerHTML = `
        <div class="deletePopUp">
            <div class="message">
                <p>Are you sure you want to delete?</p>
                <h5>${data.name.text}</h5>
            </div>
            <div class="buttonsDelete">
                <button id="yes">Yes</button>
                <button id="no">No</button>
            </div>
        </div>
    `;
    eventContentsDiv.appendChild(newDiv);

    const agreeDelete = document.getElementById('yes');
    const declineDelete = document.getElementById('no');

    agreeDelete.onclick = () => {

        deleteEvent(id).then((data)=>{

            getEventPage();

        });

    }

    declineDelete.onclick = () => {
        tileClicked(id);
    }


}
