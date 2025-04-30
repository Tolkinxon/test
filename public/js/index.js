const elForm = document.querySelector('.js-form');

async function postUser(data) {
    const req = await fetch('/register', {
        method: "POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify(data)
    });
    if(req.ok) window.location = '/main.html';
    const res = await req.json();
}

elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();

    const formData = new FormData(elForm);
    const newUser = Object.fromEntries(formData);

    newUser.createdAt = new Date().toLocaleDateString();
    newUser.updatedAt = null;
    postUser(newUser);
})
