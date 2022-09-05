const nameInput = document.getElementById('name-input');
const phoneInput = document.getElementById('phone-input');
const Button = document.getElementById('contact-button');
const contactList = document.getElementById('contact-list');
const BASE_URL = 'http://localhost:8080/api/v1/contact';

Button.addEventListener('click', async () => {
  const value = nameInput.value;
  const pvalue = phoneInput.value;
  try {
    const bodyValue = {
        name: value,
      pnum: pvalue,

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
      nameInput.value = '';
      phoneInput.value = '';
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
const createContactList = (data) => {
  const dataMap = data.map((contact) => {
    return `
         <div id='${contact.id}' class="row row-cols-3 mt-2 border">    
                <h2>${contact.name}</h2>
                <h3>${contact.pnum}</h3> 
                <div name="box" class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-sm btn-outline-warning contact-update"><i class="fa fa-edit"></i></button>
                <button class="btn btn-sm btn-outline-danger contact-delete"><i class="fa fa-trash"></i></button>
                </div>
            
            </div>
           
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
    const id = e.target.parentNode.parentNode.parentNode.id;

    const { value: formValues } = await Swal.fire({
        title: 'Edit contact',
        html:
        ' <label for="swal-input1">name</label>'+
          '<input id="swal-input1" class="swal2-input">' +
          '<div><label for="swal-input2">phone</label>'+
          '<input id="swal-input2" class="swal2-input"></div>',
        focusConfirm: false,
        preConfirm: () => {
          return [
        newName=document.getElementById('swal-input1').value,
        newPnum=document.getElementById('swal-input2').value
          ]
        }
      })
      
      if (formValues) {
        Swal.fire(JSON.stringify(formValues))
      }

    const bodyValue = {
      name: newName.value,
      pnum: newPnum.value,
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
  console.log(id)

  try {
    const request = await fetch(BASE_URL + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
    },
    });
    const data = await request.json();
    if (request.status == 201) {
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
      title: 'Server Error',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

loadContact();
