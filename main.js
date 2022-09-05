const contactInput = document.getElementById('name-input');//field to write
const contactInput2 = document.getElementById('phone-input');//field to write
const contactButton = document.getElementById('contact-button');//add

const contactList = document.getElementById('contact-list');
const BASE_URL='http://localhost:8080/api/v1/contact';


const errorAlert = (message) => {
    Swal.fire({
      title: message,
      icon: 'error',
      heightAuto: false,
    });
  };

  
const successAlert = (message) => {
    Swal.fire({
      title: message,
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
      heightAuto: false,
    });
  };




contactButton.addEventListener('click', async (e) => {
    try {
      const value = contactInput.value;
      const value1=contactInput2.value;
      contactInput.value = '';
      contactInput2.value = '';
  
      const bodyValue = { name: value, 
                          phone: value1
      };
  
      const request = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify(bodyValue),
      });
  
      const data = await request.json();
  
      if (data.status == 201) {
        successAlert(data.message);
        loadContact();
      } else {
        errorAlert(data.message);
      }
    } catch (error) {
      errorAlert('Something went wrong');
    }
  });





  const loadContact = async () => {
    try{
    const request = await fetch(BASE_URL);
  
    const data = await request.json();

    console.log(data)

    createContactList(data)
    }catch(error){console.log(error)}
};

const createContactList=(data)=>{
    const dataMap = data.map(
        (contact) => {
            return `
        <li id='${contact.id}' class="list-group-item">
        <div class="row">
        <div class="column">
        <h3>name:${contact.name}</h3>
        </div>
        <div class="column">
        <h3>phone:${contact.phone}</h3>
        </div>
      </div>


        
        <button id="${contact.id}" type="button" class="ms- btn btn-danger delete-button">Delete</button>
        
        </li>`;
        });
    
        contactList.innerHTML = dataMap.join('');

  const deleteButtons = document.getElementsByClassName('delete-button');

  for (let index = 0; index < deleteButtons.length; index++) {
    addDeleteEvent(deleteButtons[index]);
  }

};


const addDeleteEvent = async (deleteButton) => {
    deleteButton.addEventListener('click', async (e) => {
      const id = e.target.id;
      try {
        const request = await fetch(BASE_URL+'/'+id, {
          method: 'DELETE',
        });
  
        const data = await request.json();
  
        if (request.status == 200) {
          successAlert(data.message);
          loadContact();
        } else {
          errorAlert(data.message);
        }
      } catch (error) {
        console.log(error);
        errorAlert('Something went wrong');
      }
    });
  };

 

loadContact();



