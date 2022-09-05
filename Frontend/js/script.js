// enter name
const contactInput = document.getElementById('contact-input'); 
// add name
const contactButton = document.getElementById('contact-button');
// enter phonenumber
const contactInput1 = document.getElementById('contact-input1');
// add phonenumber
const contactButton1 = document.getElementById('contact-button1');

const contactList = document.getElementById('contact-list');
const BASE_URL = 'http://localhost:8080/api/v1/contact';

contactButton.addEventListener('click', async () => {
  const value = contactInput.value;
  const value2 = contactInput1.value;
  try {
    const bodyValue = {
        name: value,
        phonenumber:value2,
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
      contactInput.value = '';
      contactInput1.value='';
      loadcontact();
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
const loadcontact = async () => {
  try {
    const request = await fetch(BASE_URL);
    const data = await request.json();
    createcontactList(data);
  } catch (error) {
    console.log('error', error);
  }
};
const createcontactList = (data) => {
  const dataMap = data.map((contact) => {
    return `
         <li id='${contact.id}' class="list-group-item">
             <div class="parent">

             <div class="child">
                <h4>name: ${contact.name}</h4>
                </div>
                
             <div class="child">
                 <h4>phone number: ${contact.phonenumber}</h4>
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
          title: 'Please enter contact name',
          input: 'text',
          showCancelButton: true,
        });
    
        if (!newName.isConfirmed) {
          return;
        }
        const newPhone = await Swal.fire({
            title: 'Please enter phone number',
            input: 'text',
            showCancelButton: true,
          });
      
          if (!newPhone.isConfirmed) {
            return;
          }
        const bodyValue = {
            name: newName.value,
            phonenumber:newPhone.value,
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
      loadcontact();
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
      loadcontact();
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

loadcontact();