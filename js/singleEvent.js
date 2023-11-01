const tileClicked = (id) => {
    getSingleEvent(id).then((data)=>{
        const allEvents = document.getElementById('AllEventsButton');
        allEvents.onclick = () => {
            getEventPage();
        };
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
                        <p class="start">${moment.utc(data.start.local).format("DD-M-YYYY, h:mm a")}</p>
                    </div>
                </li>
                <li>
                    <div class="headingTitle">
                        <h5>End Date</h5>
                    </div>
                    <div class="titleDetails">
                        <p class="end">${moment.utc(data.end.local).format("DD-M-YYYY, h:mm a")}</p>
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
        };
        updateClick.onclick = () => {
            updateHTMLonClick(id,data);
        };
    });
};