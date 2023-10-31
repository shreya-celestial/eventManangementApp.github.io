

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

    };

    declineDelete.onclick = () => {
        tileClicked(id);
    };


};
