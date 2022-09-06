const nameInput = document.getElementById('contact-input');
const numberInput = document.getElementById('contact-input1');
const contactButton = document.getElementById('contact-button');

const contactList = document.getElementById('contact-list');
const buttonList = document.getElementsByClassName('contact-delete');
const BASE_URL = 'http://localhost:8080/api/v1/contact';
                

//fetchData();
contactButton.addEventListener('click', async () => {
    const nameValue = contact-input.value;
    const numberValue = contact-input1.value;
    
    try {
      const bodyValue = {
       name: nameValue1,
       number: numberValue,
      };
  
      const request = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyValue),
      });
      const data = await request.json();
    
      if (request.status == 201) {
        
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        //nameInput.value ='';
        //numberInput.value ='';

        loadContact();

      } else {  
        Swal.fire({
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  const loadContact = async () => {

    try {
      const request = await fetch(BASE_URL);
      const data = await request.json();
      createContactList(data); 
    } catch (error) {
      console.log('error', error);
    }
  };
  
  const createContactList= (data) => {
    const dataMap = data.map((contact) => {
      return `
           <li id='${contact.id}' class="list-group-item">
           <div class='parent'>
                <div class='child'>
                  <h3>${contact.name}</h3>
                </div>
                <div class="child">
                 <h3>${contact.number}</h3>
                 </div>
           </div>

           <div>
                <button class="btn btn-warning contact-update">Update</button>
                <button class="btn btn-danger contact-delete">Delete</button>
            </div>
              </li>
          `;
    });
    contactList.innerHTML = dataMap.join('');
    addEventListenerToUpdate();
    addEventListenerToDelete();
  };
  
  const addEventListenerToDelete = () => {
    const buttonList = document.getElementsByClassName('contact-delete');
    for (let index = 0; index < buttonList.length; index++) {
      buttonList[index].addEventListener('click', deleteListener);
    }
  };
  
  const addEventListenerToUpdate = () => {
    const buttonList = document.getElementsByClassName('contact-update');
    for (let index = 0; index < buttonList.length; index++) {
      buttonList[index].addEventListener('click', updateListener);
    }
  };
  
  const updateListener = async (e) => {
    try {
      const id = e.target.parentNode.parentNode.id;
  
      const newName = await Swal.fire({
        name:'Please enter your contact name',
        input: 'text',
        showCancelButton: true,
      });
  
      if (!newTitle.isConfirmed) {
        return;
      }
      const newNumber = await Swal.fire({
        name:'Please enter your contact number',
        input: 'text',
        showCancelButton: true,
      });
  
      const bodyValue = {
        name: newName.value,
        number: newNumber.value,
      };
  
      const request = await fetch(BASE_URL + '/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyValue),
      });
  
      const data = await request.json();
  
      if (request.status == 200) {
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      loadContact();
      } else {
        Swal.fire({
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server error',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  const deleteListener = async (e) => {
    const id = e.target.parentNode.parentNode.id;
  
    try {
      const request = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      const data = await request.json();
      if (request.status == 200) {
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        loadTodo();
      } else {
        Swal.fire({
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  loadContact();
 
  
  