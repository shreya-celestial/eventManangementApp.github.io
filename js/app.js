const form = document.getElementById('login');
const btn = document.getElementById('submit');
const input = document.querySelector('input');
let user;

const submit = (e) => {
    e.preventDefault();
    inputText = input.value;
    request();
};

btn.onclick = (e) => {
    if(input.value !== '')
    {
        submit(e);
        btn.setAttribute('disabled',true);
        btn.innerText = "Validating...";
    }
    else
    {
        alert('Enter your Token');
    }
};

form.onsubmit = (e) => {
    submit(e);
    btn.setAttribute('disabled',true);
    btn.innerText = "Validating...";
};

const request = async () => {
    const config = { 
        method: "GET",
        // headers: {
        //     Authorization: `Bearer ${inputText}`
        // }
    };
    const url = `https://www.eventbriteapi.com/v3/users/me/?token=${inputText}`;
    const response = await fetch(url,config);
    if(response.status === 200)
    {
        const login = await response.json();
        login["token"] = inputText;
        getOrgId(login.id, inputText).then((data)=>{
            login["orgId"] = data;
            user = login;
            sessionStorage.setItem('details',JSON.stringify(login));
            getEventPage();

        });
    }
    else 
    {
        btn.removeAttribute('disabled');
        btn.innerText = "Submit";
        alert('Error! Try Again.');
    }
};




