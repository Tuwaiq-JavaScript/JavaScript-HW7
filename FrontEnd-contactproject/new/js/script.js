const nameInput = document.getElementById('name-input');
const phInput = document.getElementById('ph-input');
const contactButton = document.getElementById('contact-button');
const contactList = document.getElementById('contact-list');
const BASE_URL = 'http://localhost:8080/api/v1/contact';

contactButton.addEventListener('click', async () => {
  const value1 = nameInput.value;
  const value2 = phInput.value;

  try {
    const bodyValue = {
      name: value1,
      phoneNumber: value2,
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
                <h5>${contact.name}</h5>
                <h5>${contact.phoneNumber}</h5>
                <div>
                <button class="btn btn-primary contact-update">Update</button>
                <button class="btn btn-secondary contact-delete">Delete</button>
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

    const newTitle = await Swal.fire({
      title: 'Please enter your contact name',
      input: 'text',
      showCancelButton: true,
    });

    if (!newTitle.isConfirmed) {
      return;
    }

    const bodyValue = {
      title: newTitle.value,
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
