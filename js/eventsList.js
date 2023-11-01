const container = document.querySelector('div');
const sessionUser = JSON.parse(sessionStorage.getItem('details'));
let obj;
const getEventPage = () => {
    if(sessionUser === null && (user === null || user === undefined))
    {
        return;
    }
    else if((user === null || user === undefined) && sessionUser !== null)
    {
        user = sessionUser;
    }
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
    container.appendChild(divEventPage);
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
                eventDiv.setAttribute('class', 'eventTile');
                eventDiv.setAttribute('id', event.id);
                eventDiv.innerHTML = `
                    <div class="calTile">
                        <img src="./assets/cal.png">
                        <h3>${event.name.text}</h3>
                    </div>
                    <p>Start: ${moment.utc(event.start.local).format("DD-M-YYYY, h:mm a")}</p>
                    <p class="endDateEventTile">End: ${moment.utc(event.end.local).format("DD-M-YYYY, h:mm a")}</p>
                `;
                eventsHere[0].appendChild(eventDiv);
            });
            const extraDiv = document.createElement('div');
            extraDiv.setAttribute('class', 'eventTileExtra');
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
            };
        });
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
        eventsButton.style.cssText = `background-color: white`;

        getNewEventPage();
    };
};

getEventPage();