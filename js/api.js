const getOrgId = async (id,token) => {
    const config = { 
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const url = `https://www.eventbriteapi.com/v3/users/${id}/organizations/`;
    try {
        const response = await fetch(url,config);
        const data = await response.json();
        if(response.status === 200)
        {
            return data.organizations[0].id;
        }
    }
    catch(err) {
        console.log(err);
        alert('Error! Try Again.');
    }
};

const getEvents = async () => {
    const eventsHere = document.getElementsByClassName('allEventsHere');
    eventsHere[0].innerHTML = `
        <div class = "noneShown">
            <h1>Loading...</h1>
        </div>
    `;
    const config = { 
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `https://www.eventbriteapi.com/v3/organizations/${user.orgId}/events/`;
    try {
        const list = await fetch(url,config);
        if(list.status === 200)
        {
            const data = await list.json();
            return data.events;
        }
    }
    catch(err) {
        console.log(err);
    }
};

const postNewEvent = async (body) => {
    const config = { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(body)
    };
    const url = `https://www.eventbriteapi.com/v3/organizations/${user.orgId}/events/`;
    try {
        const list = await fetch(url,config);
        const data = await list.json();
        if(list.status === 200)
        {
            return data.id;
        }
    }
    catch(err) {
        console.log(err);
        alert('Error! Try Again.');
    }
};

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
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `https://www.eventbriteapi.com/v3/events/${id}/`;
    try {
        const list = await fetch(url,config);
        if(list.status === 200)
        {
            const data = await list.json();
            return data;
        }
    }
    catch(err) {
        console.log(err);
        alert('Error! Try Again.');
    }
};

const updateEvent = async (id,body) => {
    const config = { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(body)
    };
    const url = `https://www.eventbriteapi.com/v3/events/${id}/`;
    try {
        const list = await fetch(url, config);
        if(list.status === 200)
        {
            const data = await list.json();
            return data.id;
        }
    }
    catch(err) {
        console.log(err);
        alert('Error! Try Again.');
    }
};

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
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `https://private-anon-124a7d0191-eventbriteapiv3public.apiary-proxy.com/v3/events/${id}/`;
    try {
        const list = await fetch(url,config);
        if(list.status === 200)
        {
            return;
        }
    }
    catch(err) {
        console.log(err);
    }
};