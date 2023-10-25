

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

