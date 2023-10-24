const form = document.getElementById('login');
const btn = document.getElementById('submit');
const input = document.querySelector('input');
let user;


const submit = (e) => {
    e.preventDefault();
    inputText = input.value;
    request();
}

btn.onclick = (e) => {
    submit(e);
    btn.setAttribute('disabled',true);
    btn.innerText = "Validating...";
}

form.onsubmit = (e) => {
    submit(e);
    console.log(e)
    btn.setAttribute('disabled',true);
    btn.innerText = "Validating...";
}

const request = async () => {
    
    const config = { 
        // headers: {
        //     Authorization: `Bearer ${inputText}`
        // }
    };

    const url = `https://www.eventbriteapi.com/v3/users/me/?token=${inputText}`;

    try {

        const login = await axios.get(url,config);
        
        if(login.status === 200)
        {
            login.data["token"] = inputText;
            getOrgId(login.data.id, inputText).then((data)=>{
                login.data["orgId"] = data;
                user = login.data;
                sessionStorage.setItem('details',JSON.stringify(login.data))
                getEventPage();

            });
            
        }

    }
    catch(err) {
        console.log(err);
        alert('Error! Try Again.')
        btn.setAttribute('disabled',false);
        btn.innerText = "Submit";
    }

}




