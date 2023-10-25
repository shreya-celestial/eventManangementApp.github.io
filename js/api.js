const getOrgId = async (id,token) => {

    const config = { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const url = `https://www.eventbriteapi.com/v3/users/${id}/organizations/`;

    try {

        const data = await axios.get(url,config);
        
        if(data.status === 200)
        {
            return data.data.organizations[0].id;
        }

    }
    catch(err) {
        console.log(err);
        alert('Error! Try Again.')
    }
}

const getEvents = async () => {

    const eventsHere = document.getElementsByClassName('allEventsHere');
    eventsHere[0].innerHTML = `
        <div class = "noneShown">
            <h1>Loading...</h1>
        </div>
    `;

    const config = { 
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };

    const url = `https://www.eventbriteapi.com/v3/organizations/${user.orgId}/events/`;

    try {

        const list = await axios.get(url,config);
        
        if(list.status === 200)
        {
            return list.data.events;
        }

    }
    catch(err) {
        console.log(err);
    }

}

const postNewEvent = async (body) => {

    const config = { 
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };

    const url = `https://www.eventbriteapi.com/v3/organizations/${user.orgId}/events/`

    try {

        const list = await axios.post(url,body,config);
        
        if(list.status === 200)
        {
            return list.data.id;
        }

    }
    catch(err) {
        console.log(err);
        alert('Error! Try Again.')
    }

}

const getSingleEvent = async (id) => {

    let eventContentsDiv = document.getElementsByClassName('eventContentsDiv');
    eventContentsDiv = eventContentsDiv[0];
    eventContentsDiv.innerHTML = '';

    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'allEventsHere');
    newDiv.innerHTML = `
        <div class = "noneShown">
            <h1>Loading...</h1>
        </div>
    `;
    eventContentsDiv.appendChild(newDiv);

    const config = { 
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };

    const url = `https://www.eventbriteapi.com/v3/events/${id}/`

    try {

        const data = await axios.get(url,config);
        
        if(data.status === 200)
        {
            return data.data;
        }

    }
    catch(err) {
        console.log(err);
        alert('Error! Try Again.')
    }

}

const updateEvent = async (id,body) => {

    const config = { 
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };

    const url = `https://www.eventbriteapi.com/v3/events/${id}/`

    try {

        const list = await axios.post(url,body,config);
        
        if(list.status === 200)
        {
            return list.data.id;
        }

    }
    catch(err) {
        console.log(err);
        alert('Error! Try Again.')
    }

}

const deleteEvent = async (id) => {

    let eventContentsDiv = document.getElementsByClassName('eventContentsDiv');
    eventContentsDiv = eventContentsDiv[0];
    eventContentsDiv.innerHTML = '';

    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'allEventsHere');
    newDiv.innerHTML = `
        <div class = "noneShown">
            <h1>Loading...</h1>
        </div>
    `;
    eventContentsDiv.appendChild(newDiv);

    const config = { 
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };

    const url = `https://private-anon-124a7d0191-eventbriteapiv3public.apiary-proxy.com/v3/events/${id}/`

    try {

        const list = await axios.delete(url,config);
        
        if(list.status === 200)
        {
            return
        }

    }
    catch(err) {
        console.log(err);
    }

}