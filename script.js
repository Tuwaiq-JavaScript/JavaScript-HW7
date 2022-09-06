const contactName = document.getElementById('name-input');
const contactNumber = document.getElementById('number-input');
const addButton = document.getElementById('contact-add');
const contactList = document.getElementById('contact-list');
const url="http://localhost:8080/api/v1/contact"




//---------LOAD------------
const loadContactList= async () => {

    try{
        const request = await fetch(url);
        const data = await request.json();
        createContactList(data);
        deleteEventListener();
        UpdateEventListener();
    } catch (error) {
      console.log(error);
    }
};

const createContactList=(data) =>{
    const dataMap = data.map((contact) => {
        return `
            <li class="list-group-item mt-3" style="border-left: 6px solid red; border-radius: 5px; box-shadow: 0 2px 10px rgb(0 0 0 / 30%);" id="${contact.id}">
            <div class="row">
            <h3 class="col">${contact.name}:</h3>
            <h3 class="col">${contact.number}</h3>
            </div>
            <div>
            <button class="btn btn-outline-secondary delete-button" type="button">
            Delete
            <ion-icon name="trash-outline"></ion-icon>
            </button>
            <button class="btn btn-outline-secondary update-button" type="button">
            Edit
            <ion-icon name="create-outline"></ion-icon>
            </button>
            </div>
            </li> 
        `;
    
      });

      contactList.innerHTML=dataMap.join("");

};

//----------ADD----------
const addClickHandler = async () => {
    const nameValue = contactName.value;
    const phoneValue = contactNumber.value;

    const body={
        name:nameValue,
        number:phoneValue
    }

    try{
        const request = await fetch(url,{
           method:"POST",
           headers:{
            "Content-Type":"application/json"
           },
           body: JSON.stringify(body)
        });
        const data = await request.json();
        loadContactList();
        Swal.fire({
            icon: 'success',
            title: 'Contact has been added',
            showConfirmButton: false,
            timer: 1500
          })
       console.log(data);
       } catch (error) {
       console.log(error);
       }
    contactName.value = '';
    contactNumber.value = '';
  };

//---------Delete---------
  const deleteHandler = async (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
      const id = e.target.parentNode.parentNode.id;
       console.log(id)
    try{
        const request = await fetch(url+'/'+id ,{
           method:"DELETE",
           headers:{
            "Content-Type":"application/json"
           },
        });
        const data = await request.json();
        loadContactList();
    } catch (error) {
      console.log(error);
    }
        Swal.fire(
          'Deleted!',
          'Your Contact has been deleted.',
          'success'
        )
      }
    })

};

//----------Update-----------
const updateHandler = async (e) => {
    const id = e.target.parentNode.parentNode.id;

     Swal.fire({
        title: 'Update Contact',
        html: `<input type="text" id="name" class="swal2-input" placeholder="Name">
        <input type="text" id="phone" class="swal2-input" placeholder="Phone Number">`,
        confirmButtonText: 'Update',
        focusConfirm: false,
        preConfirm: () => {
          const name = Swal.getPopup().querySelector('#name').value
          const phone = Swal.getPopup().querySelector('#phone').value
          if (!name || !phone) {
            Swal.showValidationMessage(`Please enter Name and PhoneNumber`)
          }
          return { name: name, phone: phone }
        }
      }).then(async (result) => {
        try{
            const body={
                name:result.value.name,
                number:result.value.phone
            }
            const request = await fetch(url+"/"+id ,{
               method:"PUT",
               headers:{
                "Content-Type":"application/json"
               },
               body: JSON.stringify(body)
            });
            const data = await request.json();
            loadContactList();
        } catch (error) {
          console.log(error);
        }
        Swal.fire(
          'Updated!',
          'Your Contact has been updated.',
          'success'
        )
      })
};


loadContactList();
addButton.addEventListener('click', addClickHandler);


const deleteEventListener=()=>{
    const deleteButton=document.getElementsByClassName("delete-button");
    for(let index=0 ; index<deleteButton.length ; index++){
    deleteButton[index].addEventListener("click",deleteHandler)
    }
};

const UpdateEventListener=()=>{
    const updateButton=document.getElementsByClassName("update-button");
    for(let index=0 ; index<updateButton.length ; index++){
    updateButton[index].addEventListener("click",updateHandler)
    }
};



