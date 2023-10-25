

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
