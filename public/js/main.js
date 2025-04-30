const elForm = document.querySelector('.js-form');
const elName = document.querySelector('.fileName');
const elFile = document.querySelector('.file');

async function postFile(file) {
    const req = await fetch('/upload', {
        method: "POST",
        body: file
    });
    const res = await req.json();
    console.log(res);
}

elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const formdData = new FormData();

    const file = elFile.files[0]
    const extName = file.name.split('.')[1];
    const newName = elName.value + '.' + extName;
    const newFile = new File([file], newName, {type: file.type});

    const formData = new FormData();

    formData.set('file', newFile);
    postFile(formData);

})