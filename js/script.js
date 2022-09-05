const contactList = document.getElementById("contact-list");
const contactName=document.getElementById("name");
const contactNumber=document.getElementById("number");
const contactButton=document.getElementById("contact-button");

const deleteButtons = document.getElementsByClassName('delete-contact');
const updateButtons = document.getElementsByClassName('update-contact');


const URL_CONTACT = "http://localhost:8080/api/v1/contact"


contactButton.addEventListener('click', async () => {
    const nameValue = contactName.value;
    const numberValue = contactNumber.value;

    contactName.value="";
    contactNumber.value="";

const request = await fetch(
    URL_CONTACT, 
    {
      method: 'POST',
      body: JSON.stringify({ name: nameValue ,
    number: numberValue}),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  try{

  if (request.status != 200) {
    return;
  }
  const data = await request.json();
  loadContacts();


}catch{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
});


const deleteEventListener = () => {
    for( let index=0; index<deleteButtons.length; index++){
        deleteButtons[index].addEventListener('click', deleteContact);
    }
};

const deleteContact = async (e) =>{
 const id = e.target.parentNode.parentNode.id;

 const request = await fetch(URL_CONTACT+'/'+id,{
    method: 'DELETE',
 });

 const data =await request.json();

 if(request.status==200){
    swal.fire(
        'success!',
        'Contact has been deleted!',
        'success')
        loadContacts();
     }
};


const updateEventListener = () =>{
    for ( let index=0; index<updateButtons.length; index++){
        updateButtons[index].addEventListener('click', updateTodo);
        
    }
};

const updateTodo = async (e) =>{


    const id = e.target.parentNode.parentNode.id;

    const nameValue = contactName.value;
    const numberValue = contactNumber.value;
    console.log(nameValue);

    if(nameValue=='' || numberValue ==''){
        Swal.fire('Please input infromation first!');
        return;

    }

    const request = await fetch(URL_CONTACT+'/'+id,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameValue ,
            number: numberValue}),
     });
     const data =await request.json();
 if(request.status==200){
    swal.fire(
        'success!',
        'Todo has been updated!',
        'success')
        loadContacts();
     }
    };


const loadContacts = async () => {
    const request = await fetch(URL_CONTACT);

    const data = await request.json();

    console.log(data);

    const dataMap = data.map((contact) => {
        return `
        <li id=${contact.id} class="list-group-item todo-item">
        <p>Name: ${contact.name}</p>
        <p>Number: ${contact.number}</p>
        <div>
        <button class="update-contact btn btn-warning" type="button" >Update</button>
        <button  class="delete-contact btn btn-danger" type="button" >Delete</button> 
        </div> 
        </li>`;
    });

    contactList.innerHTML = dataMap.join('');

    deleteEventListener();
    updateEventListener();
  
 
};
loadContacts();
